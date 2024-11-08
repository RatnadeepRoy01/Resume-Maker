

const keyMap = {
  // Personal info mappings
  "personalInfo": "personalInformation",
  "name": "fullName",
  "address": "address",
  "city": "city",
  "country_code": "country",
  "email": "email",
  "phone_number": "phoneNumber",
  "date_of_birth": "dateOfBirth",
  "location": "location",
  "current_company": "currentCompany",
  "current_designation": "currentDesignation",
  "profile_summary": "summary",
  "photo": "photo",

  // Education mappings
  "education": "education",
  "degree": "degree",
  "field_of_study": "fieldOfStudy",
  "institute": "institution",
  "start_date": "startYear",
  "end_date": "endYear",
  "pass_out_year": "passOutYear",

  // Experience mappings
  "experience": "workExperience",
  "company": "company",
  "job_title": "role",
  "start_date": "startDate",
  "end_date": "endDate",
  "job_description": "summary",
  "skills": "skills",

  // Certifications mappings
  "certification": "certifications",
  "certification_name":"certification",
  "date":"issueDate",
  "issuing_organization":"issuer",

  //language mappings
  "languages_known": "languages",
  "language":"name",
  "proficiency":"level",
  
  // Skills mappings
  "soft_skills": "softSkills",
  "technical_skills": "technicalSkills",

  // Total Experience mappings
  "total_experience": "totalExperience"
}



 const mapKeys = (data) => {
  if (data == null) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => mapKeys(item, keyMap));
  }
  
  if (typeof data === 'object') {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const newKey = keyMap[key] || key;
      acc[newKey] = mapKeys(value, keyMap);
      return acc;
      
    }, {});
  }
  
  
return data;
  
}


export function refineLanguageData (refinedata){

let refineLanguage



}





export async function  getUserData (userData) {
  let updatedSkills = [];

 const data = await mapKeys(userData)

 function traverse(obj) {

  const {skills,...data} = obj ;
  if(!skills) return data;
   for(const key in skills){
        skills[key].forEach(element => {

          let data = element
          let type = ""
          if(typeof element == "object")
        {  const {name , level} = element;  data = name ; type = level }

          updatedSkills.push({name:data , level:type})
        }); 
   }
   data.skills = updatedSkills;
   return data
}

const updatedData = await traverse(data);
return updatedData;

}
