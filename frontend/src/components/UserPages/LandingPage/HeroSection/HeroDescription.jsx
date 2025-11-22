/**
 * Hero Description Component
 * Comic-style speech bubble for description
 */
const HeroDescription = () => {
  return (
    <div className="relative inline-block mb-8 sm:mb-10 p-4 sm:p-6 bg-white border-3 sm:border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 max-w-2xl mx-4" style={{ filter: 'url(#roughEdges)' }}>
      <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed" style={{ color: '#1a202c' }}>
        Skip the line! Order ahead and grab your food when it's ready. Fresh, hot, and waiting for you.
      </p>
      {/* Comic action lines in corners - sketchy */}
      <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-gray-900" style={{ filter: 'url(#sketch)' }}></div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-gray-900" style={{ filter: 'url(#sketch)' }}></div>

      {/* Hand-drawn circle around text - subtle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 300 150">
        <ellipse cx="150" cy="75" rx="145" ry="70" stroke="black" strokeWidth="1" fill="none" strokeDasharray="5,5" />
      </svg>
    </div>
  );
};

export default HeroDescription;
