"use client";

import SideBar from "@/app/pages/sidebar";
import TopBar from "@/app/components/results/top";
import { useState } from "react";
import Result from "@/app/components/results";

const Results = ( ) => {
    const [isOpen, setIsOpen] = useState(false);
    const showSideBar = () => {
      setIsOpen(!isOpen);
    }
   const closeSideBar = () => {
    setIsOpen(false);
   }
  
  return (
    <>
    <TopBar onClickSideBar={showSideBar}/>
      {isOpen && (
        <SideBar />
      )}
    <div onClick={closeSideBar}>
      <Result />
    </div>
    </>
  );
}
export default Results;
