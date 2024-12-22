import React from "react";
import { PenTool } from "react-feather";


export default function Header({ clearResume, exampleResume,handlePrint }) {
  
  return (
    <div className="flex  justify-between py-4 px-4">
      <section className="flex items-center gap-2">
        <PenTool color="#005ff7" />
        <h1 className="text-xl">CV Creator</h1>
      </section>

      <section className="flex gap-2">
        <button
          onClick={() => exampleResume()}
          className="bg-blue-200 px-2 py-2 rounded-sm hover:bg-blue-500 transition-all duration-300 text-gray-700 border hover:text-white border-blue-600"
        >
          Example Resume
        </button>
        <button
          onClick={() => clearResume()}
          className="bg-blue-200 px-2 py-2 rounded-sm hover:bg-blue-500 transition-all duration-300 text-gray-700 border hover:text-white border-blue-600"
        >
          Clear Resume
        </button>

        <button className="bg-blue-500 px-2 py-2 text-white border border-blue-700" onClick={()=>handlePrint()}>Print CV</button>
      </section>
    </div>
  );
}
