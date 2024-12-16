"use client"
import React, { useState } from 'react';
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {

  //Page
  const [format, setFormat] = useState('A4');
  const [margin, setMargin] = useState("auto");
  const [showBreakLine, setShowBreakLine] = useState(false);
  const [showPageNumbers, setShowPageNumbers] = useState(false);

  //Theme
  const [primaryColor, setPrimaryColor] = useState('#059669');
    const [backgroundColor, setBackgroundColor] = useState('#9f5a5a');
    const [textColor, setTextColor] = useState('#000000');
  
  //Topography
    const [fontFamily, setFontFamily] = useState('Roboto Mono');
    const [fontSubset, setFontSubset] = useState("rounded-full");
    const [fontVariant, setFontVariant] = useState('regular,200italic');
    const [fontSize, setFontSize] = useState(0);
    const [lineHeight, setLineHeight] = useState(0);
    const [hideIcons, setHideIcons] = useState(false);
    const [underlineLinks, setUnderlineLinks] = useState(false);

    //Menu Open
    const [isOpen, setIsOpen] = useState(false);

    //Image
    const [profilePic, setProfilePic] = useState(null);

    //transformed User data
    const[userData1 , setUserData1] = useState(null)

    //Template Name
    const[templeName , setTemplateName] = useState(null)
    
    //Template Password
    const[templePassword , setTemplatePassword] = useState(null)

    //customize Template
    const[selectTemplate , setSelectTemplate] = useState(null)

    //show Login 
    const [showComponent, setShowComponent] = useState(false);
    
    //show signup
    const[showComponent1 , setShowComponent1] = useState(false)

    //saveTemplateRef
    const[ saveRef , setSaveRef ] = useState(null)

    //uniqueKey for resume hosting
    const[uniqueKey , setUniqueKey] = useState(null)

  return (
    <MyContext.Provider value={{format, setFormat,margin, setMargin,showBreakLine, setShowBreakLine, showPageNumbers, setShowPageNumbers,
      primaryColor, setPrimaryColor,backgroundColor, setBackgroundColor,textColor, setTextColor,fontFamily, setFontFamily,fontSubset, setFontSubset,
      fontVariant, setFontVariant , fontSize, setFontSize , lineHeight, setLineHeight , hideIcons, setHideIcons , underlineLinks, setUnderlineLinks,
      isOpen,setIsOpen,profilePic , setProfilePic ,userData1 , setUserData1 ,  templeName ,  setTemplateName  , selectTemplate , setSelectTemplate ,
      showComponent, setShowComponent , showComponent1 , setShowComponent1 , templePassword , setTemplatePassword , saveRef , setSaveRef ,uniqueKey, 
      setUniqueKey
    }} >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;