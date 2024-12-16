"use client"

import React, { useContext } from 'react';
import MyContext from '@/app/Context/MyContext';


// Theme Component
const ThemeSettings = () => {

    const {primaryColor, setPrimaryColor,backgroundColor, setBackgroundColor,textColor, setTextColor} = useContext(MyContext);
    
    const colorPalette = [
      ['#1F2937', '#374151', '#DC2626'],
      ['#EA580C', '#D97706', '#CA8A04'],
      ['#65A30D', '#16A34A', '#059669'],
      ['#0D9488', '#0891B2', '#0284C7'],
      ['#2563EB', '#4F46E5', '#7C3AED'],
      ['#9333EA', '#C026D3', '#DB2777'],
      ['#E11D48']
    ];
  
    

    return (
      <div className="p-6 border-b overflow-hidden">
        <h2 className="text-lg mb-6 font-bold">Theme</h2>
        
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-2">
            {colorPalette.map((row, rowIndex) => (
            
                row.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${primaryColor === color ? 'border-gray-400' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setPrimaryColor(color)}
                  />
                ))
          
            ))}
          </div>
  
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Primary Color</label>
              <div className="flex gap-2 justify-between">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-8 w-8 rounded-full border border-gray-300 "
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-bold mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="h-8 w-8 rounded-full border border-gray-300"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1  bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-bold mb-2">Text Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-8 w-8 rounded-full border border-gray-300"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ThemeSettings