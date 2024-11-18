"use client"

import React, { useRef , useContext } from 'react';
import { ChevronLeft } from 'lucide-react';

import TypographySettings from "../customComponent/Topography/page"
import ThemeSettings from '../customComponent/Theme/page';
import PageSettings from '../customComponent/customPage/page';
import SelectTemplate from '../customComponent/selectTemplate/page';
import MyContext from '../components/Context/MyContext';



// Main Settings Page Component
const SettingsPage = () => {

    const { isOpen , setIsOpen } = useContext(MyContext);
    const sidebarRef = useRef(null); // Create a ref for the sidebar
  
    const handleToggleSidebar = () => {
      setIsOpen(!isOpen); // Toggle sidebar open/close
    };
  
    return (
      <div className="min-h-screen bg-gray-50 overflow-hidden"> {/* Click handler on the main wrapper */}
        <button
          onClick={handleToggleSidebar} // Toggle sidebar open/close
          className="fixed left-4 top-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <ChevronLeft className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
  
        <div
          ref={sidebarRef} // Attach the ref to the sidebar
          className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <SelectTemplate/>
          <TypographySettings />
          <ThemeSettings />
          <PageSettings />
        </div>
      </div>
    );
};

export default SettingsPage;

