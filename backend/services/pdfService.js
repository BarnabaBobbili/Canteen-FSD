const PDFDocument = require('pdfkit');

/**
 * PDF Bill Generation Service
 * Creates professional bills for orders
 */

/**
 * Generate PDF bill for an order
 * @param {Object} order - Order object with all details
 * @returns {Promise<Buffer>} PDF buffer
 */
const generateOrderBill = async (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      // Collect PDF data
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('Canteen Delight', { align: 'center' })
        .moveDown(0.5);

      doc
        .fontSize(12)
        .font('Helvetica')
        .text('Tax Invoice / Bill of Supply / Cash Memo', { align: 'center' })
        .moveDown(1);

      // Horizontal line
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke()
        .moveDown(1);

      // Order Details
      const startY = doc.y;

      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Order Number:', 50, startY)
        .font('Helvetica')
        .text(order.orderNumber, 150, startY);

      doc
        .font('Helvetica-Bold')
        .text('Date:', 50, startY + 20)
        .font('Helvetica')
        .text(new Date(order.createdAt).toLocaleString(), 150, startY + 20);

      doc
        .font('Helvetica-Bold')
        .text('Payment Method:', 50, startY + 40)
        .font('Helvetica')
        .text(order.paymentMethod.toUpperCase(), 150, startY + 40);

      doc
        .font('Helvetica-Bold')
        .text('Order Type:', 50, startY + 60)
        .font('Helvetica')
        .text(order.orderType.toUpperCase(), 150, startY + 60);

      // Customer Details
      doc
        .font('Helvetica-Bold')
        .text('Customer Name:', 320, startY)
        .font('Helvetica')
        .text(order.customerName, 420, startY);

      if (order.customerEmail) {
        doc
          .font('Helvetica-Bold')
          .text('Email:', 320, startY + 20)
          .font('Helvetica')
          .text(order.customerEmail, 420, startY + 20);
      }

      doc
        .font('Helvetica-Bold')
        .text('Phone:', 320, startY + 40)
        .font('Helvetica')
        .text(order.customerPhone, 420, startY + 40);

      doc.moveDown(5);

      // Horizontal line
      doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke()
        .moveDown(0.5);

      // Table Header
      const tableTop = doc.y;
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Item', 50, tableTop)
        .text('Qty', 320, tableTop)
        .text('Price', 400, tableTop)
        .text('Amount', 480, tableTop);

      // Horizontal line under header
      doc
        .moveTo(50, tableTop + 20)
        .lineTo(550, tableTop + 20)
        .stroke();

      // Table Items
      let yPosition = tableTop + 30;
      let subtotal = 0;

      order.items.forEach((item, index) => {
        const itemTotal = item.quantity * item.price;
        subtotal += itemTotal;

        doc
          .fontSize(10)
          .font('Helvetica')
          .text(item.itemName, 50, yPosition, { width: 250 })
          .text(item.quantity, 320, yPosition)
          .text(`₹${item.price}`, 400, yPosition)
          .text(`₹${itemTotal}`, 480, yPosition);

        yPosition += 25;

        // Add page if needed
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 50;
        }
      });

      // Horizontal line before totals
      yPosition += 5;
      doc
        .moveTo(50, yPosition)
        .lineTo(550, yPosition)
        .stroke();

      yPosition += 15;

      // Subtotal
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Subtotal:', 400, yPosition)
        .text(`₹${subtotal}`, 480, yPosition);

      // Taxes (if any - currently 0 but can be added)
      const taxPercent = 0; // Configure as needed
      const taxAmount = (subtotal * taxPercent) / 100;

      if (taxAmount > 0) {
        yPosition += 20;
        doc
          .font('Helvetica')
          .text(`Tax (${taxPercent}%):`, 400, yPosition)
          .text(`₹${taxAmount.toFixed(2)}`, 480, yPosition);
      }

      // Total
      yPosition += 25;
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Total:', 400, yPosition)
        .text(`₹${order.totalAmount}`, 480, yPosition);

      // Payment Status
      yPosition += 30;
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Payment Status:', 400, yPosition)
        .fillColor(order.paymentStatus === 'completed' ? 'green' : 'orange')
        .text(order.paymentStatus.toUpperCase(), 480, yPosition)
        .fillColor('black');

      // Footer
      doc
        .fontSize(8)
        .font('Helvetica')
        .text(
          'Thank you for your order! We hope to serve you again soon.',
          50,
          750,
          { align: 'center' }
        );

      doc
        .text(
          'This is a computer-generated bill and does not require a signature.',
          50,
          765,
          { align: 'center' }
        );

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateOrderBill
};
