"use client"
import React, { useEffect, useState , useRef } from 'react'
import { postData } from '@/app/function/postData'
import { 
  Key,  
  AlertCircle,
  ArrowRight,
  Shield 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/footer'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from 'next/image'
import  html2pdf  from 'html2pdf.js'
 
const PFX = ({params}) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [screenWidth, setScreenWidth] = useState(null)
  const imageRef = useRef(null);

  const retrievePDF = async () => {
    if (password && params.slug) {
      setIsLoading(true)
      try {
        const response = await postData(
          {URL: params?.slug, password: password}, 
          "../../api/verifyURL"
        )
        
        if (response.state === "success") {
          setPdfUrl(response.origURL)
          setError(null)
        } else {
          setError(response.message || "Authentication failed")
          setPdfUrl(null)
        }
      } catch (err) {
        setError("An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    retrievePDF()
  }

  const handleDownload = async() => {

     const options = { 
          margin: 0,
          filename: "Mydocument",
          image: { type: "jpeg", quality: 3 },
          html2canvas: { scale: 3 },
          jsPDF:{

          unit: "mm",
          format: "a4", 
          orientation: "portrait",
          compress: true,
          maxWidth: 210, 
          maxHeight: 297, 
          autoPaging: false, 
          pageBreak: "avoid",
          
        }
      };
        html2pdf().from(imageRef.current).set(options).save();        
  } 

  useEffect(() => {
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 


  return (
    <div className='flex flex-col'>
    <div className="  min-h-screen w-screen  bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center p-4">
        <AnimatePresence>
          {!pdfUrl ? ( 
            <motion.form
              key="password-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="p-8 space-y-6"
            >
              <div className="flex justify-center mb-4">
                <Shield className="text-blue-500" size={64} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-800">Secure Access</h2>
              <p className="text-center text-gray-600 mb-4">Enter the password to view the resume</p>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg flex items-center"
                >
                  <AlertCircle className="mr-2 text-red-500" size={20} />
                  <span>{error}</span>
                </motion.div>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                >
                  <Key size={20} />
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center group"
              >
                {isLoading ? (
                  <div className="animate-spin">
                    <ArrowRight className="text-white" />
                  </div>
                ) : (
                  <>
                    Access Resume
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (

           screenWidth>=720 ? 

    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-3/5">
        <div className="relative w-full h-auto my-20 ">
          <Image
            src={pdfUrl}
            ref={imageRef}
            alt="Document Image"
            layout="responsive"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        
        <button
          onClick={handleDownload}
          className="group absolute top-4 right-4 flex items-center justify-center
            w-12 h-12 bg-blue-500 text-white rounded-full
            shadow-lg hover:bg-blue-600 transition-all duration-300
            transform hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-blue-300 mt-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:animate-bounce"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" x2="12" y1="15" y2="3"/>
          </svg>
        </button>
      </div>
    </div>
         
         :
          <div className="relative w-full h-screen  bg-gradient-to-br from-amber-100 to-orange-100  ">
          
          
          <button 
  onClick={handleDownload}
  className="group absolute top-2 right-2 flex items-center justify-center 
    w-12 h-12 bg-blue-500 text-white rounded-full 
    shadow-lg hover:bg-blue-600 transition-all duration-300 
    transform hover:scale-110 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-blue-300 my-10"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="group-hover:animate-bounce"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
</button>     
          <Image
            src={pdfUrl} // Use your image URL here
            alt="Zoomable Image"
            layout="intrinsic"
            width={1000} // Adjust width accordingly
            height={1000} // Adjust height accordingly
            className="object-contain w-full h-full shadow-lg my-20 "
          />   
        </div>
         )}
        </AnimatePresence>
    </div>
     <Footer/>
    </div>
  );
}

export default PFX

 