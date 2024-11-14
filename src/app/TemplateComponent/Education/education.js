"use client"
import React from "react";

const Education = ({ education,styles , whichStyle , bar , customCss  }) => {

  let textStyle = styles.small.small;
  let sideTextStyle = styles.sideText.sideText
  let title = styles.sidebarSectionTitle.sidebarTitle;



   if( whichStyle == "main" ){
    textStyle = styles.text.text;
    sideTextStyle = styles.experienceDate.experienceDate
    title = styles.sectionTitle.sectionTitle
   } 
console.log(bar,"aaaaaaaaaaaaaaa")
    return (
      <div className={styles.sidebarSection} >
        <p className={title} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Education</p>
            <div className={bar}></div>
        <div className={customCss}>
        {education.map((educationData) => (
          <div key={educationData.institution}>
            <p className={textStyle} style={{fontSize:styles.small.smallStyle}}>
              {educationData.startYear} - {educationData.endYear}
            </p>
            <p className={sideTextStyle} style={{fontSize:styles.sideText.sideTextStyle}}>{educationData.institution}</p>
            <p className={textStyle} style={{fontSize:styles.small.smallStyle}}>
              {educationData.degree} - {educationData.score}
            </p>
            <div className={textStyle} style={{fontSize:styles.small.smallStyle}}  dangerouslySetInnerHTML={{ __html: educationData.summary }}></div>
          </div>
        ))}
      </div>
      </div>
    );
  };
  
  export default Education;
  