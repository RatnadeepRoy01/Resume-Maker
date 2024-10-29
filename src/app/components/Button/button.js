"use client"
import React from 'react'

const Button = () => {
  return (
    <div>
      <button 
  className="fixed h-20 w-20 right-4 bottom-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-transform duration-300 ease-in-out flex items-center justify-center"
>
  <span className="relative">
    <svg 
      className="w-8 h-8 mx-auto" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V6m-7 7l7-7 7 7"></path>
    </svg>
    <span className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></span>
  </span>
</button>
    </div>
  )
}

export default Button
