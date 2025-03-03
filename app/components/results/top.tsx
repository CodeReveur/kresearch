import Link from "next/link";
import { useEffect, useState } from "react";
import PopupForm from "../auth/choose";

interface TopbarProps {
  onClickSideBar: () => void;
}

const TopBar = ({ onClickSideBar }: TopbarProps) => {
  const [query, setQuery] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const kay = urlParams.get("search");
      if (kay) setQuery(kay);
    }
  }, []);

  return (
    <>
          {isAuth && (
            <PopupForm />
          )}
    <div className="fixed bg-white w-full top-0 left-0 m-0 z-10 shadow-md">
      
      {/* Top Section */}
      <div className="flex justify-between items-center px-4 lg:px-8 py-2">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Link href={"/"} className="w-12 h-12 rounded-full">
            <img src="/logo.svg" alt="logo" className="w-full h-full rounded-full" />
          </Link>
          <button onClick={onClickSideBar} className="text-teal-800 text-2xl">
            <i className="bi bi-list"></i>
          </button>
          <Link href={"/w-page/help"} className="hidden sm:flex items-center text-slate-500">
            <i className="bi bi-question-circle-fill text-2xl mr-2"></i>
            <span> Help </span>
          </Link>
        </div>

        {/* Authentication Section */}
        <div className="flex items-center space-x-4">
          {false ? (
            <div className="w-10 h-10 rounded-full p-1 bg-teal-100 flex justify-center items-center">
              <i className="bi bi-person text-2xl text-teal-600"></i>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link href="#" onClick={() => setIsAuth(!isAuth)} className="border border-teal-600 py-1 px-4 rounded-md">
                Login
              </Link>
              <Link href="/w-page/auth/join" className="border border-teal-300 py-1 px-4 rounded-md bg-teal-600 text-white">
                Join for free
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="w-full px-4 py-2 bg-teal-600 flex flex-col sm:flex-row items-center justify-between">
        {/* Search Form */}
        <form method="GET" action="/w-page/result" className="flex bg-white w-full sm:w-[50%] rounded-md">
          <input
            type="search"
            name="search"
            defaultValue={query}
            placeholder="Search for researches..."
            className="w-full placeholder:text-gray-500 border outline-none rounded-s-md border-r-0 px-4 py-2 bg-transparent border-slate-50"
          />
          <button type="submit" className="px-4 text-slate-200 border border-l-0 rounded-e-md border-slate-50 bg-teal-600">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Navigation Links */}
        <div className="hidden sm:flex text-white space-x-6 sm:space-x-10 mt-2 sm:mt-0">
          <Link href={"/contact-us"} className="hover:text-sky-100 hover:underline text-nowrap">
            Contact us
          </Link>
          <Link href={"/about"} className="hover:text-sky-100 hover:underline">
            About
          </Link>
          <div className="flex border border-slate-200 py-1 text-sm px-2 rounded-md text-slate-300 items-center">
            <i className="bi bi-globe mr-1"></i>
            <select name="language" className="bg-transparent outline-none">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="kiny">Kiny</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TopBar;
