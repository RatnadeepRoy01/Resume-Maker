"use client"
import React from "react";

const Interests = ({ interests,styles }) => {
    return (
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarSectionTitle.sidebarTitle} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Interests</p>
        {interests.map((interestsData) => (
          <p key={interestsData.title} className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>• {interestsData.title}</p>
        ))}
      </div>
    );
  };
  
  export default Interests;
  