"use client"

import React, { useEffect, useRef, useState,useContext } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Check, Mail, Lock, Eye, FileText, PenTool } from 'lucide-react';
import FAQSection from './FAQ/page';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MyContext from './components/Context/MyContext';
import SelectParser from './Features/selectParser/features';
import './Css/Card.css';
import ResumeCarousel from './components/AnimateTemplate/animateTemplate';
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
const fromColor = ["#6A4CFF","#4CAF50","#FF9800"];
const toColor = ["#3A8DFF","#009688","#FFEB3B"]
const TestimonialCard = ({ name, feedback, designation,index }) => {
  return (
    <motion.div 
      className={`card  md:w-[480px] w-[100%] ml-8 md:ml-0  `} 
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }} // Adds a hover scale effect
    >
      <div className={`content h-[330px]`} style={{background: `linear-gradient(to right,${fromColor[index]}, ${toColor[index]} )`,}}>
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z" />
        </svg>
        <p className="para">{feedback}</p>
        <h4 className="font-bold text-white">{name}</h4>
        <p className="text-gray-500">{designation}</p>
      </div>
    </motion.div>
  );
};

const LandingPage = () => {

  const Router = useRouter();

  const [showSelectParser, setShowSelectParser] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);

  const handleClick = () => {
    setShowSelectParser(true);
  };

  

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  }

  return (

   
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">
 
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
        <div className=" md:w-[1/2] mb-8 md:mb-0  ">
          <h1 className="mt-6 text-4xl leading-none md:max-w-[500px] lg:mt-8 lg:max-w-[460px]  lg:text-[72px] xl:max-w-[700px] xl:text-[96px] 2xl:mt-7 2xl:max-w-[800px] 2xl:text-[128px] 2xl:leading-[92%] 2xl:tracking-[-2px]">Create Your Resume in Minutes</h1>
          <p className="mt-6 w-full max-w-[600px] text-xl lg:mt-10 lg:w-[500px] xl:w-full xl:text-2xl hidden md:block mb-2">Professional templates, easy customization, and instant PDF download. Get noticed by employers today!</p>
         
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-300 text-lg font-semibold" onClick={handleClick }>
          
            Create Your Resume
          </button>
         
     


        </div>
      </AnimatedSection>
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, scale: 0.8 }}  // Initial state
        whileInView={{ opacity: 1, scale: 1 }} // Animation state when in view
        transition={{ duration: 0.5 }}         // Transition effect
        viewport={{ once: true }}              // Animation triggers  only once
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
           {/* Users */}


           <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <AnimatedSection>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        
       
        <a
          href="#"
          className="relative block overflow-hidden rounded-xl border border-gray-200 p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
        >
          <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></span>

          <div className="mt-4">
            <h2 className="text-5xl font-extrabold text-blue-600 mb-2">
              <AnimatedCounter end={100000} duration={2} />+
            </h2>
            <p className="text-lg font-medium text-gray-700">Users Signed Up</p>
            <p className="mt-2 text-sm text-gray-600">
              Join a thriving community of professionals and job seekers who trust us to build their personal brands.
            </p>
          </div>
        </a>

       
        <a
          href="#"
          className="relative block overflow-hidden rounded-xl border border-gray-200 p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
        >
          <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></span>

          <div className="mt-4">
            <h2 className="text-5xl font-extrabold text-blue-600 mb-2">
              <AnimatedCounter end={500000} duration={2} />+
            </h2>
            <p className="text-lg font-medium text-gray-700">Resumes Generated</p>
            <p className="mt-2 text-sm text-gray-600">
              Over half a million resumes have been crafted, helping users land opportunities in various industries worldwide.
            </p>
          </div>
        </a>

        
        <a
          href="#"
          className="relative block overflow-hidden rounded-xl border border-gray-200 p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
        >
          <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></span>

          <div className="mt-4">
            <h2 className="text-5xl font-extrabold text-blue-600 mb-2">
              <AnimatedCounter end={50} duration={2} />+
            </h2>
            <p className="text-lg font-medium text-gray-700">Professional Templates</p>
            <p className="mt-2 text-sm text-gray-600">
              Explore a wide variety of professionally designed templates to suit any career path and showcase your skills effectively.
            </p>
          </div>
        </a>

      </div>
    </AnimatedSection>
  </div>
