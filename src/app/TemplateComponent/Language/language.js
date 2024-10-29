"use client"
import React from "react";

const Languages = ({ languages , styles }) => {
    return (
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarSectionTitle.sidebarTitle} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Languages</p>
        {languages.map((languagesData) => (
          <p key={languagesData.name} className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>• {languagesData.name}</p>
        ))}
      </div>
    );
  };
  
  export default Languages;
  