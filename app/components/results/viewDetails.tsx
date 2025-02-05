"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  const buttons = [
    {"name": "details"},
    {"name": "supervisors"},
    {"name": "institution"},
    {"name": "billing"},
  ];
interface getData{
  id: string;
}

function formatDate(dateString: any) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Array of month names
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract parts of the date
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Construct the formatted date
  return `${month}, ${day} ${year} ${hours}:${minutes}:${seconds}`;
}

function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text; // Return the original text if it's within the limit
}
interface ViewResearchProps{
  ResearchId: string;
}
const ViewResearch: React.FC<ViewResearchProps> = ({ResearchId}) => { 

  const [activeId, setActiveId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [research, setResearch] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<getData>({
      id: ResearchId,
    });


   const handleActive = (id: number) => {
    setActiveId(id);
   }
  // Fetch Researches
  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch(`/api/researches/view`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
            Accept: "application/json",
          },
          body: JSON.stringify(formData), // Convert form data to JSON
        });
        if (!response.ok) throw new Error("Failed to fetch researches");
        const data = await response.json();
        setResearch(data);
      } catch (error) {
        setError("An error occurred while fetching researches.");
      }
    };
    fetchResearch();
  }, []);
 
  useEffect(() => {
    if (typeof window !== "undefined") { // ✅ Ensure it runs only on the client
      const abstract = document.getElementById("abstract") as HTMLDivElement;
      if (abstract && research?.abstract) {
        abstract.innerHTML = research.abstract;
      }
    }
  }, [research]); // ✅ Add research as a dependency to update when it changes

  const buttons = [
    {"name": "details"},
    {"name": "institution"},
  ]
  return (
    <> 
      <head>
        <title>{research?.title}</title>
      </head>
      <div className="w-full bg-slate-100 px-4">
        <h4 className="flex justify-between items-center py-4 px-2">
          <div>
           <span className="text-2xl  text-slate-700 font-semibold">{truncateText(research?.title ?? "" , 80)}</span> 
          </div>
          <div className="space-x-3">
            <button className={`border ${research?.progress_status === 'completed' ? ' border-green-300 text-green-500 ': research?.progress_status === 'ongoing' ? ' border-orange-300 text-orange-500' : 'border-yellow-300 text-yellow-500'} 
              py-[6px] px-6 rounded-md text-sm  text-center capitalize`}
            >
              {research?.progress_status}
            </button>
          </div>
        </h4>
        <div className="flex space-x-4 px-3">
          {buttons.map((button, index) => (
            <button key={index} onClick={() => handleActive(index)} className={`py-[6px] px-4 border-b capitalize hover:border-teal-500 ${activeId === index ? 'border-teal-500': ''}`}>{button.name}</button>
          ))}

        </div>
        
        <form className="space-y-2">
        
        <div className="flex justify-between p-2 space-x-3">
          <div className="w-5/6 bg-white rounded-lg p-5">
           <div className="w-full flex items-center justify-center bg-slate-100 p-2">
            <i className="bi bi-search text-5xl text-slate-400"></i>
           </div>
           <div className="space-y-4 px-1">

            
           <div className="relative">
              <h4 className="font-medium py-2">Title</h4>
              <div className={`relative text-gray-700 transition-all duration-300`}>
              {research?.title}
              </div>
            </div>

            <div className="relative">
              <h4 className="font-medium py-2">Abstract </h4>
              <div className={`relative text-gray-700 transition-all duration-300`} id="abstract"></div>
            </div>

            <div className="relative">
              <h4 className="font-medium py-2">Document</h4>
              <div className={`relative text-gray-700 transition-all duration-300`}>
               <Link 
                href={research?.document ?? ""} 
                className="text-teal-600 underline" 
                target="_blank" 
                rel="noopener noreferrer"
               >
                {truncateText(research?.document ?? "", 80)}
               </Link>
              </div>
            </div>
            
           </div>
          </div>
          <div className="w-2/6 bg-white rounded-lg p-5 space-y-2 h-max">
           <h1 className="text-lg text-slate-600 font-semibold">Research Details</h1>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">Status</h4>
            <div className="text-sm tex-slate-600">{research?.progress_status}</div>
           </div>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">Researcher</h4>
            <div className="text-sm tex-slate-600">{research?.researcher}</div>
           </div>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">University</h4>
            <div className="text-sm tex-slate-600">{research?.institute}</div>
           </div>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">Category</h4>
            <div className="text-sm tex-slate-600">{research?.category}</div>
           </div>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">Year</h4>
            <div className="text-sm tex-slate-600">{research?.year}</div>
           </div>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">School </h4>
            <div className="text-sm tex-slate-600">{research?.school}</div>
           </div>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">Document Type</h4>
            <div className="text-sm tex-slate-600">{research?.document_type}</div>
           </div>

           <div className="space-y-1">
            <h4 className="text-xs text-slate-500">Uploaded at</h4>
            <div className="text-sm tex-slate-600">{formatDate(research?.created_at)}</div>
           </div>

          </div>
        </div>
        </form>
    </div>
  </>
  )
}
export default ViewResearch;