import React from 'react';
import { Zap, Clock, Shield, Heart } from 'lucide-react';

/**
 * Features section component highlighting key benefits
 */
const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Quick Ordering',
      description: 'Order in seconds with our simple interface',
      color: '#FFCC99'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Get your food ready in minutes',
      color: '#FF7A00'
    },
    {
      icon: Shield,
      title: 'Quality Food',
      description: 'Fresh ingredients, prepared daily',
      color: '#FF9E40'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Crafted by our experienced chefs',
      color: '#e66d00'
    }
  ];

  return (
    <div id="features" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-8">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're committed to providing the best food experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center group hover:transform hover:scale-105 transition-all ${index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'}`}
            >
              <div className="inline-block p-6 border-4 border-gray-900 mb-4 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]" style={{ backgroundColor: feature.color }}>
                <feature.icon className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
