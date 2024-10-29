"use client"

import React from 'react';

const Awards = ({ awards, styles }) => {
    console.log(awards)
  
    return (
    <div>
      <p className={styles.sectionTitle.sectionTitle} style={{fontSize:styles.sectionTitle.sectionTitleStyle}}>Awards</p>
      {awards.map((award, index) => (
        <div key={index} className={styles.experienceItem}>
          <p className={styles.experienceTitle.experienceTitle} style={{fontSize:styles.experienceTitle.experienceTitleStyle}}>{award.award}</p>
          <p className={styles.experienceDate.experienceDate}style={{fontSize:styles.experienceDate.experienceDateStyle}} >{award.organization} {award.year && `-${award.year}`}</p>
          <div className={styles.text.textStyle} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html: award.summary }}></div>
        </div>
      ))}
    </div>
  );
};

export default Awards;
