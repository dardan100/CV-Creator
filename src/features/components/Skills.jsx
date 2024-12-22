import React from "react";
import { Award, Trash } from "react-feather";
export default function Skills({ skills, setSkills }) {
  function addSkills() {
    const newSkill = {
      id: Date.now(),
      skill: "",
    };

    setSkills([...skills, newSkill]);
  }

  const handleInputChange = (id, field, value) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id
          ? {
              ...skill,
              [field]: value,
            }
          : skill
      )
    );
  };

  const handleDelete = (idExperience) => {
    setSkills((prev) =>
      prev.filter((experience) => experience.id !== idExperience)
    );
  };

  return (
    <div className="xl:w-[350px] w-full px-4 py-5 border border-blue-500 rounded-md bg-blue-100">
      <p className="flex content-center gap-1 font-medium">
        <span>
          <Award size={20} color="#005ff7" strokeWidth={2} />
        </span>
        Skills
      </p>

      {skills.map((skill, index) => (
        <section
          key={skill.id}
          className="mt-4 flex overflow-hidden transition-all duration-300 flex-col gap-3"
        >
          <>
            <div className="flex gap-2 justify-between items-center text-black">
              <input
                type="text"
                id={`skill-${skill.id}`}
                className="border px-2 w-full border-blue-400 text-gray-700"
                value={skill.skill}
                onChange={(e) =>
                  handleInputChange(skill.id, "skill", e.target.value)
                }
              />

              <button onClick={() => handleDelete(skill.id)}>
                <Trash size={19} />
              </button>
            </div>
          </>
        </section>
      ))}

      <button
        onClick={addSkills}
        className="bg-blue-300 hover:bg-blue-400 duration-300 w-full mt-2 py-2"
      >
        Add Skill
      </button>
    </div>
  );
}
