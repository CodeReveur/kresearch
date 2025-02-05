"use client";

import { useState } from "react";
import SimilarTopics from "./similarTopics";
import SimilarTitles from "./similarTitles";
import Researches from "./researches";

const buttons = [
  {"name": "Topics"},
  {"name": "Titles"},
]

const Result = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  return (
    <div className="px-5 py-2 bg-slate-50 flex flex-1 mt-[125px]">
      <div className="fixed w-[20vw]">
        <h4 className="py-2 ">Similars</h4>
        <div className="flex items-center">
          {buttons.map((btn, i)=>(
              <button onClick={() => {setActiveBtn(i)}} key={i} className={ `w-full py-1 px-2 ${activeBtn === i ? 'border-b-0 bg-white ': ''} `}>{btn.name}</button>
          ))}
        </div>
          {activeBtn === 0 && (
            <SimilarTopics />
          )}
          {activeBtn === 1 && (
            <SimilarTitles />
          )}
      </div>
      <Researches />
     
    </div>
  );
}
export default Result;