"use client";

import React, { useState , useRef , useContext , useEffect } from "react";
import Button from "@/app/components/Button/button";
import PersonalInfo from "@/app/TemplateComponent/personalInfo/personalInfo";
import Education from "@/app/TemplateComponent/Education/education";
import WorkExperience from "@/app/TemplateComponent/Work-Experience/workExperience";
import Skills from "@/app/TemplateComponent/Skills/skills";
import Certifications from "@/app/TemplateComponent/Certifications/certification";
import Projects from "@/app/TemplateComponent/Projects/project";
import Volunteering from "@/app/TemplateComponent/Volunteering/voluntering";
import Publications from "@/app/TemplateComponent/Publications/publication";
import References from "@/app/TemplateComponent/Reference/reference";
import Awards from "@/app/TemplateComponent/Awards/awards";
import Interests from "@/app/TemplateComponent/Interests/interest";
import Languages from "@/app/TemplateComponent/Language/language";
import MyContext from "@/app/components/Context/MyContext";
import A4ResumeWrapper from "@/app/components/Zoom/zoom";
import { StylesData } from "@/app/function/Styles";

import "@fontsource/inter"
import "@fontsource/open-sans"
import "@fontsource/fira-code"
import "@fontsource/merriweather"
import "@fontsource/roboto"
import "@fontsource/roboto-mono"

export default function Template1({ getValues, preview  }) {
 

  const {format, setFormat,margin, setMargin,showBreakLine, setShowBreakLine, showPageNumbers, setShowPageNumbers,
    primaryColor, setPrimaryColor,backgroundColor, setBackgroundColor,textColor, setTextColor,fontFamily, setFontFamily,fontSubset, setFontSubset,
    fontVariant, setFontVariant , fontSize, setFontSize , lineHeight, setLineHeight , hideIcons, setHideIcons , underlineLinks, setUnderlineLinks,
    } = useContext(MyContext)
   
    const [scale, setScale] = useState(1);

  useEffect(()=>{

    setPrimaryColor("#1c4487");
    setBackgroundColor("#ffffff");
    setTextColor("#000000") 

   },[setPrimaryColor,setBackgroundColor,setTextColor])

  const pdfRef = useRef();
  const styles = StylesData(pdfRef,setScale, fontVariant , fontSubset , fontSize , underlineLinks )

  

  const {
    personalInfo,
    education,
    skills,
    certifications,
    interests,
    languages,
    publications,
    volunteering,
    workExperience,
    projects,
    references,
    awards,
  } = getValues;


  return (
    <>
    
    <div  className="h-screen w-auto  m-0 overflow-hidden " >
    <A4ResumeWrapper   >
      <div style={{ width:"210mm" , height:"297mm" }} ref={pdfRef} >
      <div className={styles.document}   >
        <div className={styles.page } style={{ fontFamily:fontFamily }}   >  

          <div className={styles.main} style={{backgroundColor:backgroundColor , color:textColor , padding:margin , display:"flex" , flexDirection:"column" , gap: `${lineHeight}rem` }}>
            <p className={styles.name.name} style={{fontSize:styles.name.nameStyle}}>{personalInfo.fullName}</p>
            <p className={styles.title.title} style={{fontSize:styles.title.tileStyle}}>{personalInfo.headline}</p>
            <div className={styles.text.text} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html:personalInfo.summary }}></div>
            
            {/* Work Experience */}
            {workExperience?.length > 0 && (
              <WorkExperience
                workExperience={workExperience}
                styles={styles}
                bar={<div className={styles.line}></div>}
              />
            )}

            {/* Projects */}
            {projects?.length > 0 && <Projects projects={projects} styles={styles} bar={<div className={styles.line}></div>} />}

            {/* Volunteering */}
            {volunteering?.length > 0 && (
              <Volunteering volunteering={volunteering} styles={styles} bar={<div className={styles.line}></div>} />
            )}

            {/* Publications */}
            {publications?.length > 0 && (
              <Publications publications={publications} styles={styles} bar={<div className={styles.line}></div>}/>
            )}

            {/* Awards */}
            {awards?.length > 0 && <Awards awards={awards} styles={styles} bar={<div className={styles.line}></div>}/>}

            {/* Certifications */}
            {certifications?.length > 0 && (
              <Certifications certifications={certifications} styles={styles} bar={<div className={styles.line}></div>}/>
            )}

            {/* References */}
            {references?.length > 0 && (
              <References references={references} styles={styles} bar={<div className={styles.line}></div>}/>
            )}
          </div>

          <div className = {styles.sidebar} style={{backgroundColor:primaryColor ,padding:margin , display:"flex" , flexDirection:"column" , gap: `${lineHeight}rem` }}>
             <div className="text-white absolute ">{showPageNumbers && <p>Page:1</p>}</div>
            {/* Personal Info */}
            <PersonalInfo personalInfo={personalInfo} styles={styles} /> 

            {/* Education */}
           { education?.length>0 && <Education education={education} styles={styles} /> }

            {/* Skills */}
           { skills?.length>0 &&  <Skills skills={skills} styles={styles} /> }

            {/* Languages */}
           { languages?.length>0 && <Languages languages={languages} styles={styles} /> }

            {/* Interests */}
           { interests?.length>0 && <Interests interests={interests} styles={styles} /> }
          </div>

          </div>
      </div>
      </div>
      
       </A4ResumeWrapper>
       </div>
       {!preview && <div ><Button pdfRef={pdfRef}/></div>}
    </>
  );
}
