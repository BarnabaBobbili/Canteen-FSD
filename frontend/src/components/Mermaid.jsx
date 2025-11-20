import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const Mermaid = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    // Initialize mermaid with configuration
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
    });

    // Render the chart
    if (ref.current) {
      try {
        ref.current.removeAttribute('data-processed');
        mermaid.contentLoaded();
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    }
  }, [chart]);

  return (
    <div className="mermaid-container bg-white p-6 rounded-lg border border-gray-200 overflow-x-auto my-4">
      <div className="mermaid" ref={ref}>
        {chart}
      </div>
    </div>
  );
};

export default Mermaid;
