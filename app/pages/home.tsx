"use client"

import { useState } from "react";
import Search from "./search";
import SideBar from "./sidebar";
import TopBar from "./topbar";
import Footer from "./footer";



const HomePage = () => {
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
      <main className="sm:h-[60vh] h-[40vh] w-full" onClick={closeSideBar}>
        <Search />
        <Footer />
      </main>
    </>
  );
}
export default HomePage;