"use client";
import React, { useState , useRef , useContext , useEffect } from "react";
import html2pdf from "html2pdf.js";
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
import { set , get } from "idb-keyval";
import { postData } from "@/app/function/postData";

import "@fontsource/inter"
import "@fontsource/open-sans"
import "@fontsource/fira-code"
import "@fontsource/merriweather"
import "@fontsource/roboto"
import "@fontsource/roboto-mono"

export default function Template1({ getValues, preview , save }) {
  

  const {format, setFormat,margin, setMargin,showBreakLine, setShowBreakLine, showPageNumbers, setShowPageNumbers,
    primaryColor, setPrimaryColor,backgroundColor, setBackgroundColor,textColor, setTextColor,fontFamily, setFontFamily,fontSubset, setFontSubset,
    fontVariant, setFontVariant , fontSize, setFontSize , lineHeight, setLineHeight , hideIcons, setHideIcons , underlineLinks, setUnderlineLinks,
    } = useContext(MyContext)
  
     const savingData = {format, margin, showBreakLine, showPageNumbers,
      primaryColor, backgroundColor, textColor,fontFamily,fontSubset,
      fontVariant, fontSize, lineHeight, hideIcons,underlineLinks
     }  
    const [scale, setScale] = useState(1);


        // useEffect(()=>{
         
        //  const  insertCssdata = async() =>{
        //      console.log("savingCssData1111111111111111111111111111111111111111111111111")
        //   if(save?.dataType == "oldData"){

        //      const oldData =  await get(`${save.IdData}Css`);
        //      console.log(oldData,"oldData")      
        //     const update = (()=>{

        //      setFormat(oldData.format); 
        //      setMargin(oldData.margin);
        //      setShowBreakLine(oldData.showBreakLine);
        //      setShowPageNumbers(oldData.showPageNumbers),
        //      setPrimaryColor(oldData.primaryColor);
        //      setBackgroundColor(oldData.backgroundColor);
        //      setTextColor(oldData.textColor);
        //      setFontFamily(oldData.fontFamily);
        //      setFontSubset(oldData.fontSubset);
        //      setFontVariant(oldData.fontVariant);
        //      setFontSize(oldData.fontSize);
        //      setLineHeight(oldData.lineHeight);
        //      setHideIcons(oldData.hideIcons);  
        //      setUnderlineLinks(oldData.underlineLinks);
      
        //     });

        //     update();

        //   }          
        //   else if(save?.updateData == true){
               
        //     if(!save?.IdData) return;
        //     else savingData.key = save.IdData;

        //     const url = "../../api/insertCssData"     
        //     set(`${save?.IdData}Css`,savingData)
        //     const response = await postData({savingData,id:save?.IdData} , url)     
            
        //   }else{

        //     if(!save?.IdData) return;
        //     else savingData.key = save.IdData;

        //     const url = "../../api/insertCssData" 
        //     const IdData = `${save.IdData}Css`    
        //     set(IdData,savingData)
        //     const response = await postData({savingData} , url)    

        //   }
        //  }
        //  insertCssdata();

        // },[save])

       

  useEffect(()=>{

    setPrimaryColor("#2B3A55");
    setBackgroundColor("#ffffff");
    setTextColor("#000000") 

   },[setBackgroundColor,setPrimaryColor,setTextColor])

  const pdfRef = useRef();
  const styles = StylesData(pdfRef,setScale, fontVariant , fontSubset , fontSize , underlineLinks )
   console.log("styledata",styles)
  const generatePDF = () => {
    const options = {
      margin: 0,
      filename: "my-document.pdf",
      image: { type: "pdf", quality: 1 },
      html2canvas: { scale: 3 },
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
    
    <div  className="h-screen w-auto  m-0 overflow-hidden " >
    <A4ResumeWrapper   >
      <div style={{ width:"210mm" , height:"297mm" }} ref={pdfRef} >
      <div className={styles.document}   >
        <div className={styles.page } style={{ fontFamily:fontFamily }}   >
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
          

          <div className={styles.main} style={{backgroundColor:backgroundColor , color:textColor , padding:margin , display:"flex" , flexDirection:"column" , gap: `${lineHeight}rem` }}>
            <p className={styles.name.name} style={{fontSize:styles.name.nameStyle}}>{personalInfo.fullName}</p>
            <p className={styles.title.title} style={{fontSize:styles.title.tileStyle}}>{personalInfo.headline}</p>

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
          </div>
      </div>
      </div>
      
       </A4ResumeWrapper>
       </div>
       {!preview && <div onClick={generatePDF}><Button /></div>}
    </>
  );
}