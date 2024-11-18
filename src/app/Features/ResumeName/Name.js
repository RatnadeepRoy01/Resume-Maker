import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import MyContext from '@/app/components/Context/MyContext';

const Name = ({name}) => {
  const [text, setText] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setTemplateName } = useContext(MyContext)
  const Router = useRouter();
  
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

  const handleSubmit = () => {
    setTemplateName(text)
    console.log(text,"text")
    Router.push(`./ResumaForm?template=${name}`) 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] md:w-[50%] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-12 rounded-xl shadow-2xl">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-4xl space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Resume Builder
          </h2>
          <p className="text-gray-600 text-base md:text-lg">Start crafting your perfect resume</p>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your resume name"
            className="w-full px-6 py-4 text-lg md:text-xl border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg bg-white relative"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400">
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 15l5-5-5-5"
              />
            </svg>
          </div>
        </div>
        
        <div className="mt-6 text-center h-8 md:h-10 overflow-hidden">
          <div
            className={`transform transition-all duration-1000 ease-in-out ${
              isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {phrases[currentPhrase]}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className={`w-full mt-6 px-8 py-4 md:py-5 rounded-full font-semibold text-white text-lg md:text-xl shadow-lg 
            transition-all duration-300 transform hover:scale-[1.02] 
            ${text.trim() 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          Create Resume
        </button>
      </div>
    </div>
  );
};

export default Name;