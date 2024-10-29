"use client"
import React from "react";


const Skills = ({ skills,styles }) => {
    return (
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarSectionTitle.sidebarTitle} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Expertise</p>
        {skills.map((skillsData) => (
          <p key={skillsData.name} className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>• {skillsData.name}</p>
        ))}
      </div>
    );
  };
  
  export default Skills;
  