</section>






        {/* Features Section */}
       
        <section id="features" className="py-20 bg-white">
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

       {/* Unleash your potential */}
<section className=" mx-6 md:mx-20 lg:mt-25 3xl:grid-cols-[475px_800px] 3xl:gap-16 mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[375px_auto] lg:items-center 2xl:grid-cols-[475px_700px] 2xl:gap-12">
  <h2 className="text-[72px] leading-none 2xl:text-[96px]">Unleash Your Potential</h2>
  <div className="-mb-3 pt-1 text-xl">
    <p>ProfileNxT is not just another resume tool –it&apos;s a cutting-edge platform that revolutionizes the way you approach your job search. Designed to help you highlight your unique strengths, it empowers you to present a compelling narrative of your skills and experiences, helping you secure the career you&apos;ve always wanted. All this, with a process that&apos;s efficient and enjoyable.</p>
    
  { !isExpanded &&  <button aria-expanded={isExpanded}
          className="mt-8 text-xl underline hover:opacity-80 lg:hidden"
          onClick={toggleContent}>read more</button> }


           {/* Content to toggle (Hidden on mobile by default, always visible on desktop) */}
        <p
          className={`mt-4 text-lg md:mt-10  ${isExpanded ? "block" : "hidden"} md:hidden`}
        >
          Design a visually cohesive journey that showcases your unique identity and skills. With ProfileNxT, you can craft an application that reflects who you are professionally, making a lasting impression on potential employers. Begin building your personal brand today and take the next step toward your dream career!
        </p>

        {/* On Desktop (Always visible) */}
        <p className="mt-4 text-lg md:mt-10 md:block hidden md:block">
          Design a visually cohesive journey that showcases your unique identity and skills. With ProfileNxT, you can craft an application that reflects who you are professionally, making a lasting impression on potential employers. Begin building your personal brand today and take the next step toward your dream career!
        </p>
        
        </div>
</section>

{/* motive boxes */}
<section className=" mx-8 text-white md:mx-20 5xl:mt-40 6xl:mt-48 xssm:grid-cols-[280px_auto] text-specialLightGray mt-16 grid  grid-cols-1 gap-x-[13px] gap-y-[10px] text-2xl md:grid-cols-[340px_auto] lg:mt-36 lg:grid-cols-[auto_auto] lg:grid-rows-3 2xl:mt-28 2xl:gap-4 2xl:gap-x-[16px] 2xl:gap-y-[13px] 2xl:text-4xl">
  <div
    className="lazybg 5xl:w-[490px] 5xl:bg-[length:148%] xssm:h-[420px] h-[480px] w-full rounded-3xl bg-[length:152%] bg-center bg-no-repeat md:h-[480px] lg:row-span-3 lg:h-[580px] lg:w-[350px] lg:bg-[length:168%] 2xl:h-[725px] 2xl:w-[402px] 2xl:bg-[length:180%]"
    data-lazybg="https://assets.flowcvassets.com/landing/woman-smiling-1024.webp"
    role="img"
    aria-label="Smiling woman representing FlowCV user success stories"
    style={{
      backgroundImage: "url('https://assets.flowcvassets.com/landing/woman-smiling-1024.webp')",
    }}
  ></div>

  <div className="grid grid-cols-1 gap-2 lg:grid-cols-[38fr_21fr] 2xl:gap-[10px]">
    <div className="bg-blue-400 xssm:p-8 rounded-3xl p-9 lg:p-9 lg:py-[21px] xl:pl-11 2xl:py-[26px]">
      <span className="inline-block 2xl:w-[420px]">Transform your career with endless possibilities</span>
    </div>
    <div className="xssm:p-8 rounded-3xl bg-[#62449B] p-9 lg:p-9 lg:py-[21px] xl:pl-11 2xl:py-[26px]">
      Simplify your application process effortlessly
    </div>
  </div>

  <div className="bg-[#A3D9A5] xssm:p-8 w-full rounded-3xl p-9 lg:p-9 lg:py-[21px] xl:pl-11 2xl:py-[26px]">
    <span className="inline-block 2xl:w-[620px]">Stand out with an impressive profile that speaks for itself</span>
  </div>

  <div className="grid grid-cols-1 gap-2 lg:grid-cols-[21fr_38fr] 2xl:gap-[10px]">
    <div className="xssm:p-8 rounded-3xl bg-[#7F85A8] p-9 lg:p-9 lg:py-[21px] xl:pl-11 2xl:py-[26px]">
      Boost your confidence through personal branding
    </div>
    <div className="xssm:p-8 rounded-3xl bg-[#917CBA] p-9 lg:p-9 lg:py-[21px] xl:pl-11 2xl:py-[26px]">
      Focus on your goals while we streamline the process
    </div>
  </div>
