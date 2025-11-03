const mongoose = require('mongoose');
require('dotenv').config();
const Menu = require('./models/Menu');

// Food image URLs from Unsplash (free to use)
const foodImages = {
  // Beverages
  'Coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
  'Tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
  'Buttermilk': 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4',
  'Lemonade': 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b',
  'Mango Juice': 'https://images.unsplash.com/photo-1546173159-315724a31696',
  'Orange Juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
  'Lassi': 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4',
  'Milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699',
  'Coke': 'https://images.unsplash.com/photo-1554866585-cd94860890b7',
  'Pepsi': 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',

  // Snacks
  'Samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
  'Pakora': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84',
  'Vada Pav': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027',
  'Chips': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b',
  'Biscuit': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35',
  'Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
  'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  'French Fries': 'https://images.unsplash.com/photo-1576107232684-1279f390859f',
  'Spring Roll': 'https://images.unsplash.com/photo-1625398407796-82650a8c135f',

  // Meals
  'Chicken Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
  'Veg Biryani': 'https://images.unsplash.com/photo-1642821373181-696a54913e93',
  'Dal Rice': 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6',
  'Curd Rice': 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db',
  'Fried Rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
  'Chapati': 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
  'Aloo Paratha': 'https://images.unsplash.com/photo-1631452180539-96aca7d48617',
  'Paneer Butter Masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7',
  'Chicken Curry': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
  'Rajma Rice': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',

  // Breakfast
  'Idli': 'https://images.unsplash.com/photo-1630383249896-424e482df921',
  'Dosa': 'https://images.unsplash.com/photo-1694809433016-e6c5ca53161f',
  'Vada': 'https://images.unsplash.com/photo-1626074353765-517a65edd3c8',
  'Upma': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc',
  'Poha': 'https://images.unsplash.com/photo-1626074353765-517a65edd3c8',
  'Puri Bhaji': 'https://images.unsplash.com/photo-1626074353765-517a65edd3c8',
  'Bread Omelette': 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
  'Paratha': 'https://images.unsplash.com/photo-1631452180539-96aca7d48617',

  // Desserts
  'Gulab Jamun': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d',
  'Rasmalai': 'https://images.unsplash.com/photo-1631285277224-e9a8b33f6eda',
  'Ice Cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  'Kheer': 'https://images.unsplash.com/photo-1626776876729-bab4fe8be83e',
  'Jalebi': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df',
  'Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
  'Brownie': 'https://images.unsplash.com/photo-1607920591413-4ec007e70023',
  'Ladoo': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32',
};

async function addMenuImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/canteen_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Get all menu items
    const menuItems = await Menu.find({});
    console.log(`📋 Found ${menuItems.length} menu items`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const item of menuItems) {
      // Check if item already has a valid image (URL, not base64)
      if (item.image && !item.image.startsWith('data:')) {
        console.log(`⏭️  Skipping "${item.itemName}" - already has image`);
        skippedCount++;
        continue;
      }

      // Find matching image by exact name or partial match
      let imageUrl = null;

      // Try exact match first
      if (foodImages[item.itemName]) {
        imageUrl = foodImages[item.itemName];
      } else {
        // Try partial match
        const itemNameLower = item.itemName.toLowerCase();
        for (const [key, url] of Object.entries(foodImages)) {
          if (itemNameLower.includes(key.toLowerCase()) || key.toLowerCase().includes(itemNameLower)) {
            imageUrl = url;
            break;
          }
        }
      }

      if (imageUrl) {
        item.image = imageUrl;
        await item.save();
        console.log(`✅ Updated "${item.itemName}" with image`);
        updatedCount++;
      } else {
        console.log(`⚠️  No image found for "${item.itemName}"`);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Updated: ${updatedCount} items`);
    console.log(`   ⏭️  Skipped: ${skippedCount} items`);
    console.log(`   ⚠️  Not found: ${menuItems.length - updatedCount - skippedCount} items`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

addMenuImages();
