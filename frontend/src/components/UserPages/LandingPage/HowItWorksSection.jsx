import React from 'react';
import { UtensilsCrossed, ShoppingCart, Star } from 'lucide-react';

/**
 * How It Works section showing the ordering process
 */
const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Browse Menu',
      description: 'Explore our delicious menu with various categories',
      icon: UtensilsCrossed
    },
    {
      number: '02',
      title: 'Place Order',
      description: 'Select your favorites and place your order',
      icon: ShoppingCart
    },
    {
      number: '03',
      title: 'Enjoy Food',
      description: 'Pick up your order and enjoy!',
      icon: Star
    }
  ];

  return (
    <div id="how-it-works" className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-8">
            How It Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Three simple steps to get your delicious meal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-1/2 w-full h-1 border-t-2 border-dashed border-gray-400 -z-10"></div>
              )}

              <div className="bg-white border-4 border-gray-900 p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all group transform hover:-rotate-1">
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl font-black text-gray-900 mb-4" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
                    {step.number}
                  </div>
                  <div className="p-4 border-2 border-gray-900 bg-yellow-100 mb-4 group-hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                    <step.icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
