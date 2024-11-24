"use client"

import { useContext, useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import MyContext from '../components/Context/MyContext';

const LoginForm = ({fromName}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError ] =useState(null);
  const { setShowComponent , setShowComponent1 } = useContext(MyContext)
  const Router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      type:"login"
    });

    if (res.error) {
      setError("Invalid password or email")
   
   } else {
    if(fromName)
      setShowComponent(false)
    else
     window.location.href = "/";
   }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-96 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/10">
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              required
            />
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              required
            />
              <div className="text-red-500 ">{error && error}</div>
            <button 
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Social Login */}
      { !fromName &&  <div className="space-y-4">
            <div className="relative flex items-center gap-4">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="text-white/60 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>
            
            <div className="space-y-3">
              <button 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white flex items-center justify-center space-x-3 transform transition-all duration-300 hover:bg-white/20"
              >
                <span>Continue with Google</span>
              </button>
              
              <button 
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white flex items-center justify-center space-x-3 transform transition-all duration-300 hover:bg-white/20"
                onClick={() => signIn("github")}  
             >
                <span>Continue with GitHub</span>
              </button>
            </div>
          </div> }

          {/* Footer */}
          <div className="text-center text-white/60">
            <p>
              Don&apos;t have an account?{' '}
              <button className="text-white hover:text-purple-200 transition-colors" onClick={()=>{ fromName ? setShowComponent1(false) : Router.push("./TwoStepSignin")}} >
                Sign up
              </button>
            </p>
            <p className="mt-2">
              <button className="text-white/60 hover:text-purple-200 transition-colors">
                Forgot password?
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

