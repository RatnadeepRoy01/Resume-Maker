"use client"
import React from "react";

const WorkExperience = ({ workExperience , styles ,bar}) => {

  console.log(styles.text)
    return (
      workExperience.length > 0 && (
        <div>
          <p className={styles.sectionTitle.sectionTitle} style={{fontSize:styles.sectionTitle.sectionTitleStyle}}>Experience</p>
          {bar}
          {workExperience.map((workExperienceData) => (
            <div className={styles.experienceItem} key={workExperienceData.company}>
              <p className={styles.experienceTitle.experienceTitle} style={{fontSize:styles.experienceTitle.experienceTitleStyle}}>{workExperienceData.role}</p>
              <p className={styles.experienceDate.experienceDate} style={{fontSize:styles.experienceDate.experienceDateStyle}}>{workExperienceData.company}</p>
              <p className={styles.text.text} style={{fontSize:styles.text.textStyle}}>
                {workExperienceData.startDate} - {workExperienceData.endDate}
              </p>
              <p className={styles.text.text} style={{fontSize:styles.text.textStyle , textDecoration:styles.text.textStyle1}}> {workExperienceData.website}   </p>
              <div className={styles.text.text} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html: workExperienceData.summary }}></div>
            </div>
          ))}
        </div>
      )
    );
  };
  
  export default WorkExperience;
  