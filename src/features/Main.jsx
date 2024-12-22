import React, { useEffect, useState } from "react";
import PersonalInformation from "./components/PersonalInformation";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CvMain from "./ui/CvMain";
import Header from "./ui/Header";
import useHandlePrint from "./hook/useHandlePrint";

export default function Main() {
  const { componentRef, handlePrint } = useHandlePrint();

  // Consolidated state for the resume
  const [resume, setResume] = useState(() => ({
    fullName: localStorage.getItem("fullName") || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
    aboutMe: localStorage.getItem("aboutMe") || "",
    education: JSON.parse(localStorage.getItem("education") || "[]"),
    skills: JSON.parse(localStorage.getItem("skills") || "[]"),
    workExperiences: JSON.parse(localStorage.getItem("workExperiences") || "[]"),
  }));

  const isCvMainVisible =
  resume.fullName ||
  resume.email ||
  resume.phone ||
  resume.aboutMe.trim().length > 0 ||
  resume.education.length > 0 ||
  resume.skills.length > 0 ||
  resume.workExperiences.length > 0;

  const updateResume = (key, value) => {
    setResume((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  };

  const clearResume = () => {
    const clearedResume = {
      fullName: "",
      email: "",
      phone: "",
      aboutMe: "",
      education: [],
      skills: [],
      workExperiences: [],
    };
    setResume(clearedResume);
    Object.keys(clearedResume).forEach((key) => localStorage.removeItem(key));
  };

  const exampleResume = () => {
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
      skills: [
        { skill: "Leadership" },
        { skill: "Design" },
      ],
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
    setResume(exampleData);
    Object.entries(exampleData).forEach(([key, value]) =>
      localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value))
    );
  };

  useEffect(() => {
    if (!resume.aboutMe) {
      setResume((prev) => ({ ...prev, aboutMe: "" }));
    }
  }, [resume.aboutMe]);

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
              fullName={resume.fullName}
              setFullName={(value) => updateResume("fullName", value)}
              email={resume.email}
              setEmail={(value) => updateResume("email", value)}
              phone={resume.phone}
              setPhone={(value) => updateResume("phone", value)}
              aboutMe={resume.aboutMe}
              setAboutMe={(value) => updateResume("aboutMe", value)}
            />
            <Education
              education={resume.education}
              setEducation={(value) => updateResume("education", value)}
            />
            <WorkExperience
              workExperiences={resume.workExperiences}
              setWorkExperiences={(value) => updateResume("workExperiences", value)}
            />
            <Skills
              skills={resume.skills}
              setSkills={(value) => updateResume("skills", value)}
            />
          </div>
        </div>
        <div className="px-2 min-h-[768px] mx-auto">
          <div ref={componentRef}>
           {isCvMainVisible && <CvMain {...resume} />}
          </div>
        </div>
      </div>
    </>
  );
}
