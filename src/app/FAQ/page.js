
"use client"

import React ,{ useState } from "react";
import { motion } from "framer-motion";

const faqData = [
    {
      question: "How do I create a resume?",
      answer: "You can create a resume by selecting a template and filling in your details. Our guided steps will help you through the process."
    },
    {
      question: "Can I download my resume?",
      answer: "Yes, once you complete your resume, you can download it as a PDF."
    },
    {
      question: "Are the templates customizable?",
      answer: "Absolutely! You can customize every section of the templates to fit your needs."
    },
    {
      question: "Is there a fee to use the resume builder?",
      answer: "Our resume builder is free to use. You can create and download resumes without any charges."
    },
    {
      question: "Can I save my progress?",
      answer: "Yes, you can save your progress and come back to edit your resume anytime."
    },
  ];
  
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleFAQ = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="border-b border-gray-200">
        <motion.div 
          className="flex justify-between items-center py-4 cursor-pointer"
          onClick={toggleFAQ}
          initial={{ backgroundColor: 'transparent' }}
          whileHover={{ backgroundColor: '#f3f4f6' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold">{question}</h3>
          <span className="text-xl">{isOpen ? '-' : '+'}</span>
        </motion.div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="py-2">{answer}</p>
        </motion.div>
      </div>
    );
  };
  
  const FAQSection = () => {
    return (
      <section id="faq" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQSection;