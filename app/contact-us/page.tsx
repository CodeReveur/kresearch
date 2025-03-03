"use client";

import SideBar from "@/app/pages/sidebar";
import TopBar from "@/app/components/results/top";
import { useState } from "react";
import ContactUs from "@/app/components/app/contact-us";
import Footer from "@/app/pages/footer";

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
      <ContactUs />
      <Footer />
    </div>

    </>
  );
}
export default Results;