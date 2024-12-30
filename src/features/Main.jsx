import React, { useEffect, useState } from "react";
import PersonalInformation from "./components/PersonalInformation";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Skills from "./components/Skills";

import CvMain from "./ui/CvMain";
import Header from "./ui/Header";

import useHandlePrint from "./hook/useHandlePrint";

export default function Main() {
  // Helper function to get data from localStorage
  const getLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const { componentRef, handlePrint } = useHandlePrint();

  // State initialization using localStorage
  const [fullName, setFullName] = useState(() =>
    getLocalStorage("fullName", "")
  );
  const [email, setEmail] = useState(() => getLocalStorage("email", ""));
  const [phone, setPhone] = useState(() => getLocalStorage("phone", ""));
  const [aboutMe, setAboutMe] = useState(() => getLocalStorage("aboutMe", ""));
  const [education, setEducation] = useState(() =>
    getLocalStorage("education", [])
  );
  const [skills, setSkills] = useState(() => getLocalStorage("skills", []));
  const [workExperiences, setWorkExperiences] = useState(() =>
    getLocalStorage("workExperiences", [])
  );

  // Clear all data
  function clearResume() {
    setFullName("");
    setEmail("");
    setPhone("");
    setAboutMe("");
    setEducation([]);
    setSkills([]);
    setWorkExperiences([]);
    localStorage.clear(); // Clear localStorage to reset all saved data
  }

  // Load example data
  function exampleResume() {
    const exampleData = {
      fullName: "Dardan Nuredini",
      email: "nuredinidardan5@gmail.com",
      phone: "049558893",
      aboutMe:
        "I am a passionate Front-End Developer with a strong foundation in creating responsive, user-friendly, and visually appealing web interfaces. With expertise in HTML, CSS, JavaScript, and modern libraries like React, I specialize in building intuitive designs and seamless user experiences.",
      education: [
        { school: "Faik Konica", degree: "High School Diploma", year: 2010 },
        { school: "Faik Konica", degree: "High School Diploma", year: 2010 },
      ],
      skills: [{ skill: "Leadership" }, { skill: "Design" }],
      workExperiences: [
        {
          companyName: "Per Programera",
          title: "Assistant Manager",
          date: 2020,
          description:
            "Implemented sustainable and organic farming practices, resulting in high-quality beet production and increased farm profitability.",
        },
        {
          companyName: "Drd Company",
          title: "Manager",
          date: "2022 - Present",
          description:
            "Implemented sustainable and organic farming practices, resulting in high-quality beet production and increased farm profitability. Developed and promoted Schrute Farms as a successful agrotourism destination, attracting visitors for farm tours, bed and breakfast stays, and beet-related activities.",
        },
      ],
    };

    setFullName(exampleData.fullName);
    setEmail(exampleData.email);
    setPhone(exampleData.phone);
    setAboutMe(exampleData.aboutMe);
    setEducation(exampleData.education);
    setSkills(exampleData.skills);
    setWorkExperiences(exampleData.workExperiences);
  }

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const savedCategories = [
      "fullName",
      "email",
      "phone",
      "aboutMe",
      "education",
      "skills",
      "workExperiences",
    ];
    const saveInfo = [
      fullName,
      email,
      phone,
      aboutMe,
      education,
      skills,
      workExperiences,
    ];

    savedCategories.forEach((key, index) => {
      localStorage.setItem(key, JSON.stringify(saveInfo[index]));
    });
  }, [fullName, email, phone, aboutMe, education, skills, workExperiences]);

  useEffect(() => {
    if (!aboutMe) {
      setAboutMe((prev) => ({ ...prev, aboutMe: "" }));
    }
  }, [aboutMe]);

  return (
    <>
      <Header
        clearResume={clearResume}
        exampleResume={exampleResume}
        handlePrint={handlePrint}
      />
      <div className="xl:grid xl:grid-cols-[auto_1fr] md:px-28 px-5 xl:px-5 py-4 gap-5 flex flex-col">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col gap-5 w-full">
            <PersonalInformation
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              aboutMe={aboutMe}
              setAboutMe={setAboutMe}
            />
            <Education education={education} setEducation={setEducation} />
            <WorkExperience
              workExperiences={workExperiences}
              setWorkExperiences={setWorkExperiences}
            />
            <Skills skills={skills} setSkills={setSkills} />
          </div>
        </div>

        <div className="px-2 min-h-[768px] mx-auto">
          <div ref={componentRef}>
            <CvMain
              fullName={fullName}
              email={email}
              phone={phone}
              aboutMe={aboutMe}
              education={education}
              skills={skills}
              workExperiences={workExperiences}
            />
          </div>
        </div>
      </div>
    </>
  );
}
