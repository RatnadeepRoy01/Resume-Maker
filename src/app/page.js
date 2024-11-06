"use client"

import React, { useEffect, useRef, useState,useContext } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Check, Mail, Lock, Eye, FileText, PenTool } from 'lucide-react';
import FAQSection from './FAQ/page';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MyContext from './components/Context/MyContext';
import SelectParser from './Features/selectParser/features';

const useView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { userData1 } =  useContext(MyContext);
  
  useEffect(()=>{
  console.log("userDataPage",userData1)
    },[userData1])
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(ref.current);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.floor(start));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};


const Feature = ({ icon, title, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { 
    once: true, 
    margin: '0px 0px 0px 0px' // Trigger when the element is in view at 50%
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </motion.div>
  );
};


const TemplatePreview = ({ name, direction }) => (
  <motion.div
    className="bg-white p-4 rounded-lg shadow-md"
    initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-semibold mb-2">{name}</h3>
    <div className="bg-gray-200 w-full h-40 rounded-md"></div>
  </motion.div>
);

const testimonialsData = [
  {
    name: "John Doe",
    feedback: "This resume builder made it easy for me to create a professional resume in no time. Highly recommend!",
    designation: "Software Engineer",
  },
  {
    name: "Jane Smith",
    feedback: "I loved the variety of templates available. It helped me stand out in my job applications!",
    designation: "Marketing Specialist",
  },
  {
    name: "Emily Johnson",
    feedback: "The step-by-step guide was super helpful. I feel confident submitting my new resume!",
    designation: "Project Manager",
  },

];

const TestimonialCard = ({ name, feedback, designation }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:scale-105"
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }} // Adds a hover scale effect
    >
      <p className="text-lg italic mb-4">{feedback}</p>
      <h4 className="font-bold">{name}</h4>
      <p className="text-gray-500">{designation}</p>
    </motion.div>
  );
};

const LandingPage = () => {

  const Router = useRouter();

  const [showSelectParser, setShowSelectParser] = useState(false);

  const handleClick = () => {
    setShowSelectParser(true);
  };

  return (

   
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
 
 { showSelectParser &&  <div className=' z-40 w-screen fixed h-screen flex justify-center items-center'> <SelectParser /> </div> }
             {/* header */}
      <header className="bg-transparent shadow-sm absolute w-full">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white  md:block hidden">ResumeBuilder</div>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-white hover:text-gray-900">Features</a></li>
              <li><a href="#templates" className="text-white hover:text-gray-900">Templates</a></li>
              <li><a href="#" className="text-white hover:text-gray-900">Sign Up</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
           {/* main */}

      <main className="flex-grow">
       
<section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 flex flex-col">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center">
      <AnimatedSection>
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Perfect Resume in Minutes</h1>
          <p className="hidden md:block text-xl mb-6">Professional templates, easy customization, and instant PDF download. Get noticed by employers today!</p>
         
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-300 text-lg font-semibold" onClick={handleClick }>
          {/* Router.push("./SelectTemplate") */}
            Create Your Resume
          </button>
         
     


        </div>
      </AnimatedSection>
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, scale: 0.8 }}  // Initial state
        whileInView={{ opacity: 1, scale: 1 }} // Animation state when in view
        transition={{ duration: 0.5 }}         // Transition effect
        viewport={{ once: true }}              // Animation triggers only once
      >


       <Image 
                src="/Template1.webp" 
                alt="Resume builder illustration" 
                width={500} // Replace with the original width of the image
                height={500} // Replace with the original height of the image
                className="rounded-lg shadow-lg"
            />
      </motion.div>
    </div>
  </div>
</section>
<div className='h-10 w-10 bg-pink-600' onClick={()=>{Router.push("./Features/selectParser")}}></div>
           {/* Users */}

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h2 className="text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter end={100000} duration={2} />+
                  </h2>
                  <p className="text-xl text-gray-600">Users Signed Up</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter end={500000} duration={2} />+
                  </h2>
                  <p className="text-xl text-gray-600">Resumes Generated</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter end={50} duration={2} />+
                  </h2>
                  <p className="text-xl text-gray-600">Professional Templates</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Features Section */}
       
        <section id="features" className="py-20 bg-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Our Resume Builder?</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <Feature icon={<Lock className="text-green-500" />} title="Free Forever" delay={0.1} />
      <Feature icon={<Eye className="text-green-500" />} title="Open Source" delay={0.2} />
      <Feature icon={<PenTool className="text-green-500" />} title="No User Tracking" delay={0.3} />
      <Feature icon={<Mail className="text-green-500" />} title="Sign in with Email" delay={0.4} />
      <Feature icon={<FileText className="text-green-500" />} title="Multiple Templates" delay={0.5} />
      <Feature icon={<Check className="text-green-500" />} title="Easy Customization" delay={0.6} />
    </div>
  </div>
</section>

          {/* Teemplates */}

          <section id="templates" className="py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Choose from Various Templates</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <TemplatePreview name="Professional" direction="left" />
                <TemplatePreview name="Creative" direction="right" />
                <TemplatePreview name="Executive" direction="left" />
              </div>
            </AnimatedSection>
          </div>
        </section>
            
       {/* Getting started   */}

        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Perfect Resume?</h2>
              <p className="text-xl mb-8">Join thousands of job seekers who have successfully landed their dream jobs.</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition duration-300 text-lg font-semibold">
                Get Started Now - It&apos;s Free!
              </button>
            </AnimatedSection>
          </div>
        </section>
      </main>

       {/* Testimonial */}

      <section id="testimonials" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              name={testimonial.name} 
              feedback={testimonial.feedback} 
              designation={testimonial.designation} 
            />
          ))}
        </div>
      </div>
    </section>
   
   {/* faq */}

      <FAQSection/>

   {/* footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ResumeBuilder</h3>
              <p className="text-sm">Create professional resumes with ease.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Templates</a></li>
                <li><a href="#" className="hover:text-blue-300">Customization</a></li>
                <li><a href="#" className="hover:text-blue-300">PDF Export</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Resume Tips</a></li>
                <li><a href="#" className="hover:text-blue-300">Career Advice</a></li>
                <li><a href="#" className="hover:text-blue-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-300">LinkedIn</a></li>
                <li><a href="#" className="hover:text-blue-300">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; 2024 ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

