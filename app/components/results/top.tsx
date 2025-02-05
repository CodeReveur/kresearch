import Link from "next/link";
import { useEffect, useState } from "react";

interface TopbarProps {
  onClickSideBar: () => void;
}

const TopBar = ({onClickSideBar}: TopbarProps) => {
  const [query, setQuery] = useState("");
 useEffect(() => {
    // Get search query from URL and set the id
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const kay = urlParams.get("search");
      if (kay) {
        setQuery(""+kay);
      }
    }
  }, []);
  return (
    <div className="fixed bg-white w-full top-0 left-0 m-0 z-10">
      <div className="flex justify-center items-center">
        <div className="sidemenu flex items-center flex-1 text-slate-500">
          <div className="w-16 h-16 rounded-full">
            <img src="/logo.svg" alt="logo" className="w-full h-full rounded-full"/>
          </div>
          <div className="mx-1 cursor-pointer" onClick={onClickSideBar}>
            <i className="bi bi-list text-2xl text-teal-800"></i>
          </div>
          <Link href={""} className="mx-5 flex items-center">
            <i className="bi bi-question-circle-fill text-2xl mr-2"></i> 
            <span> Help </span>
          </Link>
        </div>
        <div className="login px-5">
          {false ? (
          <div className="w-10 h-10 rounded-full p-1 bg-teal-100 flex justify-center items-center">
            <i className="bi bi-person text-2xl  text-teal-600"></i>
          </div>
          ) : (
          <div className="flex space-x-4 items-center">
            <Link href={"/w-page/auth/login"} className="border border-teal-600 py-1 px-6 rounded-md ">Login</Link>
            <Link href={"/w-page/auth/join"} className="border border-teal-300 py-1 px-6 rounded-md bg-teal-600 text-white">Join for free</Link>
          </div>
          )}
          
          
        </div>
      </div>
      <div className="w-full px-4 py-2 bg-teal-600 flex justify-between items-center">
        <div className="search w-full">
          <form method="GET" action={"/w-page/result"} className="flex bg-white w-[60%] rounded-md">
           <input type="search" name="search" id="" defaultValue={query} placeholder="Search for researches..." className="w-full placeholder:text-gray-500 border outline-none rounded-s-md border-r-0 px-4 py-2 bg-transparent border-slate-50"/>
           <button type="submit" className="text-center px-4 text-slate-200 border border-l-0 rounded-e-md border-slate-50 bg-teal-600"><i className="bi bi-search"></i></button>
          </form>
        </div>
        <div className="text-white space-x-10 pr-3 flex items-center">
          <Link href={""} className="hover:text-sky-100 hover:underline text-nowrap">Contact us</Link>
          <Link href={""} className="hover:text-sky-100 hover:underline">About</Link>
          <div className="flex border border-slate-200 py-1 text-sm px-2 rounded-md text-slate-300">
            <i className="bi bi-globe"> </i>
            <select name="" id="" className="bg-transparent outline-none">
              <option value="">English</option>
              <option value="">French</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TopBar;