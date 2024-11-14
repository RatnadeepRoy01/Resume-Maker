"use client"
import React from "react";


const Volunteering = ({ volunteering,styles , bar, customCss }) => {
    return (
      volunteering.length > 0 && (
        <div>
          <p className={styles.sectionSecondTitle.sectionSecondTitle} style={{fontSize:styles.sectionSecondTitle.sectionSecondTitleStyle}}>Volunteering</p>
          {bar}
          <div className={customCss}>
          {volunteering.map((volunteeringData) => (
            <div className={styles.experienceItem} key={volunteeringData.organization}>
              <p className={styles.experienceTitle.experienceTitle} style={{fontSize:styles.experienceTitle.experienceTitleStyle}}>{volunteeringData.organization}</p>
              <p className={styles.experienceDate.experienceDate} style={{fontSize:styles.experienceDate.experienceDateStyle}}>Role: {volunteeringData.role}</p>
              <p className={styles.text.text} style={{fontSize:styles.text.textStyle}}>{volunteeringData.date}</p>
              <p className={styles.text.text} style={{fontSize:styles.text.textStyle , textDecoration:styles.text.textStyle1}}>{volunteeringData.website}</p>
              <div className={styles.text.text} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html: volunteeringData.summary }}></div>
            </div>
           
          ))}
        </div>
        </div>
      )
    );
  };
  
  export default Volunteering;
  