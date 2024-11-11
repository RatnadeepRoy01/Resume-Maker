"use client"
import React, { useContext , useRef , useEffect , useState} from "react";
import MyContext from "@/app/components/Context/MyContext";
import Image from "next/image";

export default function PersonalInfo({ personalInfo,styles }) {
  
  const imageRef = useRef(null);
  const{ profilePic } = useContext(MyContext)
  const [width, setWidth] = useState(0);

  useEffect(()=>{

    if (imageRef.current) {
      setWidth(imageRef.current.offsetWidth);
    }

   
    const handleResize = () => {
      if (imageRef.current) {
        setWidth(imageRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);


  },[])
console.log(width)
  return ( 
  <div>
           
          {profilePic && (
        <div
         className={`w-[225px] h-[225px] overflow-hidden bg-cover bg-center ${styles.image}`}
         style={{
         backgroundImage: profilePic ? `url(${profilePic})` : 'none' // Dynamically set the background image
      }}
         >
       </div>
     )}  

       <div className={styles.sidebarSection}>
      
        <p className={styles.sidebarSectionTitle.sidebarTitle} style={{fontSize:styles.sidebarSectionTitle.sidebarTitleStyle}}>Contact</p>
         <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}> Phone: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle}}>{personalInfo.phoneNumber}</p></p>
        <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}} >Email: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle}} > {personalInfo.email} </p></p>
        <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>Address:<p className={styles.small.small} style={{fontSize:styles.small.smallStyle}}> {personalInfo.address} </p></p>
        {personalInfo.website && <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>Website:<p className={styles.small.small} style={{fontSize:styles.small.smallStyle , textDecoration:styles.small.smallStyle1}}> {personalInfo.website} </p> </p>}
        {personalInfo.linkedIn && <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>LinkedIn: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle , textDecoration:styles.small.smallStyle1}}> {personalInfo.linkedIn} </p></p>}
        {personalInfo.github && <p className={styles.sideText.sideText} style={{fontSize:styles.sideText.sideTextStyle}}>GitHub: <p className={styles.small.small} style={{fontSize:styles.small.smallStyle , textDecoration:styles.small.smallStyle1}}> {personalInfo.github} </p></p>}
      </div>
      </div>
  );
}
