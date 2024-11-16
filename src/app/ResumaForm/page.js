"use client"

import React, { useEffect , useContext, useState , Suspense } from "react";
import { Menu , X } from 'lucide-react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PersonalInfoComponent from "../components/Personal-Info/personalInfo";
import EducationComponent from "../components/Education/education";
import WorkExperienceComponent from "../components/Work-experience/workExperience";
import SkillsComponent from "../components/Skills/skills";
import ProjectsComponent from "../components/Projects/projects";
import PublicationsComponent from "../components/Publication/publication";
import VolunteeringComponent from "../components/Volunteering/volunteer";
import ReferencesComponent from "../components/Reference/reference";
import LanguagesComponent from "../components/Languages/languages";
import InterestsComponent from "../components/Interest/interest";
import CertificationsComponent from "../components/Certifications/certification";
import AwardsComponent from "../components/Awards/awards";
import ResumeTemplate from "../ResumeTemplates/page";
import SettingsPage from "../customizeResume/page";
import { postData } from "../function/postData";
import { set , get } from "idb-keyval"
import { useSearchParams } from "next/navigation";
import MyContext from "../components/Context/MyContext";

// Zod Schema for form validation

const schema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    headline: z.string().min(1, "Headline is required"),
    email: z.string().email("Invalid Email"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    website: z.string().refine((value) => value === "" || z.string().url().safeParse(value).success, {
      message: "Invalid url format", 
    }),
    address: z.optional(z.string().min(1, "Address is required")),
    linkedIn: z.string().refine((value) => value === "" || z.string().url().safeParse(value).success, {
      message: "Invalid url format", 
    }),
    github: z.string().refine((value) => value === "" || z.string().url().safeParse(value).success, {
      message: "Invalid url format", 
    }),
    summary: z.string().optional()
  }),
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      degree: z.string().min(1, "Degree is required"),
      startYear: z.string().min(1, "Start year is required"),
      endYear: z.string().min(1, "End year is required"),
      score:z.string().min(1, "End year is required"),
      summary: z.string().optional()
      }),
  ),
  workExperience: z.array(
    z.object({
      company: z.string().min(1, "Company is required"),
      role: z.string().min(1, "Role is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().min(1, "End date is required"),
      website:z.string().refine((value) => value === "" || z.string().url().safeParse(value).success, {
        message: "Invalid url format", 
      }),
      summary: z.string().optional()
    })
  ),
  skills: z.array(
    z.object({
      name: z.string().min(1, "Skill is required"),
      level: z.string(),
    })
  ),
  projects: z.array(
    z.object({
      title: z.string().min(1, "Project title is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().min(1, "End date is required"),
      website: z.string().refine((value) => value === "" || z.string().url().safeParse(value).success, {
        message: "Invalid url format", 
      }),
      summary: z.string().optional()
    })
  ),

  publications: z.array(
    z.object({
      title: z.string().min(1, "Publication title is required"),
      publisher: z.string().min(1, "Publisher is required"),
      date: z.string().min(1, "Date is required"),
      website: z.string().refine((value) => value === "" || z.string().url().safeParse(value).success, {
        message: "Invalid url format", 
      }),
      summary: z.string().optional()
    })
  ).optional(),
  volunteering: z.array(
    z.object({
      title: z.string().min(1, "Volunteering title is required"),
      organization: z.string().min(1, "Organization is required"),
      role: z.string().min(1, "Role is required"),
      date: z.string().min(1, "Date is required"),
      website: z.string().refine((value) => value === "" || z.string().url().safeParse(value).success, {
        message: "Invalid url format", 
      }),
      summary: z.string().optional()
    })
  ).optional(),
  references: z.array(
    z.object({
      name: z.string().min(1, "Reference name is required"),
      email: z.string().email("Invalid email").optional(),
      position: z.string().min(4,"Position is required"),
      summary: z.string().optional()
    })
  ).optional(),
  languages: z.array(
    z.object({
      name: z.string().min(1, "Language is required"),
      level: z.string().min(1, "Proficiency level is required"),
    })
  ),
  interests: z.array(
    z.object({
      title: z.string().min(1, "Interest is required"),
    })
  ),
  certifications: z.array(
    z.object({
      certification: z.string().min(1, "Certification is required"),
      issuer: z.string().min(1, "Issuer is required"),
      issueDate: z.string().min(1, "Issue date is required"),
    })
  ),
  awards: z.array(
    z.object({
      award: z.string().min(1, "Award is required"),
      organization: z.string().min(1, "Organization is required"),
      year: z.string().min(1, "Year is required"),
      summary: z.string().optional()
    })
 ),
 });

