"use client"

import { useState } from "react";
import Search from "./search";
import SideBar from "./sidebar";
import TopBar from "./topbar";



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
      <main className="h-[60vh] w-full" onClick={closeSideBar}>
        <Search />
      </main>
    </>
  );
}
export default HomePage;