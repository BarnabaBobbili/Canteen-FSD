import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Call-to-action section for landing page
 */
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 border-8 border-gray-900 p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] relative overflow-hidden transform rotate-1">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 border-4 border-dashed border-white rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 border-4 border-dashed border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>
              Ready to Order?
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
              Join thousands of happy customers enjoying delicious meals every day
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/order')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-4 border-white text-gray-900 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105 hover:-rotate-1 font-black text-lg"
              >
                Start Ordering
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-4 border-white text-white bg-transparent hover:bg-white/10 transition-all transform hover:rotate-1 font-black text-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