const ResumeBuilder = () => {

  const{ setIsOpen , userData1 , setTemplateName } = useContext(MyContext);
  const searchParams = useSearchParams();
   const template = searchParams.get('template');
     const id = searchParams.get("id");  
   //const template = "Template1"

  const initialFormData = {
    personalInfo: {
      fullName: "",
      headline:"",
      email:"",
      phoneNumber: "",
      website:"",
      address: "",
      linkedIn: "",
      github: "",
      summary: "",
    },
    education: [{ institution: "", degree: "", startYear: "", endYear: "",score:"", summary: "" }],
    workExperience: [{ company: "", role: "", startDate: "", endDate: "", website: "", summary: "" }],
    skills: [{ name: "", level: "" }],
    projects: [{ title: "", startDate:"", endDate:"", website:"",summary: "" }],
    publications: [{ title: "", publisher: "", date:"",website:"",summary:"" }],
    volunteering: [{ title:"",organization: "", role: "", date:"", website:"", summary: "" }],
    references: [{ name: "", email: "", position: "",summary:"" }],
    languages: [{ name: "", level: "" }],
    interests: [{ title: "" }],
    certifications: [{ certification: "", issuer: "", issueDate: "" }],
    awards: [{  award: "", organization: "", year: "", summary:"" }],
  }

   const [formData1, setFormData1] = useState(initialFormData);
  

  const { register, handleSubmit, control, getValues, watch,setValue, formState: { errors } ,reset} = useForm({
    resolver: zodResolver(schema),
    defaultValues:formData1
  });


  const { fields: fieldsEducation, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: fieldsWorkExperience, append: appendWorkExperience, remove: removeWorkExperience } = useFieldArray({
    control,
    name: "workExperience",
  });

  const { fields: fieldsSkills, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const { fields: fieldsProjects, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects",
  });

  const { fields: fieldsPublications, append: appendPublication, remove: removePublication } = useFieldArray({
    control,
    name: "publications",
  });

  const { fields: fieldsVolunteering, append: appendVolunteering, remove: removeVolunteering } = useFieldArray({
    control,
    name: "volunteering",
  });

  const { fields: fieldsReferences, append: appendReference, remove: removeReference } = useFieldArray({
    control,
    name: "references",
  });

  const { fields: fieldsLanguages, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: "languages",
  });

  const { fields: fieldsInterests, append: appendInterest, remove: removeInterest } = useFieldArray({
    control,
    name: "interests",
  });

  const { fields: fieldsCertifications, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: "certifications",
  });

  const { fields: fieldsAwards, append: appendAward, remove: removeAward } = useFieldArray({
    control,
    name: "awards",
  });

  const [Open,setOpen] = useState(false)
  const [save,setSave] = useState(null)

  useEffect(()=>{

    const getUserData = async() =>{
   if(template && id){
 
    setTemplateName(template)
      const Data = await get(id);
      console.log(Data,"aaaaaaa")
      reset(Data)   
      setSave({IdData:id , dataType:"oldData"})

   }else if(userData1){

    console.log("userData12:-",userData1)
    setFormData1(userData1) 
   }

  }
   getUserData();

  },[id,template,reset , userData1 , setFormData1])
  

  useEffect(()=>{ console.log(formData1,"server");reset(userData1) },[reset,formData1,userData1])
  
  const onSubmit = async(data) => {
    
    const url="../api/insertData"
    let response;
    let IdData;
    let updateData = false;

  if(id){
 
      response = await postData({data,updateData:id},url);
      data.key = id;
      IdData = id;
      updateData = true;

    }
 else {
   
    const uniqueId=  `${template}@`+Math.random().toString(36).slice(2,12);
    data.key = uniqueId;
    console.log("dataInside:-",data)
    response= await postData(data,url)
    IdData = uniqueId;

  }
   if(response.state == "success"){
    
    set(IdData,data).then(()=>{
      console.log("Data saved ")
    })
    setSave({IdData , updateData})
  }
};

