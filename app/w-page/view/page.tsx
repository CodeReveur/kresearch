"use client";

import Preloader from "@/app/components/app/divPreloader";
import TopBar from "@/app/components/results/top";
import Footer from "@/app/pages/footer";
import SideBar from "@/app/pages/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FormData {
  title: string;
  researcher: string;
  category: string;
  institute: string;
  status: string;
  progress_status: string;
  school: string;
  year: string;
  abstract: string;
  document: string;
  document_type: string;
  created_at: string;
}

function formatDate(dateString: any) {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${month}, ${day} ${year} ${hours}:${minutes}:${seconds}`;
}

function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [research, setResearch] = useState<FormData | null>(null);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const handleActive = (id: number) => {
    setActiveId(id);
  };

  useEffect(() => {
    // Get search query from URL and set the id
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("id");
      if (query) {
        setId(query);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch research data only if the id is set
    if (id) {
      const fetchResearch = async () => {
        setLoading(true)
        try {
          const response = await fetch(`/api/researches/view`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ id: id }), // Use resolved ID
          });
          if (!response.ok) throw new Error("Failed to fetch researches");
          const data = await response.json();
          setResearch(data);
          setLoading(false);
          if (!response.ok) setError("Not found")
        } catch (error) {
          setError("Not found");
          setLoading(false);
        }
      };

      fetchResearch();
    }
  }, [id]); // Trigger research fetching whenever `id` changes

  useEffect(() => {
    if (research?.abstract) {
      const abstract = document.getElementById("abstract") as HTMLDivElement;
      if (abstract) {
        abstract.innerHTML = research.abstract;
      }
    }
  }, [research]);

  useEffect(() => {
   // Fetch research data only if the id is set
   if (id) {
    const updateRatings = async () => {
      try {
        const response = await fetch(`/api/researches/ratings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ id: id }), // Use resolved ID
        });
        if (!response.ok) console.error("Failed to fetch researches");
      } catch (error) {
        console.log(error)
      }
    };

    updateRatings();
  }
  }, [id]);

  const buttons = [
    { name: "details" },
  ];

  const showSideBar = () => setIsOpen(!isOpen);
  const closeSideBar = () => setIsOpen(false);
  let title = "Loading ...";
  if(error?.includes("Not found")){
    title = "Not found";
  }else{
    title = ""+research?.title
  }
  return (
    <>
      <head>
        <title>{title}</title>
      </head>
      <TopBar onClickSideBar={showSideBar} />
      {error && error.includes("Not found") ? (
        <div className="text-red-500 p-32 my-32 text-center">Material not found</div>
      ) : (
        <div className="py-2 bg-slate-50 flex flex-1 mt-[118px]" onClick={closeSideBar}>
          <div className="w-full bg-slate-100 px-4">
            <h4 className="flex justify-between items-center py-4 px-2 flex-wrap gap-2">
              <span className="text-2xl text-slate-700 font-semibold">
                {truncateText(research?.title ?? "", 80)}
              </span>
              <button
                className={`border ${
                  research?.progress_status === "completed"
                    ? " border-green-300 text-green-500"
                    : research?.progress_status === "ongoing"
                    ? " border-orange-300 text-orange-500"
                    : "border-yellow-300 text-yellow-500"
                } py-[6px] px-6 rounded-md text-sm text-center capitalize`}
              >
                {research?.progress_status}
              </button>
            </h4>
            <div className="flex space-x-4 px-3 overflow-x-auto">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleActive(index)}
                  className={`py-[6px] px-4 border-b capitalize hover:border-teal-500 ${
                    activeId === index ? "border-teal-500" : ""
                  }`}
                >
                  {button.name}
                </button>
              ))}
            </div>
            {loading ? (
              <Preloader />
            ) : (
              <form className="space-y-2">
                <div className="flex flex-col lg:flex-row justify-between p-2 gap-3">
                  {/* Research Info */}
                  <div className="w-full lg:w-5/6 bg-white rounded-lg p-5">
                    <div className="w-full flex items-center justify-center bg-slate-100 p-2">
                      <i className="bi bi-search text-5xl text-slate-400"></i>
                    </div>
                    <div className="space-y-4 px-1">
                      <div className="relative">
                        <h4 className="font-medium py-2">Title</h4>
                        <div className="relative text-gray-700 transition-all duration-300">
                          {research?.title}
                        </div>
                      </div>
                      <div className="relative">
                        <h4 className="font-medium py-2">Abstract</h4>
                        <div className="relative text-gray-700 transition-all duration-300" id="abstract"></div>
                      </div>
                      <div className="relative">
                        <h4 className="font-medium py-2">Document</h4>
                        <div className="relative text-gray-700 transition-all duration-300">
                          <Link
                            href={research?.document ?? ""}
                            className="text-teal-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {truncateText(research?.document ?? "", 30)}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Sidebar Details */}
                  <div className="w-full lg:w-2/6 bg-white rounded-lg p-5 space-y-2 h-max">
                    <h1 className="text-lg text-slate-600 font-semibold">Research Details</h1>
                    {[
                      { label: "Status", value: research?.progress_status },
                      { label: "Researcher", value: research?.researcher },
                      { label: "University", value: research?.institute },
                      { label: "Category", value: research?.category },
                      { label: "Year", value: research?.year },
                      { label: "School", value: research?.school },
                      { label: "Document Type", value: research?.document_type },
                      { label: "Uploaded at", value: formatDate(research?.created_at) },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <h4 className="text-xs text-slate-500">{item.label}</h4>
                        <div className="text-sm text-slate-700">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        
      )}
       {isOpen && (
        <SideBar />
      )}
      <Footer />
    </>
  );
  
}
