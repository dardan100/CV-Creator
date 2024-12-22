import React from "react";
import { User } from "react-feather";
import DOMPurify from "dompurify";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const sanitizeContent = (content) => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "ol", "ul", "li"],
  });
};

export default function PersonalInformation({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  aboutMe,
  setAboutMe,
}) {
  return (
    <div className="xl:w-[350px] w-full px-4 py-5 border border-blue-500 rounded-md bg-blue-100">
      <p className="flex content-center gap-1 font-medium">
        <span>
          <User size={20} color="#005ff7" strokeWidth={2} />
        </span>
        Personal Information
      </p>

      <section className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col text-black">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="border px-2 border-blue-400 text-gray-700"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-black">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="border px-2 border-blue-400 text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-black">
          <label htmlFor="Phone">Phone</label>
          <input
            type="number"
            className="border px-2 border-blue-400 text-gray-700"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">About Me</label>
          {/* ReactQuill for editing */}
          <ReactQuill
  className="border border-blue-400"
  theme="snow"
  value={aboutMe}
  onChange={(content) => setAboutMe(sanitizeContent(content))} // Regular updates
  style={{ direction: "ltr", textAlign: "left" }}
/>
        </div>
      </section>
    </div>
  );
}
