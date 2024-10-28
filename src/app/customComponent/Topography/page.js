"use client"

import React, { useRef , useContext } from 'react';
import MyContext from '@/app/components/Context/MyContext';


// Typography Component
const TypographySettings = () => {
    

  const {  setFontFamily,fontSubset, setFontSubset,
    fontVariant, setFontVariant , fontSize, setFontSize , lineHeight, setLineHeight , hideIcons, setHideIcons , underlineLinks, setUnderlineLinks} = useContext(MyContext);
  
    const fontFamilies = [
      'Georgia',        
      'Times New Roman',
      'Arial',
      "Inter",
      "Open Sans",
      "Roboto Mono",
      "Fira Code",    
      'Roboto',             
      'Courier New ',      
      'Merriweather',    
  ];
  
    const sliderRefs = useRef([]); // Create a mutable ref for slider elements
  
    const handleInputChange = (index) => {
      const slider = sliderRefs.current[index];
        const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--value', `${value}%`); // Update the CSS variable or style
      
    };
  
    return (
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium mb-6">Typography</h2>
        
        <div className="space-y-6">
          
        <div className="grid grid-cols-2 gap-4">
    
    {fontFamilies.map((font) => (
      <div
        key={font}
        onClick={() => setFontFamily(font)}
        className="bg-white border text-sm p-3 border-gray-300 rounded-md shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer hover:bg-gray-100"
      >
        <span className="font-medium text-gray-800 md:text-xl text-[0.7rem]">{font}</span>
      </div>
    ))}
  </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm  mb-2">Image - Frame</label>
              <select 
                className="w-full p-2.5 text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={fontSubset}
                onChange={(e) => setFontSubset(e.target.value)}
              >
                <option value="rounded-full">circle</option>
                <option value="rounded-lg">rounded-corners</option>
                <option value="rounded-none">square</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Font Variants</label>
              <select 
                className="w-full p-2.5 text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={fontVariant}
                onChange={(e) => setFontVariant(e.target.value)}
              >
                <option value="thin">light</option>
                <option value="medium">medium</option>
                <option value="bold">bold</option>
              </select>
            </div>
          </div>
  
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-md font-bold">Font Size</label>
              <span className="text-sm  font-bold">{fontSize}</span>
            </div>
            
            <input
              type="range"
              min="-4"
              max="4"
              step="0.1"
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              className="range-slider w-full h-2 rounded-lg cursor-pointer"
              ref={(el) => (sliderRefs.current[1] = el)} // Assign each slider re
              onInput={() => handleInputChange(1)} // Listen for input changes         
              style={{ '--value': '0%' }} 
              />
         </div>
          
  
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-md font-bold">Line Height</label>
              <span className="text-sm font-bold">{lineHeight}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
               className="range-slider w-full h-2 rounded-lg cursor-pointer"
               ref={(el) => (sliderRefs.current[2] = el)} // Assign each slider re
              onInput={() => handleInputChange(2)} // Listen for input changes         
              style={{ '--value': '0%' }} 
            />
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Hide Icons</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={hideIcons}
                  onChange={(e) => setHideIcons(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Underline Links</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={underlineLinks}
                  onChange={(e) => setUnderlineLinks(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TypographySettings