</section>

    {/* template redirect */}

    <section className=" mt-24 lg:mt-18 2xl:mt-38 grid w-full grid-cols-1 overflow-hidden lg:grid-cols-[4fr_5fr] lg:pl-14 2xl:grid-cols-[520px_1fr] 2xl:pl-[98px]"><div className="2xl:-mr-25 xssm:-mr-0 xssm:justify-center -mr-3 flex w-full items-end  justify-end md:-mr-6 lg:order-2 lg:justify-end"><Image alt="Customizable templates by ProfileNxT" data-src="https://assets.flowcvassets.com/landing/templates-600.webp" data-srcset="
          https://assets.flowcvassets.com/landing/templates-600.webp 600w,
          https://assets.flowcvassets.com/landing/templates-1100.webp 1100w,
          https://assets.flowcvassets.com/landing/templates-1600.webp 1600w,
          https://assets.flowcvassets.com/landing/templates-2000.webp 2000w" data-sizes="(min-width: 1800px) 65vw,
         (min-width: 1024px)  80vw,
         100vw" className="2xl:ml-25 xssm:max-w-[600px] lgxl:w-[900px] xssm:-mr-8 -mr-36 w-[160%] max-w-none sm:w-[560px] md:mr-0 lg:ml-12 lg:min-h-[600px] lg:w-[800px] lg:max-w-none xl:ml-20 xl:w-[1100px] 2xl:min-h-[700px] 2xl:w-[1100px]" width="2000" height="1924" src="https://assets.flowcvassets.com/landing/templates-600.webp" srcset="
          https://assets.flowcvassets.com/landing/templates-600.webp 600w, 
          https://assets.flowcvassets.com/landing/templates-1100.webp 1100w,
          https://assets.flowcvassets.com/landing/templates-1600.webp 1600w,
          https://assets.flowcvassets.com/landing/templates-2000.webp 2000w" sizes="(min-width: 1800px) 65vw,
         (min-width: 1024px)  80vw,
         100vw"/></div>
         <div className="lg:pt-34 flex flex-col justify-center md:m-0 mx-8">
          <h2 className="text-[48px] leading-none lg:w-[410px] xl:text-[54px] 2xl:text-[60px]">Customizable Templates</h2>
          <p className="mt-6 text-xl ">
          Unlock your potential with ProfileNxT&apos;s expertly crafted templates. Whether you&apos;re creating a standout resume, compelling cover letter, personal portfolio, or more, our fully customizable designs empower you to leave a lasting impression </p>
            
             <button 
  className="border-none cursor-pointer flex items-center justify-center focus:outline-none mt-6 text-white bg-black h-[72px] w-auto rounded-xl px-4 py-2 text-2xl font-bold lg:mt-8"
  onClick={handleClick }

>
  <span className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 49 49" className="mr-3 h-10 w-10">
      <path 
        fill="currentColor" 
        stroke="currentColor" 
        strokeLinejoin="round" 
        strokeWidth="0.8" 
        d="M36.561 12.178a.4.4 0 00-.4-.4h-24a.4.4 0 00-.4.4v4c0 .22.18.4.4.4h16.206L11.05 33.895a.4.4 0 000 .565l2.828 2.829a.4.4 0 00.566 0L31.76 19.97v16.207c0 .22.18.4.4.4h4a.4.4 0 00.4-.4v-24z" 
      />
    </svg>
    See all templates
  </span>
  
