import React from "react";
import DOMPurify from "dompurify";

const CvMain = ({
  fullName,
  email,
  phone,
  aboutMe,
  education,
  skills,
  workExperiences,
}) => {
  // Check if there is any data to display
  const hasContent =
    fullName ||
    email ||
    phone ||
    (aboutMe.length && aboutMe.trim().length > 0) ||
    education.length > 0 ||
    skills.length > 0 ||
    workExperiences.length > 0;

  return (
    <>
      {hasContent && (
        <div className="bg-white sm:w-[300px] md:w-auto shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white p-4">
            <h1 className="text-3xl font-bold">{fullName}</h1>
            <p>{email}</p>
            <p>{phone}</p>
          </div>

          {/* Main Content */}
          <div className="w-full px-4 py-4 overflow-visible sm:px-6 sm:py-6">
            {/* About Me */}
            {aboutMe && aboutMe.trim().length > 0 && (
              <div className="mb-8">
                <h2 className="font-medium text-xl mb-4">About Me</h2>
                <div
                  className="text-left"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(aboutMe)
                      .replace(/<\/p>/g, "<br>")
                      .replace(/<p>/g, ""),
                  }}
                />
              </div>
            )}

            {/* Work Experience */}
            {workExperiences.length > 0 && (
              <div>
                <h2 className="font-medium text-xl mb-4">Work Experience</h2>
                {workExperiences.map((experience, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600">{experience.companyName}</p>
                    <p className="text-gray-600">{experience.date}</p>
                    <ul className="list-disc list-inside leading-relaxed">
                      <li
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(experience.description),
                        }}
                      />
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="mb-8">
                <h2 className="font-medium text-xl mb-4">Education</h2>
                {education.map((edu, index) => (
                  <div key={index} className="leading-relaxed text-sm mb-4">
                    <p className="font-semibold">{edu.school}</p>
                    <p className="italic">{edu.degree}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="font-medium text-xl mb-4">Skills</h2>
                <ul className="list-disc list-inside">
                  {skills.map((skill, index) => (
                    <li key={index}>{skill.skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CvMain;
