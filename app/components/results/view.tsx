"use client";

import { useState } from "react";
import ViewResearch from "./viewDetails";
import TopBar from "./top";


const View = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showSideBar = () => setIsOpen(!isOpen);
  const closeSideBar = () => setIsOpen(false);

  return (
    <>
      <TopBar onClickSideBar={showSideBar} />
      <div className="py-2 bg-slate-50 flex flex-1 mt-[118px]" onClick={closeSideBar}>
        <ViewResearch ResearchId={id} />
      </div>
    </>
  );
};

export default View;
