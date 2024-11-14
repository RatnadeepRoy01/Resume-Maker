"use client"
import React from "react";

const Projects = ({ projects,styles ,bar, customCss}) => {
    return (
      projects.length > 0 && (             
        <div>
          <p className={styles.sectionSecondTitle.sectionSecondTitle} style={{fontSize:styles.sectionSecondTitle.sectionSecondTitleStyle}}>Projects</p>
          {bar}
          <div className={customCss}>
          {projects.map((projectsData) => (
            <div className={styles.experienceItem} key={projectsData.title}>
              <p className={styles.experienceTitle.experienceTitle} style={{fontSize:styles.experienceTitle.experienceTitleStyle}}>{projectsData.title}</p>
              {projectsData.website && <p className={styles.text.text} style={{fontSize:styles.text.textStyle , textDecoration:styles.text.textStyle1}}>{projectsData.website}</p>}
              <p className={styles.text.text} style={{fontSize:styles.text.textStyle}}>{projectsData.startDate} - {projectsData.endDate}</p>
              <div className={styles.text.text} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html: projectsData.summary }}></div>
            </div>
          ))}
        </div>
        </div>
      )
    );
  };
  
  export default Projects;
  