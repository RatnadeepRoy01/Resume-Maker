"use client"

import React, {  useRef , useContext } from 'react';
import MyContext from '@/app/components/Context/MyContext';


// Page Component
const PageSettings = () => {
    

    const sliderRefs = useRef([]); // Create a mutable ref for slider elements
    const {format, setFormat,margin, setMargin,showBreakLine, setShowBreakLine, showPageNumbers, setShowPageNumbers} = useContext(MyContext)
    
    const handleInputChange = (index) => {
      const slider = sliderRefs.current[index];
        const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--value', `${value}%`); // Update the CSS variable or style
      
    };
  
    return (
      <div className="p-6">
        <h2 className="text-lg font-bold mb-6">Page</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Format</label>
            <select 
              className="w-full p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option>A4</option>
              <option>Letter</option>
              <option>Legal</option>
            </select>
          </div>
  
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold">Margin</label>
              <span className="text-sm text-gray-600">{margin}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value))}
              ref={(el) => (sliderRefs.current[1] = el)} // Assign each slider re
              onInput={() => handleInputChange(1)} // Listen for input changes         
              style={{ '--value': '0%' }} 
              className=" range-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Show Break Line</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showBreakLine}
                  onChange={(e) => setShowBreakLine(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Show Page Numbers</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showPageNumbers}
                  onChange={(e) => setShowPageNumbers(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PageSettings