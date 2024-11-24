"use client";

import { useState , useEffect, useContext } from "react";
import { signIn } from "next-auth/react";
import CryptoJS from "crypto-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MyContext from "../components/Context/MyContext";
import dynamic from "next/dynamic";

export default function SignIn({fromName}) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error , setError ] =useState(null);
  const { showComponent1 , setShowComponent1 , setShowComponent } = useContext(MyContext)
  const Router = useRouter();
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const [DynamicSignIn, setDynamicSignIn] = useState(null);

  useEffect(() => {
    if (showComponent1 && !DynamicSignIn) {
     
      const loadComponent = async () => {
        const Component = dynamic(() => import('@/app/Login/page'), {
          loading: () => <p>Loading Sign In...</p>,
          ssr: false,
        });
        setDynamicSignIn(() => Component);
      };
      loadComponent();
    }
  }, [showComponent1, DynamicSignIn]);


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/send-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(email, data.encryptedCode);
      setStep(2);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const storedCode = localStorage.getItem(email);
    const decryptedCode = CryptoJS.AES.decrypt(storedCode, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (decryptedCode === verificationCode) {
      setStep(3);
    } else {
      alert("Invalid verification code");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      type:"signin"
    });
    if (res.error) {
       setError("User already exist")
    
    } else {
      if(fromName)
      setShowComponent(false)
    else
      window.location.href = "/";
    }

  };

  return (
    <>
    {showComponent1 ? DynamicSignIn && < DynamicSignIn fromName = { true }/> : 
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-96 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 space-y-6">
          {/* Animated Progress Bar */}
          <div className="relative h-1 bg-white/20 rounded-full overflow-hidden mb-8">
            <div 
              className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-4 mb-8">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                  ${step === dot 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110' 
                    : 'bg-white/20 text-white/60'
                  }`}
              >
                {dot}
              </div>
            ))}
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Verification */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center">Verify Email</h2>
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Verify Code
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center">Enter Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    required
                  />
                </div>
                <div className="text-red-500 ">{error && error}</div>
                <button 
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Sign In
                </button>
              </form>
            </div>
          )}

          {/* Social Login Section */}
         { !fromName &&
          <div className="mt-8 space-y-4">
            <div className="relative flex items-center gap-4">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="text-white/60 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => signIn("google")} 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white flex items-center justify-center space-x-3 transform transition-all duration-300 hover:bg-white/20"
              >
                <Image src="/Google.webp" alt="Google" width={20} height={20} />
                <span>Continue with Google</span>
              </button>
              
              <button 
                onClick={() => signIn("github")} 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white flex items-center justify-center space-x-3 transform transition-all duration-300 hover:bg-white/20"
              >
                <Image src="/Github.webp" alt="GitHub" width={20} height={20} />
                <span>Continue with GitHub</span>
              </button>
            </div>
          </div>
          }
          {/* Footer Text */}
          <div className="text-center text-white/60">
            {step === 1 && (
              <p>
                Already have an account?{' '}
                <button onClick={() => fromName ? setShowComponent1(true) : Router.push("./Login")} className="text-white hover:text-purple-200 transition-colors">
                  Log in
                </button>
              </p>
            )}
            {step === 2 && (
              <p>
              Already have an account?{' '}
              <button onClick={() => fromName ? setShowComponent1(true) : Router.push("./Login")} className="text-white hover:text-purple-200 transition-colors">
                Log in
              </button>
            </p>
            )}
            {step === 3 && (
             <p>
             Already have an account?{' '}
             <button onClick={() => fromName ? setShowComponent1(true) : Router.push("./Login")} className="text-white hover:text-purple-200 transition-colors">
               Log in
             </button>
           </p>
            )}
          </div>
        </div>
      </div>
    </div>
    }</>
  );
}