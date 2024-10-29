"use client";

import React from "react";
import dynamic from "next/dynamic";
const Template1 = dynamic(() => import("../Templates/Template1/template1"), { ssr: false });
const Template2 = dynamic(() => import("../Templates/Template2/template2"), { ssr: false });

const ResumeTemplate = ({ getValues, template: Component , save }) => {
  console.log(Component, "fghj");

  if (!Component) {
    return <div>No template provided</div>;
  }


  return (
    <div className="h-full">
      {Component == "Template1"  && <Template1 getValues={getValues}  save={save} />}
      {Component == "Template2" && <Template2 getValues={getValues} save={save} />}
      

    </div>
  );
};

export default ResumeTemplate;
