"use client"
import React from "react";

const Languages = ({ languages , styles }) => {
    return (
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarSectionTitle.sidebarTitle} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Languages</p>
        {languages.map((languagesData) => {      
          let data = typeof languagesData == "string" ? languagesData:languagesData.name
          return (
          <p key={data} className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>• {data}</p>
        )})}
      </div>
    );
  };
  
  export default Languages;
  