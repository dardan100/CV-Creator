import React, { useState } from "react";
import { Briefcase, Trash } from "react-feather";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

export default function WorkExperience({
  workExperiences,
  setWorkExperiences,
}) {
  const [show, setShow] = useState({});

  const showExperience = (id) => {
    setShow((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const addWorkExperience = () => {
    const newExperience = {
      id: Date.now(),
      companyName: "",
      title: "",
      date: "",
      description: "",
    };
    setWorkExperiences([...workExperiences, newExperience]);
    setShow((prev) => ({ ...prev, [newExperience.id]: true }));
  };

  const handleInputChange = (id, field, value) => {
    setWorkExperiences((prev) =>
      prev.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              [field]: field === "description" ? value : value,
            }
          : experience
      )
    );
  };

  const handleDelete = (idExperience) => {
    setWorkExperiences((prev) =>
      prev.filter((experience) => experience.id !== idExperience)
    );
  };

  // Sanitize content for safe rendering
  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "ol", "ul", "li"],
    });
  };

  return (
    <div className="xl:w-[350px] w-full px-4 py-5 border border-blue-500 rounded-md bg-blue-100">
      <p className="flex content-center gap-1 font-medium">
        <span>
          <Briefcase size={20} color="#005ff7" strokeWidth={2} />
        </span>
        Work Experience
      </p>

      {workExperiences.map((experience, index) => (
        <section
          key={experience.id}
          className="mt-4 flex overflow-hidden transition-all duration-300 flex-col gap-3"
        >
          <div
            onClick={() => showExperience(experience.id)}
            className="flex bg-blue-300 px-2 text-xl cursor-pointer py-2 justify-between items-center"
          >
            <h1>{experience.companyName || `Work Experience #${index + 1}`}</h1>
            <button>{show[experience.id] ? "-" : "+"}</button>
          </div>
          {show[experience.id] && (
            <>
              <div className="flex flex-col text-black">
                <label>Company Name</label>
                <input
                  type="text"
                  className="border px-2 border-blue-400 text-gray-700"
                  value={experience.companyName}
                  onChange={(e) =>
                    handleInputChange(
                      experience.id,
                      "companyName",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="flex flex-col text-black">
                <label>Title</label>
                <input
                  type="text"
                  className="border px-2 border-blue-400 text-gray-700"
                  value={experience.title}
                  onChange={(e) =>
                    handleInputChange(experience.id, "title", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col text-black">
                <label>Date</label>
                <input
                  type="text"
                  className="border px-2 border-blue-400 text-gray-700"
                  value={experience.date}
                  onChange={(e) =>
                    handleInputChange(experience.id, "date", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                <ReactQuill
                  className="border border-blue-400"
                  theme="snow"
                  value={experience.description}
                  onChange={(value) =>
                    handleInputChange(experience.id, "description", value)
                  }
                />
              </div>
              <button
                onClick={() => handleDelete(experience.id)}
                className="bg-red-600 flex items-center gap-1 hover:bg-red-500 duration-300 w-20 px-1 py-2 text-white"
              >
                <Trash size={15} color="white" />
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
        Add Work Experience
      </button>
    </div>
  );
}
