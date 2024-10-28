

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import CryptoJS from "crypto-js";
import Image from "next/image"; // Import Image from next/image for optimized image loading

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // Track the step in the process

  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/send-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const data = await res.json();
      // Store the encrypted code in local storage
      localStorage.setItem(email, data.encryptedCode);
      setStep(2); // Move to the next step
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const storedCode = localStorage.getItem(email);
    const decryptedCode = CryptoJS.AES.decrypt(storedCode, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (decryptedCode === verificationCode) {
      setStep(3); // Move to password entry
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
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 overflow-hidden transform transition-all duration-500 scale-95 hover:scale-100">
        <div className="p-6 space-y-6">
          
           {/* Step Indicator */}
           <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`h-2 w-2 bg-gray-400 rounded-full transition-all duration-300 ${
                  step === dot ? 'h-3 w-3 bg-blue-500' : ''
                }`}
              ></div>
            ))}
          </div>


          {/* Step 1: Email Input */}
          {step === 1 && (
            <div className="transition-transform duration-500 ease-in-out transform opacity-100">
              <h2 className="text-2xl font-bold text-center text-gray-700">Enter Your Email</h2>
              <form onSubmit={handleEmailSubmit} className="mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition duration-300">
                  Send Verification Code
                </button>
              </form>
              
            </div>
          )}

          {/* Step 2: Verification Code Input */}
          {step === 2 && (
            <div className="transition-transform duration-500 ease-in-out transform opacity-100">
              <h2 className="text-2xl font-bold text-center text-gray-700">Verify Your Code</h2>
              <form onSubmit={handleVerificationSubmit} className="mt-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition duration-300">
                  Verify Code
                </button>
              </form>
             
            </div>
          )}

          {/* Step 3: Password Input */}
          {step === 3 && (
            <div className="transition-transform duration-500 ease-in-out transform opacity-100">
              <h2 className="text-2xl font-bold text-center text-gray-700">Enter Your Password</h2>
              <form onSubmit={handlePasswordSubmit} className="mt-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition duration-300">
                  Sign In
                </button>
              </form>
             
            </div>
          )}

       


          {/* Logo Section */}
          <div className="flex flex-col justify-center space-y-2">
            <button onClick={() => signIn("google")} className="flex items-center border border-gray-300 rounded-md p-2 hover:bg-gray-100 transition duration-300 shadow-lg">
              <Image src="/Google.webp" alt="Google" width={20} height={20} />
              <span className="ml-2 text-gray-700">Login with Google</span>
            </button>
            <button onClick={() => signIn("github")} className="flex items-center border border-gray-300 rounded-md p-2 hover:bg-gray-100 transition duration-300 shadow-lg">
              <Image src="/Github.webp" alt="GitHub" width={20} height={20} />
              <span className="ml-2 text-gray-700">Login with GitHub</span>
            </button>
          </div>

          {step == 1 &&  <p className="text-center text-gray-500 mt-4">Already have an account? <button onClick={() => setStep(1)} className="text-blue-500">Log in</button></p>}
          {step == 2 &&  <p className="text-center text-gray-500 mt-4">Need help? <span className="text-blue-500 cursor-pointer">Resend Code</span></p>}
          {step == 3 &&  <p className="text-center text-gray-500 mt-4">Forgot your password? <span className="text-blue-500 cursor-pointer">Reset it</span></p>}
        </div>
      </div>
    </div>
  );
}