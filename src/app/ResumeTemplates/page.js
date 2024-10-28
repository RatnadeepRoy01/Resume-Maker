"use client";
import React from "react";
import Template1 from "../Templates/Template1/page";
import Template2 from "../Templates/Template2/page";

const ResumeTemplate = ({ getValues, template: Component , save }) => {
  console.log(Component, "fghj");

  if (!Component) {
    return <div>No template provided</div>;
  }


  return (
    <div className="h-full">
      {Component == "Template1" && <Template1 getValues={getValues} save={save} />}
      {Component == "Template2" && <Template2 getValues={getValues} save={save} />}
    </div>
  );
};

export default ResumeTemplate;
