"use client"
import React from "react";


const Publications = ({ publications , styles , bar }) => {
    return (
      publications.length > 0 && (
        <div>
          <p className={styles.sectionSecondTitle.sectionSecondTitle} style={{fontSize:styles.sectionSecondTitle.sectionSecondTitleStyle}}>Publications</p>
          {bar}
          {publications.map((publicationsData) => (
            <div className={styles.experienceItem} key={publicationsData.title}>
              <p className={styles.experienceTitle.experienceTitle} style={{fontSize:styles.experienceTitle.experienceTitleStyle}}>{publicationsData.title}</p>
              <p className={styles.experienceDate.experienceDate} style={{fontSize:styles.experienceDate.experienceDateStyle}}>{publicationsData.publisher}</p>
              <p className={styles.text.text} style={{fontSize:styles.text.textStyle}}>{publicationsData.date}</p>
              <p className={styles.text.text} style={{fontSize:styles.text.textStyle , textDecoration:styles.text.textStyle1}}>Website: {publicationsData.website}</p>
              <div className={styles.text.text} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html: publicationsData.summary }}></div>
            </div>
          ))}
        </div>
      )
    );
  };
  
  export default Publications;
  