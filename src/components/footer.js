"use client"
import React, { useState } from 'react';
import { Twitter, Linkedin, Github, Mail, Phone, MapPin, Send, Star, MessageSquare } from 'lucide-react';

const Footer = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFeedback('');
      setRating(0);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Top Wave SVG */}
        <div className="w-full h-12 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-blue-500/10">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Feedback Section */}
        <div className="max-w-2xl mx-auto mb-16 transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -ml-16 -mb-16"></div>
            
            {isSubmitted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4">
                  <MessageSquare className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-green-400 mb-2">Thank You!</h3>
                <p className="text-gray-300">Your feedback has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Share Your Feedback
                </h3>
                
                {/* Star Rating */}
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transform transition-transform duration-200 hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-500'
                        } transition-colors duration-200`}
                      />
                    </button>
                  ))}
                </div>

                {/* Feedback Input */}
                <div className="relative">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    rows="4"
                  />
                  <div className="absolute right-4 bottom-4 text-gray-400 text-sm">
                    {feedback.length}/500
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ResumeBuilder
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Create professional resumes with ease. Stand out from the crowd and land your dream job.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="transform hover:scale-110 transition-transform duration-300">
                <Twitter className="w-5 h-5 text-blue-400 hover:text-blue-300" />
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-5 h-5 text-blue-400 hover:text-blue-300" />
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform duration-300">
                <Github className="w-5 h-5 text-blue-400 hover:text-blue-300" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Features
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
            </h3>
            <ul className="space-y-3">
              {['Templates', 'Customization', 'PDF Export', 'AI Writing', 'Format Options'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
            </h3>
            <ul className="space-y-3">
              {['Resume Tips', 'Career Advice', 'FAQ', 'Blog', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <span>support@resumebuilder.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                <span>New York, NY 10012</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;