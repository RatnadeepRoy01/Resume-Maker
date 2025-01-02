"use client"
import React, { useState, useEffect, useContext , useRef } from 'react';
import { Eye, EyeOff, Copy, CheckCircle  } from 'lucide-react';
import MyContext from '@/app/Context/MyContext';
import { useSession } from "next-auth/react";
import SignIn from '@/app/(pages)/TwoStepSignin/page';
import { postData } from '@/app/function/postData';
import { toPng } from 'html-to-image';
import "../../../style.css"
import "../../Css/popUp.css"

const generatePDF = async (imgRef, formData, session = "undefined") => {
  try {
    
    const imageDataUrl = await toPng(imgRef, {
      quality: 1.0, 
      pixelRatio: 3, 
    });

   
    const base64Data = imageDataUrl.split(",")[1];
    const imageBlob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], {
      type: "image/png",
    });

    const fileName = formData.text;
    const fileType = "image/png";

    
    const response = await fetch("../../api/preSignedUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, fileType }),
    });

    const { uploadUrl, viewUrl } = await response.json();

    try {
      
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { 
          "Content-Type": fileType,
        },
        body: imageBlob,
      });

      console.log("File uploaded successfully!");
      console.log({ viewUrl });

      
      const url = "../../api/resumeURL";
      const insertData = await postData({ viewUrl, session, formData }, url);

      if (insertData.state === "success") {
       
      return insertData.text
      }

    } catch (err) {
      console.error("Error uploading file to S3:", err);
      prompt("Error uploading file check internet connection")
    }
  } catch (error) {
    console.error("Error generating or uploading image:", error);
    prompt("Error uploading file check internet connection")
  }
};



const Name = () => {
  const { showComponent, setShowComponent } = useContext(MyContext);

  // const { data: session } = useSession({
  //   required: true,
  //   refetchInterval: 0,
  //   refetchOnWindowFocus: false,
  //   onUnauthenticated() {
  //     setShowComponent(true);
  //   }
  // });


  const [formData, setFormData] = useState({
    text: 'EzCarrers_Resume',
    password: Math.floor(1000 + Math.random() * 9000)
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dots, setDots] = useState(0);
  const [click,setClick] = useState(false)
  const [Loading , setLoading] = useState(false)
  const [copied, setCopied] = useState(false);
  const [copied1 , setCopied1] = useState(false)
 
  const { setTemplateName , setTemplatePassword , saveRef } = useContext(MyContext);
  const codeRef = useRef(null);
  const buttonRef = useRef(null)
  
  const phrases = [
    "Create your professional resume ✨",
    "Stand out from the crowd 🌟",
    "Highlight your achievements 🏆",
    "Make a lasting impression 💫",
    "Begin your success story 🚀"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 500);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [phrases.length]);

  const handleSubmit = async() => {
     
    setClick(true)
    setIsSubmitting(true);
    console.log("Ref",saveRef)
     const getUrl = await generatePDF(saveRef , formData);
     setLoading(`https://dev.profilenxt.com/pfx/${getUrl}`)
     console.log({getUrl})

     if(getUrl){
      setIsSubmitting(false);
     }
 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 100);

    return () => clearInterval(interval);
  }, []);



  const handleCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = Loading;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy1 = () => {
    const textArea = document.createElement('textarea');
    textArea.value = formData.password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    setCopied1(true);
    setTimeout(() => setCopied1(false), 2000);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
       
        const intervalId = setInterval(() => {
            if (!showComponent) {
                buttonRef.current.click();
                clearInterval(intervalId); 
            } else {
                console.log("Email not present yet, checking again...");
            }
        }, 1000); // Check every 1 second

      
        return () => clearInterval(intervalId);
    }, 2000); // Initial 5-second delay

    
    return () => clearTimeout(timeoutId);
}, [showComponent]);

  return (
    <>
      {showComponent ? <SignIn fromName={true} /> : 
        
        <div className="flex flex-col items-center justify-center min-h-[500px] md:w-[50%]  ">
          

            {
                !Loading ?
                
                <div className="mb-6 w-[60%] md:w-[30%]  ">
          
                <div className="wrapper">
         <div className="box-wrap">
             <div className="box one"></div>
             <div className="box two"></div>
             <div className="box three"></div>
             <div className="box four"></div>
             <div className="box five"></div>
             <div className="box six"></div>
         </div>
     </div>
     
             </div>
             
                 :

                 <div className='popup-modal  cus  flex-col  custom-range:w-full w-[60%] bg-white min-h-[500px] items-center p-4 rounded-xl flex justify-center shadow-2xl '>
                 
                 <div className="text-center mb-8 ">
              <h2 className="text-2xl mx-4 md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
               EzCarrer The Perfect Resume Builder
              </h2>
              <p className="text-gray-600 text-base md:text-lg">Start crafting your perfect resume</p>
            </div>
                 
                 <div className="w-[75%]  flex flex-col  space-y-8">
                 
                  
            <div className="space-y-4">
              {/* Resume Name Input */}
              
              <div className="relative group flex">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div
                  className="w-full px-6 overflow-x-auto overflow-y-hidden py-4 text-lg md:text-xl border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg bg-white relative scrollbar-hide"
                >{Loading}
                
                          
                </div>
                  
                <button 
                   onClick={handleCopy} 
                   className=" z-40 bg-blue-500 text-white p-2 rounded-full ml-2 hover:bg-blue-600 transition-colors shadow-md  absolute top-1/2 right-4 transform -translate-y-1/2 "
                 >
                   {copied ? (
                     <CheckCircle className="" size={20} />
                   ) : (
                     <Copy size={20} />
                   )}
                 </button>  
               

                </div>
               
              {/* Password Input */}
              <div className="relative group flex">
                <div className="absolute -inset-1 bg-white rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div
                  className="w-full px-6 py-4 text-lg md:text-xl border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg bg-white relative"
                >{formData.password}
                
                <button 
                   onClick={handleCopy1} 
                   className="bg-blue-500 text-white p-2 rounded-full ml-2 hover:bg-blue-600 transition-colors shadow-md absolute right-2"
                 >
                   {copied1 ? (
                     <CheckCircle size={20} />
                   ) : (
                     <Copy size={20} />
                   )}
                 </button>
                
                
                </div>
                
              </div>
            </div>     
            </div>
            </div>
            }
            <button               
               onClick={handleSubmit}  
               ref={buttonRef}                   
            >
           
           </button> 


           
           </div>
        
      }
    </>
  );
};

export default Name;