import { useState } from "react";
import Link from "next/link";
import PopupForm from "../components/auth/choose";

const Links = [
  { name: "Home", icon: "bi bi-house", url: "/" },
  { name: "Kamero official site", icon: "bi bi-globe", url: "https://kamero.rw" },
  { name: "Contact us", icon: "bi bi-phone", url: "/contact-us" },
  { name: "About", icon: "bi bi-info-circle", url: "/about" },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-30 bg-teal-600 text-white p-2 rounded-md shadow-md"
      >
        <i className="bi bi-grid text-xl"></i>
      </button>

      {/* Sidebar (Fixed Outside) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md shadow-slate-400 z-40 rounded-e-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-[70vw] sm:w-[18vw]`}
      >
        <div className="h-full flex flex-col justify-between py-7">
          {/* Logo */}
          <div className="border-b pb-3 px-3 mb-3 border-slate-300 flex items-center justify-between">
            <Link href={"/"} className="flex items-center">
              <img src="/logo.svg" alt="logo" className="w-12 h-8 mr-2" />
              <h4 className="text-lg sm:text-xl font-medium text-nowrap text-teal-600">
                Research Base
              </h4>
            </Link>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="sm:hidden text-teal-600 text-2xl"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col">
            {Links.map((link, key) => (
              <Link
                key={key}
                href={link.url}
                className="mx-4 py-1 px-2 text-slate-700 font-medium rounded-md hover:text-[#00796b] hover:bg-slate-100"
              >
                <i className={`${link.icon} mr-3 text-lg text-teal-600`}></i>
                <span className="text-base">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="flex flex-col mt-auto"> 
           
            <button
              onClick={() => setIsAuth(!isAuth)}
              className="mx-4 py-2 border border-teal-400 bg-teal-100 px-2 text-teal-600 text-center font-medium rounded-md hover:text-[#00796b] hover:bg-slate-100"
            >
              <i className="bi bi-box-arrow-right mr-3 text-lg"></i>
              <span className="text-base">Login</span>
            </button>
            <Link
              href={"/w-page/help"}
              className="mx-4 py-1 my-2 text-xs px-2 text-slate-900 font-medium rounded-md hover:text-[#010303]"
            >
              <i className="bi bi-question-circle-fill mr-3 text-lg"></i>
              <span className="text-base">Need help</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {isAuth && <PopupForm />}
    </>
  );
};

export default SideBar;
