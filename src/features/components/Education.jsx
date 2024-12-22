import React, { useState } from "react";
import { Book, Trash } from "react-feather";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function PersonalInformation({ education, setEducation }) {
  const [show, setShow] = useState({});

  const showExperience = (id) => {
    setShow((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the visibility of the specific section
    }));
  };

  const addWorkExperience = () => {
    const newEducation = {
      id: Date.now(),
      school: "",
      degree: "",
      year: "",
    };
    setEducation([...education, newEducation]);
    setShow((prev) => ({ ...prev, [newEducation.id]: true }));
  };

  const handleInputChange = (id, field, value) => {
    setEducation((prev) =>
      prev.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              [field]: value,
            }
          : experience
      )
    );
  };

  const handleDelete = (idExperience) => {
    setEducation((prev) =>
      prev.filter((experience) => experience.id !== idExperience)
    );
  };

  return (
    <div className="xl:w-[350px] w-full px-4 py-5 border border-blue-500 rounded-md bg-blue-100">
      <p className="flex content-center gap-1 font-medium">
        <span>
          <Book size={20} color="#005ff7" strokeWidth={2} />
        </span>
        Education
      </p>

      {education.map((experience, index) => (
        <section
          key={experience.id}
          className="mt-4 flex overflow-hidden transition-all duration-300 flex-col gap-3"
        >
          <div
            onClick={() => showExperience(experience.id)}
            className="flex bg-blue-300 px-2 text-xl cursor-pointer py-2 justify-between items-center"
          >
            <h1>
              {experience.school !== ""
                ? experience.school
                : `${"Education"} #${index + 1}`}
            </h1>
            <button>{show[experience.id] ? "-" : "+"}</button>
          </div>
          {show[experience.id] && (
            <>
              <div className="flex flex-col text-black">
                <label htmlFor={`company-${experience.id}`}>School</label>
                <input
                  type="text"
                  id={`company-${experience.id}`}
                  className="border px-2 border-blue-400 text-gray-700"
                  value={experience.school}
                  onChange={(e) =>
                    handleInputChange(experience.id, "school", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col text-black">
                <label htmlFor={`degree-${experience.id}`}>Degree</label>
                <input
                  type="text"
                  id={`title-${experience.id}`}
                  className="border px-2 border-blue-400 text-gray-700"
                  value={experience.degree}
                  onChange={(e) =>
                    handleInputChange(experience.id, "degree", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col text-black">
                <label htmlFor={`date-${experience.id}`}>Year</label>
                <input
                  type="text"
                  id={`date-${experience.id}`}
                  className="border px-2 border-blue-400 text-gray-700"
                  value={experience.year}
                  onChange={(e) =>
                    handleInputChange(experience.id, "year", e.target.value)
                  }
                />
              </div>

              <button
                onClick={() => handleDelete(experience.id)}
                className="bg-red-500 flex items-center gap-1 hover:bg-red-400 duration-300 w-20 px-1 py-2 text-white"
              >
                <span>
                  <Trash size={15} color="white" />
                </span>
                Delete
              </button>
            </>
          )}
        </section>
      ))}

      <button
        onClick={addWorkExperience}
        className="bg-blue-300 hover:bg-blue-400 duration-300 w-full mt-2 py-2"
      >
        Add Education
      </button>
    </div>
  );
}
