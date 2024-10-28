"use client";

import React, { useState , useRef , useContext , useEffect } from "react";
import html2pdf from "html2pdf.js";
import Button from "@/app/components/Button/page";
import PersonalInfo from "@/app/TemplateComponent/personalInfo/page";
import Education from "@/app/TemplateComponent/Education/page";
import WorkExperience from "@/app/TemplateComponent/Work-Experience/page";
import Skills from "@/app/TemplateComponent/Skills/page";
import Certifications from "@/app/TemplateComponent/Certifications/page";
import Projects from "@/app/TemplateComponent/Projects/page";
import Volunteering from "@/app/TemplateComponent/Volunteering/page";
import Publications from "@/app/TemplateComponent/Publications/page";
import References from "@/app/TemplateComponent/Reference/page";
import Awards from "@/app/TemplateComponent/Awards/page";
import Interests from "@/app/TemplateComponent/Interests/page";
import Languages from "@/app/TemplateComponent/Language/page";
import MyContext from "@/app/components/Context/MyContext";
import A4ResumeWrapper from "@/app/components/Zoom/page";
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

  const generatePDF = () => {
    const options = {
      margin: 0,
      filename: "my-document.pdf",
      image: { type: "pdf", quality: 0.5 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(pdfRef.current).set(options).save();
  };

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
     
    <div className="h-screen w-screen flex justify-center items-center mx-20 my-40 md:w-auto md:block md:m-0 md:overflow-y-hidden   "  >
    <A4ResumeWrapper   >
      <div style={{ transform:`scale${scale}`, width:"212mm" , height:"297mm" }} ref={pdfRef} >
      <div className={styles.document}   >
        <div className={styles.page } style={{ fontFamily:fontFamily }}   >
         
          <div className={styles.main} style={{backgroundColor:backgroundColor , color:textColor , padding:margin , display:"flex" , flexDirection:"column" , gap: `${lineHeight}rem` }}>
            <p className={styles.name.name} style={{fontSize:styles.name.nameStyle}}>{personalInfo.fullName}</p>
            <p className={styles.title.title} style={{fontSize:styles.title.tileStyle}}>{personalInfo.headline}</p>

            {/* Work Experience */}
            {workExperience.length > 0 && (
              <WorkExperience
                workExperience={workExperience}
                styles={styles}
                bar={<div className={styles.line}></div>}
              />
            )}

            {/* Projects */}
            {projects.length > 0 && <Projects projects={projects} styles={styles} bar={<div className={styles.line}></div>} />}

            {/* Volunteering */}
            {volunteering.length > 0 && (
              <Volunteering volunteering={volunteering} styles={styles} bar={<div className={styles.line}></div>} />
            )}

            {/* Publications */}
            {publications.length > 0 && (
              <Publications publications={publications} styles={styles} bar={<div className={styles.line}></div>}/>
            )}

            {/* Awards */}
            {awards.length > 0 && <Awards awards={awards} styles={styles} bar={<div className={styles.line}></div>}/>}

            {/* Certifications */}
            {certifications.length > 0 && (
              <Certifications certifications={certifications} styles={styles} bar={<div className={styles.line}></div>}/>
            )}

            {/* References */}
            {references.length > 0 && (
              <References references={references} styles={styles} bar={<div className={styles.line}></div>}/>
            )}
          </div>

          <div  className = {styles.sidebar} style={{backgroundColor:primaryColor ,padding:margin , display:"flex" , flexDirection:"column" , gap: `${lineHeight}rem` }}>
             <div className="text-white absolute ">{showPageNumbers && <p>Page:1</p>}</div>
            {/* Personal Info */}
            <PersonalInfo personalInfo={personalInfo} styles={styles} />

            {/* Education */}
            <Education education={education} styles={styles} />

            {/* Skills */}
            <Skills skills={skills} styles={styles} />

            {/* Languages */}
            <Languages languages={languages} styles={styles} />

            {/* Interests */}
            <Interests interests={interests} styles={styles} />
          </div>
          

          </div>
      </div>
      </div>
      
       </A4ResumeWrapper>
       </div>
       {!preview && <div onClick={generatePDF}><Button /></div>}
    </>
  );
}