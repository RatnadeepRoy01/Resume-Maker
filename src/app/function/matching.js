

const keyResume = {
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
  "headline" : "headline",
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



const keyLinkedin=
{
  "accomplishment_honors_awards":"awards",
  "certifications":"certifications",
  "education":"education",
  "accomplishment_projects":"projects",
  "recommendations":"references",
  "volunteer_work":"volunteering",
  "experiences":"workExperience",
  "title": "award",
  "issuer": "organization",
  "issued_on": "year",
  "name": "certification",
  "starts_at": "issueDate",
  "authority": "issuer",
  "degree_name": "degree",
  "ends_at": "endYear",
  "school": "institution",
  "starts_at": "startYear",
  "description": "summary",
  "interests": "interests",
  "languages": "languages",
  "city, state, country": "address",
  "personal_emails": "email",
  "full_name": "fullName",
  "headline": "headline",
  "personal_numbers": "phoneNumber",
  "summary": "summary",
  "url": "link",
  //publication
  "title": "title",
  "publisher": "title",
  "accomplishment_publication": "publisher",
  "link":"link",
  //skills
  "skills": "skills",
  "company": "organization",
  "title": "role",
  "company": "company",
  "ends_at": "endDate",
  "starts_at": "startDate",
  "company_linkedin_profile_url": "website"
}

const mapKeys = (data, keyMap) => {
  if (data == null) return data;

  if (Array.isArray(data)) {
    return data.map(item => mapKeys(item, keyMap));
  }

  if (typeof data === 'object') {
    const transformed = Object.entries(data).reduce((acc, [key, value]) => {
      const newKey = keyMap[key];

      // Only add the key if it exists in the keyMap
      if (newKey) {
        const transformedValue = mapKeys(value, keyMap);
        // If the transformed value is not null or undefined, include it
        if (transformedValue !== undefined && transformedValue !== null) {
          acc[newKey] = transformedValue;
        }
      }
      return acc;
    }, {});

    // Return the transformed object if any key exists, otherwise null (to remove it)
    return Object.keys(transformed).length > 0 ? transformed : null;
  }

  return data; // For primitive values, just return as-is
};


function formatDates(data) {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map(item => formatDates(item));
  }

  const newObj = {};
  
  for (const key in data) {
    const value = data[key];
    
    if (value && typeof value === 'object') {
      if ('day' in value && 'month' in value && 'year' in value) {
        const { day, month, year } = value;
        if (day && month && year) {
          newObj[key] = `${day}/${month}/${year}`;
        } else {
          newObj[key] = null;
        }
      } else {
        newObj[key] = formatDates(value);
      }
    } else {
      newObj[key] = value;
    }
  }
  
  return newObj;
}




export async function  getUserData (userData , type) {

  console.log(userData,"dataaaaaaaa")
  let updatedSkills = [];
  let keyMap = keyResume;

 if(type == "linkedin") 
{ userData = await formatDates(userData) ; keyMap = keyLinkedin; }
 const data = await mapKeys(userData,keyMap)

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
console.log(updatedData,"updateData")
return updatedData;

}