</button>

</div>  </section>




   {/* unlock your resume potential */}

    


          {/* Teemplates */}

          <section id="templates" className="py-20 md:mx-20 mx-8 "> 

          <div className="flex flex-col items-center lg:flex-row lg:items-end lg:space-x-4">
  <p className="text-3xl lg:text-5xl text-center lg:text-right font-bold">
    <span>Choose Your</span>
  </p>
  <p className="mt-3 text-6xl lg:text-9xl font-extrabold leading-none lg:mt-0">
    Professional<span className="lg:hidden"> Templates</span>
  </p>
</div>
<div className="flex flex-col items-center lg:flex-row lg:space-x-8">
  <p className="hidden lg:block text-6xl lg:text-9xl font-extrabold leading-none">
    Templates
  </p>
  <p className="w-4/5 mt-6 text-center lg:text-left text-lg lg:w-1/2 md:mb-0 mb-8 ">
    Find the perfect design to showcase your professional profile with our curated selection of resume and portfolio templates.
  </p>
</div>
              <ResumeCarousel/>

              <section className="mx-6 md:mx-20 lg:mt-25 3xl:grid-cols-[475px_800px] 3xl:gap-16 mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[375px_auto] lg:items-center 2xl:grid-cols-[475px_700px] 2xl:gap-12">
  <h2 className="text-[72px] leading-none 2xl:text-[96px]">Achieve Career Success</h2>
  <div className="-mb-3 pt-1 text-xl">
    <p className='md:block hidden'>
      ProfileNxT goes beyond traditional resume tools – it’s a dynamic platform that helps you craft a personalized career profile. With an emphasis on showcasing your achievements, skills, and potential, we empower you to present a compelling story that captures the attention of employers. The process is seamless, efficient, and enjoyable.
    </p>

    {/* Mobile only */}
    <p className="mt-4 text-lg md:mt-10 md:hidden">
      Build an application that reflects your unique identity, and make a lasting impression on employers. Start shaping your personal brand today with ProfileNxT and take your career to new heights.
    </p>

    {/* Desktop only (always visible on larger screens) */}
    <p className="mt-4 text-lg md:mt-10 hidden md:block">
      Build an application that reflects your unique identity, and make a lasting impression on employers. Start shaping your personal brand today with ProfileNxT and take your career to new heights.
    </p>
  </div>
</section>
</section>

       {/* Getting started   */}

       <section
  className="py-20 bg-cover bg-center text-white mx-8 rounded-lg h-[60vh]"
  style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1666700698946-fbf7baa0134a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlnaHQlMjByYWluJTIwYW5pbWUlMjBzdHJlZXR8ZW58MHx8MHx8fDA%3D")' }} // Add your image URL here
