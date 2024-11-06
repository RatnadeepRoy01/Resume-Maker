"use client"
import React from "react";

const Certifications = ({ certifications , styles }) => {
    return (
      certifications.length > 0 && (
        <div >
          <p className={styles.sectionSecondTitle.sectionSecondTitle} style={{fontSize:styles.sectionSecondTitle.sectionSecondTitleStyle}}>Certifications</p>
         
          {certifications.map((certificationsData) => (
            <div className={styles.experienceItem} key={certificationsData.certification}>
              <p className={styles.experienceTitle.experienceTitle} style={{fontSize:styles.experienceTitle.experienceTitleStyle}}>{certificationsData.certification}</p>
              <p className={styles.experienceDate.experienceDate} style={{fontSize:styles.experienceDate.experienceDateStyle}}>
                {certificationsData.issueDate} - {certificationsData.issuer}
              </p>
            </div>
          ))}
        </div>
      )
    );
  };
  
  export default Certifications;
  