useEffect(()=>{
removeEducation(0);
removeAward(0);
removeCertification(0);
removeInterest(0);
removeLanguage(0);
removeProject(0);
removeReference(0);
removeSkill(0);
removeVolunteering(0);
removeWorkExperience(0);
removePublication(0);
},[removeAward,removeCertification,removeEducation,
  removeInterest,removeLanguage,removeProject,removePublication,
  removeReference,removeVolunteering,removeSkill,removeWorkExperience])

  console.log(watch(),"watch")

  return (
    
    <div className=" flex md:flex-row-reverse flex-col h-screen w-screen " >
      <div className="fixed h-[110vh]  z-10 top-2 left-2 "><SettingsPage/></div>
    <div className="h-full w-full md:w-[50%]  overflow-y-auto md:fixed " onClick={()=>{setIsOpen(false) , setOpen(false) }}> <ResumeTemplate getValues={watch()} template={template} save={save}/> </div>
  
    

    <button 
        onClick={() => setOpen(!Open)} 
        className="fixed top-4 right-4 z-50 md:hidden"
        aria-label="Toggle menu"
      >
        {Open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main content container */}
      <div 
        className={`
         md:static md:transform-none md:h-auto md:shadow-none  md:overflow-x-hidden
          fixed top-0 right-0 h-full
          md:left-0
          md:mr-[50%]
          md:w-[50%]
          w-[80%]
          bg-white
          transform transition-transform duration-300 ease-in-out
          ${Open ? 'translate-x-0' : 'translate-x-full'}
          shadow-lg
          overflow-y-auto
          md:z-0
          z-40`
      }
      >

    <div className={`  max-w-4xl mx-auto p-6  rounded-lg shadow-md  w-full md:mr-[50%] overflow-hidden`} onClick={()=>{setIsOpen(false)}} >

      <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Personal Info */}
        <PersonalInfoComponent register={register} getValues={getValues} setValue={setValue} errors={errors} />

        {/* Education Section */}
        <div>
          <h2 className="text-xl font-semibold">Education</h2>
          {fieldsEducation.map((field, index) => (

            <EducationComponent
              key={field.id}
              index={index}
              register={register}
              getValues={getValues}
              setValue={setValue}
              errors={errors}
              removeEducation={removeEducation}
            />
           ))}
          <button
            type="button"
            onClick={() => appendEducation({ institution: "", degree: "", startYear: "", endYear: "", summary: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Education
          </button>
        </div>

        {/* Work Experience Section */}
        <div>
          <h2 className="text-xl font-semibold">Work Experience</h2>
          {fieldsWorkExperience.map((field, index) => (
            <WorkExperienceComponent
              key={field.id}
              index={index}
              register={register}
              getValues={getValues}
              setValue={setValue}
              errors={errors}
              removeWorkExperience={removeWorkExperience}
            />
          ))}
          <button
            type="button"
            onClick={() => appendWorkExperience({ company: "", role: "", startDate: "", endDate: "", website: "", summary: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Experience
          </button>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-xl font-semibold">Skills</h2>
          {fieldsSkills.map((field, index) => (
            <SkillsComponent
              key={field.id}
              index={index}
              register={register}
              errors={errors}
              removeSkill={removeSkill}
            />
          ))}
          <button
            type="button"
            onClick={() => appendSkill({ name: "", level: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Skill
          </button>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-xl font-semibold">Projects</h2>
          {fieldsProjects.map((field, index) => (
            <ProjectsComponent
              key={field.id}
              index={index}
              register={register}
              getValues={getValues}
              setValue={setValue}
              errors={errors}
              removeProject={removeProject}
            />
          ))}
          <button
            type="button"
            onClick={() => appendProject({ title: "", description: "", link: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Project
          </button>
        </div>

        {/* Publications Section */}
        <div>
          <h2 className="text-xl font-semibold">Publications</h2>
          {fieldsPublications.map((field, index) => (
            <PublicationsComponent
              key={field.id}
              index={index}
              register={register}
              getValues={getValues}
              setValue={setValue}
              errors={errors}
              removePublication={removePublication}
            />
          ))}
          <button
            type="button"
            onClick={() => appendPublication({ title: "", publisher: "", link: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Publication
          </button>
        </div>

        {/* Volunteering Section */}
        <div>
          <h2 className="text-xl font-semibold">Volunteering</h2>
          {fieldsVolunteering.map((field, index) => (
            <VolunteeringComponent
              key={field.id}
              index={index}
              register={register}
              getValues={getValues}
              setValue={setValue}
              errors={errors}
              removeVolunteering={removeVolunteering}
            />
          ))}
          <button
            type="button"
            onClick={() => appendVolunteering({ organization: "", role: "", description: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Volunteering
          </button>
        </div>

        {/* References Section */}
        <div>
          <h2 className="text-xl font-semibold">References</h2>
          {fieldsReferences.map((field, index) => (
            <ReferencesComponent
              key={field.id}
              index={index}
              register={register}
              getValues={getValues}
              errors={errors}
              setValue={setValue}
              removeReference={removeReference}
            />
          ))}
          <button
            type="button"
            onClick={() => appendReference({ name: "", email: "", phone: "", position: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Reference
          </button>
        </div>

        {/* Languages Section */}
        <div>
          <h2 className="text-xl font-semibold">Languages</h2>
          {fieldsLanguages.map((field, index) => (
            <LanguagesComponent
              key={field.id}
              index={index}
              register={register}
              getValues={getValues}
              setValue={setValue}
              errors={errors}
              removeLanguage={removeLanguage}
            />
          ))}
          <button
            type="button"
            onClick={() => appendLanguage({ language: "", proficiency: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Language
          </button>
        </div>

        {/* Interests Section */}
        <div>
          <h2 className="text-xl font-semibold">Interests</h2>
          {fieldsInterests.map((field, index) => (
            <InterestsComponent
              key={field.id}
              index={index}
              getValues={getValues}
              setValue={setValue}
              register={register}
              errors={errors}
              removeInterest={removeInterest}
            />
          ))}
          <button
            type="button"
            onClick={() => appendInterest({ interest: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Interest
          </button>
        </div>

        {/* Certifications Section */}
        <div>
          <h2 className="text-xl font-semibold">Certifications</h2>
          {fieldsCertifications.map((field, index) => (
            <CertificationsComponent
              key={field.id}
              index={index}
              getValues={getValues}
              setValue={setValue}
              register={register}
              errors={errors}
              removeCertification={removeCertification}
            />
          ))}
          <button
            type="button"
            onClick={() => appendCertification({ certification: "", issuer: "", issueDate: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Certification
          </button>
        </div>

        {/* Awards Section */}
        <div>
          <h2 className="text-xl font-semibold">Awards</h2>
          {fieldsAwards.map((field, index) => (
            <AwardsComponent
              key={field.id}
              index={index}
              getValues={getValues}
              setValue={setValue}
              register={register}
              errors={errors}
              removeAward={removeAward}
            />
          ))}
          <button
            type="button"
            onClick={() => appendAward({ award: "", organization: "", year: "" })}
            className="bg-blue-500 text-white py-2  rounded-md mt-4  ml-2 w-full"
          >
            + Add Award
          </button>
        </div>

        {/* Submit Button */}
       <button
          type="submit"
          className="bg-green-500 text-white py-2 px-6 rounded-md mt-8"
        >
          Submit
        </button>
      </form>
    </div>
    </div>

      {/* Semi-transparent overlay - only shows when menu is open */}
      {Open && (
        <div 
          className="fixed inset-0 bg-transparent z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
    
  );
};

const ResumeFormSuspense = () => {
  return (
    <Suspense fallback={<div>You are being redirected...</div>}>
      <ResumeBuilder />
    </Suspense>
  );
};

export default ResumeFormSuspense;