>
  <div className="container mx-auto px-4 text-left flex flex-col justify-center items-start">
    <AnimatedSection>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
        Ready to Build Your Perfect Resume?
      </h2>
      <p className="text-xl mb-8 max-w-lg">
        Join thousands of job seekers who have successfully landed their dream jobs.
      </p>
      <button onClick={handleClick } className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition duration-300 md:text-lg font-semibold mt-4 md:mt-0">
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
            <div key={index} className={`mt-${index*6}`}>
            <TestimonialCard 
              key={index} 
              name={testimonial.name} 
              feedback={testimonial.feedback} 
              designation={testimonial.designation}
              index={index} 
            />
            </div>
          ))}
        </div>
      </div>
    </section>
   


    <section className="md:mx-0 mx-8 mt-25 2xl:gap-18 xl:gap-26 xl:grid xl:grid-cols-[auto_auto] bg-gray-100">
  <div className="w-full max-w-[521px] lg:pl-12 xl:pl-10 2xl:pl-0">
    <h2 className=" leading-none lg:text-[72px] xl:min-w-[520px]">
      Turn your job hunt into a career success story
    </h2>
    <h3 className="mt-10 text-3xl lg:mt-12 lg:text-4xl ">
      <span>Where you&apos;re not only noticed, but </span>
      <span className="text-pink-600 whitespace-pre-line"> unforgettable</span>
    </h3>
  </div>
  <div className="md:pr-18 lg:max-w-[770px] lg:pl-12 lg:pr-0 xl:pl-0 xl:pr-8 2xl:pr-0">
    <div className="mt-10 text-2xl lg:mt-14 xl:mt-4">
      <p className="w-full font-bold">Revolutionize Your Career Trajectory</p>
      <p>
        Don&apos;t settle for mediocrity when you can achieve greatness with ProfileNxT. Don&apos;t just apply for a job. Take control of your career. Tired of anonymous applications and forgettable resumes? Unlock your potential with ProfileNxT, your key to mastering the job market. We&apos;re not just a resume builder; we&apos;re your career accelerator.
      </p>
    </div>

    { !isExpanded1 &&  
 <button 
    className=" mt-8 text-2xl underline hover:opacity-80 md:hidden block"
     onClick={()=> {setIsExpanded1((prev)=>!prev)}}
    > 
      read more
    </button>  }

    <div className={` ${isExpanded1 ? `block`:`hidden`} mt-10 text-2xl lg:mt-14 lg:block`}>
      <p className="font-bold">Get Ahead with Real-Time Industry Data</p>
      <p>
        Our focus on innovation means you&apos;re always ahead of the curve. Receive real-time insights into industry trends and employer expectations, empowering you to take charge of your job search.
      </p>
    </div>
 
    
    <div className={` mt-10 ${isExpanded1 ? `block`:`hidden`} text-2xl lg:mt-14 lg:block`}>
      <p className="font-bold">Stand Out as More Than Just an Applicant</p>
      <p>
        Join the ranks of achievers who&apos;ve used ProfileNxT to become unforgettable to employers. This isn&apos;t about job hunting; it&apos;s about building a lasting personal brand that opens doors and captures attention.
      </p>
    </div>
    <div className={` mt-10 hidden text-2xl ${isExpanded1 ? `block`:`hidden`} lg:mt-14 lg:block`}>
      <p className="font-bold">Make the Complex Simple and Amplify Your Impact</p>
      <p>
        We understand—creating impressive job materials can feel overwhelming. That&apos;s why we&apos;ve crafted an intuitive, user-friendly experience. With ProfileNxT, focus on what really matters: presenting your achievements in a way that stands out and can&apos;t be ignored.
      </p>
    </div>
  </div>
</section>



   {/* faq */}

      <FAQSection/>



      <section  className="bg-gray-100 landingSection mt-25 lg:pt-45 lg:pb-34 5xl:pt-40 5xl:pb-36 bg-specialSand pb-22 flex w-full flex-col items-center lg:max-w-none">
  <h2 className="mt-10 w-[300px] text-center text-[72px] leading-none sm:w-[500px] lg:w-auto lg:text-[96px] lg:tracking-[-3px]">Start building your future</h2>
  <p className="mt-8 text-center text-2xl text-gray-500 lg:mt-11 lg:w-[890px] lg:text-3xl">Unveil your full potential with our user-friendly, non-scammy resume maker and career tools. Start for free and enhance with premium options.</p>
  <a onClick={handleClick } className=" bg-black mb-4 border-none cursor-pointer appearance-none touch-manipulation flex items-center justify-center focus-visible:outline-blue-600 bg-primaryBlack text-white h-16 mt-8 w-auto rounded-xl pl-4 pr-7 text-xl font-bold lg:mt-11" >
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 49 49" className="mr-[9px] h-12 w-12">
        <path fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="0.8" d="M36.561 12.178a.4.4 0 00-.4-.4h-24a.4.4 0 00-.4.4v4c0 .22.18.4.4.4h16.206L11.05 33.895a.4.4 0 000 .565l2.828 2.829a.4.4 0 00.566 0L31.76 19.97v16.207c0 .22.18.4.4.4h4a.4.4 0 00.4-.4v-24z"></path>
      </svg>
    </span>
    Get started now 🚀
  </a>
</section>





   {/* footer */}
      <Footer/>


    </div>
  );
};

export default LandingPage;

