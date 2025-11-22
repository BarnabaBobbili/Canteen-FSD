/**
 * Hero SVG Filters Component
 * SVG filter definitions for manga-style effects
 */
const HeroSVGFilters = () => {
  return (
    <svg className="hidden">
      <defs>
        {/* Rough edges filter for sketchy manga look */}
        <filter id="roughEdges" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Sketch filter for hand-drawn lines */}
        <filter id="sketch" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Arrow marker for hand-drawn arrows */}
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="black" />
        </marker>
      </defs>
    </svg>
  );
};

export default HeroSVGFilters;
