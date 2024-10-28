"use client";
import React from "react";

const Education = ({ education,styles }) => {
    return (
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarSectionTitle.sidebarTitle} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Education</p>
        {education.map((educationData) => (
          <div key={educationData.institution}>
            <p className={styles.small.small} style={{fontSize:styles.small.smallStyle}}>
              {educationData.startYear} - {educationData.endYear}
            </p>
            <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>{educationData.institution}</p>
            <p className={styles.small.small} style={{fontSize:styles.small.smallStyle}}>
              {educationData.degree} - {educationData.score}
            </p>
            <div className={styles.small.small} style={{fontSize:styles.small.smallStyle}}  dangerouslySetInnerHTML={{ __html: educationData.summary }}></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Education;
  