"use client"
import React from "react";


const References = ({ references , styles ,bar, customCss}) => {
    return (
      references.length > 0 && (
        <div>
          <p className={styles.sectionSecondTitle.sectionSecondTitle} style={{fontSize:styles.sectionSecondTitle.sectionSecondTitleStyle}}>References</p>
          {bar}
          <div className={customCss}>
          {references.map((referencesData, index) => {
            return (
              <>
                 
                  <div className={styles.referenceSection} key={index}>
                    <div className={styles.referenceItem}>
                      <p className={styles.experienceTitle.experienceTitle} style={{fontSize:styles.experienceTitle.experienceTitleStyle}}>{referencesData.name}</p>
                      <p className={styles.experienceDate.experienceDate }style={{fontSize:styles.experienceDate.experienceDateStyle}} >Job position: {referencesData.position}</p>
                      <p className={styles.experienceDate.experienceDate} style={{fontSize:styles.experienceDate.experienceDateStyle}}>Email: {referencesData.email}</p>
                      <div className={styles.text.text} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html: referencesData.summary }}></div>
                    </div>
                  </div>
                
              </>
            );
          })}
        </div>
        </div>
      )
    );
  };
  
  export default References;
  