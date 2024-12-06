"use client"
import React, { useState, useEffect, useContext , useRef } from 'react';
import { Eye, EyeOff, Copy, CheckCircle  } from 'lucide-react';
import MyContext from '@/app/components/Context/MyContext';
import { useSession } from "next-auth/react";
import SignIn from '@/app/TwoStepSignin/page';
import { postData } from '@/app/function/postData';
import { toPng } from 'html-to-image';

const generatePDF = async (imgRef, formData, session) => {
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

  const { data: session } = useSession({
    required: true,
    refetchInterval: 0,
    refetchOnWindowFocus: false,
    onUnauthenticated() {
      setShowComponent(true);
    }
  });


  const [formData, setFormData] = useState({
    text: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dots, setDots] = useState(0);
  const [click,setClick] = useState(false)
  const [Loading , setLoading] = useState(false)
  const [copied, setCopied] = useState(false);
 
  const { setTemplateName , setTemplatePassword , saveRef } = useContext(MyContext);
  const codeRef = useRef(null);

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
     const getUrl = await generatePDF(saveRef , formData , session);
     setLoading(`https://dev.profilenxt/pfx/${getUrl}`)
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

  return (
    <>
      {showComponent ? <SignIn fromName={true} /> : 
        <div className="flex flex-col items-center justify-center min-h-[500px] md:w-[50%] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 rounded-xl shadow-2xl">
          <div className="w-full md:w-[3/4] lg:w-2/3 xl:w-1/2 max-w-4xl space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Resume Builder
              </h2>
              <p className="text-gray-600 text-base md:text-lg">Start crafting your perfect resume</p>
            </div>

            <div className="space-y-4">
              {/* Resume Name Input */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <input
                  type="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Enter your resume name"
                  className="w-full px-6 py-4 text-lg md:text-xl border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg bg-white relative"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full px-6 py-4 text-lg md:text-xl border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg bg-white relative pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center h-8 md:h-10 overflow-hidden">
             
            {
                !click ?
              <div
                  className={`transform transition-all duration-1000 ease-in-out ${
                  isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                 <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {phrases[currentPhrase]}
                </p>
               </div>
                
                :

                <div className='w-full flex justify-center'>
            {
                !Loading ?
                <div className="flex items-center space-x-1 ">
                <span className={`h-2 w-2 rounded-full ${dots === 0 ? 'bg-gray-600' : 'bg-gray-300'}`}></span>
                <span className={`h-2 w-2 rounded-full ${dots === 1 ? 'bg-gray-600' : 'bg-gray-300'}`}></span>
                <span className={`h-2 w-2 rounded-full ${dots === 2 ? 'bg-gray-600' : 'bg-gray-300'}`}></span>
                </div>
                 :
                 <div className="flex items-center space-x-4">
                 <div className="relative bg-gray-300 rounded-lg overflow-hidden shadow-xl flex-grow">
                   <pre className="p-4  text-sm overflow-x-auto font-mono">
                     <code>{Loading}</code>
                   </pre>
                 </div>
                 <button 
                   onClick={handleCopy} 
                   className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-md"
                 >
                   {copied ? (
                     <CheckCircle className="" size={20} />
                   ) : (
                     <Copy size={20} />
                   )}
                 </button>
               </div>     
            }
             </div>
             
              }
              
            </div>

            <button               
               onClick={handleSubmit}               
               disabled={!formData.text.trim() || !formData.password.trim() || isSubmitting}               
               className={`w-full mt-6 px-8 py-4 md:py-5 rounded-full font-semibold text-white text-lg md:text-xl shadow-lg                  
               transition-all duration-300 transform hover:scale-[1.02]                  
               ${(formData.text.trim() && formData.password.trim() && !isSubmitting)                   
               ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'                    
               : 'bg-gray-300 cursor-not-allowed'                 
              } 
            ${isSubmitting ? 'animate-pulse' : ''}`}
            >
           {isSubmitting ? 'Creating...' : 'Create Resume'}
           </button> 

          </div>
        </div>
      }
    </>
  );
};

export default Name;