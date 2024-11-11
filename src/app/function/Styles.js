import React , {useEffect} from "react";

export const StylesData = (pdfRef , setScale , fontVariant , fontSubset , fontSize , underlineLinks ) =>{

    useEffect(() => {
        const handleResize = () => {
          const screenWidth =  pdfRef.current.offsetWidth;
          const screenHeight = window.innerHeight;
          const A4_WIDTH_MM = 210;
          const A4_HEIGHT_MM = 297;
    
          // Convert A4 size to pixels assuming 96 PPI (pixels per inch)
          const A4_WIDTH_PX = (A4_WIDTH_MM / 25.4) * 96;
          const A4_HEIGHT_PX = (A4_HEIGHT_MM / 25.4) * 96;
    
          // Calculate scaling factor based on screen dimensions
          const scaleX = screenWidth / A4_WIDTH_PX;
          const scaleY = screenHeight / A4_HEIGHT_PX;
          const scale = Math.min(scaleX, scaleY);
    
          setScale(scale);
        };
    
        // Initial scaling
        handleResize();
    
        // Recalculate on window resize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [pdfRef , setScale]);
     
const styles = {
  page: `flex flex-row h-[297mm] w-[210mm] bg-white font-roboto  font-${fontVariant} `,
  document: `bg-white h-[297mm] w-[210mm] md:h-full overflow-hidden w-full absolute left-0  `,
  sidebar: `w-1/3  p-5 text-white break-words `,
  main: `w-2/3 p-5 `,
  image: ` mx-auto ${fontSubset}   `,
  name: { name:"text-2xl font-medium mb-1", nameStyle:`${fontSize+1.5}rem`},
  title: {title:" text-xl mb-5" , tileStyle : `${fontSize+1.125}rem `},
  sectionTitle: { sectionTitle:" text-2xl font-bold mb-2 mt-10 ", sectionTitleStyle:`${fontSize+1.25}rem` },
  sectionSecondTitle: { sectionSecondTitle:" text-xl  font-bold mb-2 mt-2 ", sectionSecondTitleStyle : `${fontSize+1.25}rem` },
  sidebarSection: "mb-5",
  sidebarSectionTitle: { sidebarTitle : " text-lg mb-1 font-medium ", sidebarTitleStyle : `${fontSize+1.125}rem` },
  text: { text:" mb-1 break-words " , textStyle: `${fontSize+0.5}rem` , textStyle1:underlineLinks && "underline" }, 
  experienceItem: "mb-6",
  experienceTitle: { experienceTitle : "text-xs" , experienceTitleStyle : `${fontSize+0.75}rem` },
  experienceDate: { experienceDate : "text-xs text-gray-600 " , experienceDateStyle : `${fontSize+0.75}rem` },
  line: "w-full mx-1 bg-[#8c6104] h-0.5 mb-2",
  small:{small :"text-gray-300 mb-2 text-[0.5rem] ", smallStyle: `${fontSize+0.5}rem` , smallStyle1:underlineLinks && "underline"},
  sideText: { sidetext :" text-[0.6rem] mb-1 break-words text-white font-medium " , sideTextStyle : `${fontSize+0.6}rem`}
};

return styles;
}