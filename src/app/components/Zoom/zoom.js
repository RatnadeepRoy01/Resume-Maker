"use client"
import React, { useState, useEffect, useRef } from 'react';

const A4ResumeWrapper = ({ children }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // A4 constants (in pixels at 96 DPI)
  const A4_WIDTH_PX = 729;  // 210mm * 3.779528
  const A4_HEIGHT_PX = 1123; // 297mm * 3.779528

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        if (isMobile) {
          // Mobile scaling
          const availableWidth = window.innerWidth - 32;
          const newScale = availableWidth / A4_WIDTH_PX;
          setScale(Math.min(newScale, 1));
        } else {
          // Desktop scaling
          const containerWidth = containerRef.current.offsetWidth - 48;
          const containerHeight = window.innerHeight - 48;
          const newScale = Math.min(
            containerWidth / A4_WIDTH_PX,
            containerHeight / A4_HEIGHT_PX
          );
          setScale(newScale);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isMobile]);

  return (
    <div 
      className={`min-h-screen  flex justify-center items-center ${isMobile ? 'p-4' : 'p-6'}  `} 
      ref={containerRef}
    >
      <div 
        className="relative  flex justify-center items-center"
        style={{
          width: isMobile ? `${A4_WIDTH_PX * scale}px` : 'auto',
          height: isMobile ? `${A4_HEIGHT_PX * scale}px` : 'auto',
        }}
      >
        <div
          style={{
            width: `${A4_WIDTH_PX}px`,
            height: `${A4_HEIGHT_PX}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top',
            transition: 'transform 0.2s ease-in-out',
          }}
         className={`${isMobile ? 'absolute top-0  ' : ''}` }
        >
          <div className="w-full h-full  shadow-lg ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default A4ResumeWrapper;
