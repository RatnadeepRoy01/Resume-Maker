"use client";
import React, { useState, useEffect, useRef } from "react";
import "../../Css/animateTemplate.css"; // Include your styles here
import Image from "next/image";

const resumes = [
  { id: 1, title: "Resume 1", url: "/Template31.webp" },
  { id: 2, title: "Resume 2", url: "/Template2.webp" },
  { id: 3, title: "Resume 3", url: "/Template1.webp" },
  { id: 4, title: "Resume 5", url: "/Template41.webp" },
  { id: 5, title: "Resume 4", url: "/Template5.webp" },
];
 
const ResumeCarousel = () => {
  const [spread, setSpread] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !spread) {
            setSpread(true); // Trigger animation once when carousel is in view
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the carousel is in view
      }
    );
    
    const current = carouselRef.current

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [spread]); // Depend on `spread` to ensure it's only triggered once

  return (
    <div className="carousel-container md:h-[90vh] md:py-[300px] h-[60vh] overflow-y-hidden ">
      <div ref={carouselRef} className={`carousel ${spread ? "spread" : ""}`}>
        {resumes.map((resume, index) => (
          <div
            key={resume.id}
            className={`resume-card ${
              index === 2
                ? "front md:w-[28vw] md:h-[38vw] w-[50vw] h-[70vw]" 
                : index === 1
                ? "left md:w-[24vw]  md:h-[34vw] w-[40vw] h-[58vw] md:mr-0 mr-[20vw]"
                : index === 3
                ? "right  md:w-[24vw] md:h-[34vw] w-[40vw] h-[58vw] md:ml-0 ml-[20vw]"
                : index === 0
                ? "behind-left w-[20vw] h-[30vw] mr-[21vw]"
                : "behind-right w-[20vw] h-[30vw] ml-[21vw] "
            }`}
          >
            <Image fill src={resume.url} alt={resume.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeCarousel;

