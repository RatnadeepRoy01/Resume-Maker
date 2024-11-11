"use client"

import React, { useState, useEffect, useRef } from 'react';

const A4ResumeWrapper = ({ children }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  
  // A4 constants (in pixels at 96 DPI)
  const A4_WIDTH_PX =729;  // 210mm * 3.779528
  const A4_HEIGHT_PX = 1123; // 297mm * 3.779528

  // Calculate and set scale on mount and resize
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 48; // Subtract padding
        const containerHeight = window.innerHeight - 48; // Leave some margin
        
        // Calculate scale to fit both width and height
        const scale = Math.min(
          containerWidth / A4_WIDTH_PX,
          containerHeight / A4_HEIGHT_PX
        );
        
        setScale(scale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6" ref={containerRef}>
      <div className="flex justify-center">
        <div style={{ 
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease-in-out',
          backgroundColor:"red"
        }}>
          <div className="w-full h-full bg-white shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default A4ResumeWrapper;