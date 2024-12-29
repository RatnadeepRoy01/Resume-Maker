"use client"
import React, { useContext } from "react";
import MyContext from "@/app/Context/MyContext";

export default function PersonalInfo({ personalInfo,styles,Zindex ,extraData , extraImgData }) {
  
  const{ profilePic } = useContext(MyContext)
 console.log(extraImgData)
  return ( 
  <div  style={{zIndex:Zindex}} >
           
          {profilePic && (
        <div
         className={`w-[200px] h-[200px] overflow-hidden bg-cover bg-center ${styles.image} ${extraImgData} `}
         style={{
         backgroundImage: profilePic ? `url(${profilePic})` : 'none' // Dynamically set the background image
      }}
         >
       </div>
     )}  

       <div className={`${styles.sidebarSection} ${extraData}`}>
      
        <p className={styles.sidebarSectionTitle.sidebarTitle} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Contact</p>
         <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}> Phone: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle}}>{personalInfo.phoneNumber}</p></p>
        <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}} >Email: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle}} > {personalInfo.email} </p></p>
        <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>Address:<p className={styles.small.small} style={{fontSize:styles.small.smallStyle}}> {personalInfo.address} </p></p>
        {personalInfo.website && <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>Website:<p className={styles.small.small} style={{fontSize:styles.small.smallStyle , textDecoration:styles.small.smallStyle1}}> {personalInfo.website} </p> </p>}
        {personalInfo.linkedIn && <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>LinkedIn: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle , textDecoration:styles.small.smallStyle1}}> {personalInfo.linkedIn} </p></p>}
        {personalInfo.github && <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>GitHub: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle , textDecoration:styles.small.smallStyle1}}> {personalInfo.github} </p></p>}
        
      </div>
      </div>
  );
}