"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Ratings from "./ratings";
import Preloader from "../app/divPreloader";

interface Research {
  id: number;
  status: string;
  title: string;
  researcher: string;
  year: string;
  abstract: string;
  m_status: string;//ie. ongoing, completed
  ratings: number;//out of 5
  created_at: string;
  hashed_id: string;
}

const headers = [
  {"name":"all"},
  {"name":"new"},
  {"name":"trends 🔥"},
  {"name":"recommends"},
];
/*

const researchList: Research[] = [
  {
    id: 1,
    status: "published",
    title: "The Impact of Climate Change on Agriculture in Rwanda",
    researcher: "Dr. John Mwangi",
    year: "2023",
    abstract: "This study explores the effects of climate change on Rwanda's agricultural sector, assessing mitigation strategies and adaptive farming practices.",
    m_status: "completed",
    ratings: 4.5,
    created_at: "2023-06-15"
  },
  {
    id: 2,
    status: "under review",
    title: "AI-Powered Healthcare Solutions in Rwanda",
    researcher: "Prof. Aline Uwimana",
    year: "2024",
    abstract: "An analysis of how artificial intelligence is transforming healthcare delivery in Rwanda, improving diagnostics and patient care.",
    m_status: "ongoing",
    ratings: 4.2,
    created_at: "2024-01-10"
  },
  {
    id: 3,
    status: "published",
    title: "Post-Genocide Reconciliation and Social Healing",
    researcher: "Dr. Emmanuel Nkurunziza",
    year: "2022",
    abstract: "This research examines the progress and challenges in Rwanda’s reconciliation process since the 1994 genocide, focusing on community-based healing initiatives.",
    m_status: "completed",
    ratings: 4.8,
    created_at: "2022-09-22"
  },
  {
    id: 4,
    status: "draft",
    title: "Cybersecurity Challenges in Rwanda’s Banking Sector",
    researcher: "Ing. Patrick Kabera",
    year: "2024",
    abstract: "An investigation into cybersecurity threats facing Rwanda’s banking industry and recommended measures for improving digital security.",
    m_status: "ongoing",
    ratings: 3.9,
    created_at: "2024-03-05"
  },
  {
    id: 5,
    status: "published",
    title: "Sustainable Urban Planning for Kigali’s Growth",
    researcher: "Dr. Jeanne Mukamana",
    year: "2023",
    abstract: "This paper explores Kigali’s urban development strategies, balancing rapid growth with environmental sustainability and infrastructure demands.",
    m_status: "completed",
    ratings: 4.7,
    created_at: "2023-11-18"
  },
  {
    id: 6,
    status: "published",
    title: "Renewable Energy Adoption in Rwanda’s Rural Areas",
    researcher: "Dr. Peter Nshuti",
    year: "2023",
    abstract: "This study investigates the role of solar and hydro energy in electrifying rural Rwanda and improving economic growth.",
    m_status: "completed",
    ratings: 4.6,
    created_at: "2023-05-20"
  },
  {
    id: 7,
    status: "under review",
    title: "The Role of Women in Rwanda’s Post-Conflict Reconstruction",
    researcher: "Dr. Claudine Umutoni",
    year: "2022",
    abstract: "An examination of women’s leadership and economic empowerment in Rwanda’s recovery after the genocide.",
    m_status: "completed",
    ratings: 4.9,
    created_at: "2022-11-08"
  },
  {
    id: 8,
    status: "draft",
    title: "Big Data and Its Applications in Rwanda’s Public Sector",
    researcher: "Prof. Albert Rukundo",
    year: "2024",
    abstract: "A study on how big data analytics can enhance governance, transparency, and policy-making in Rwanda.",
    m_status: "ongoing",
    ratings: 4.1,
    created_at: "2024-02-25"
  },
  {
    id: 9,
    status: "published",
    title: "Food Security and Sustainable Agricultural Practices",
    researcher: "Dr. Esperance Kayitesi",
    year: "2023",
    abstract: "An analysis of sustainable farming methods and their impact on food security in Rwanda.",
    m_status: "completed",
    ratings: 4.8,
    created_at: "2023-08-12"
  },
  {
    id: 10,
    status: "published",
    title: "The Impact of Mobile Banking on Financial Inclusion",
    researcher: "Ing. Jean Bosco Habimana",
    year: "2022",
    abstract: "This study explores how mobile banking services have improved financial access in Rwanda.",
    m_status: "completed",
    ratings: 4.7,
    created_at: "2022-10-05"
  },
  {
    id: 11,
    status: "draft",
    title: "Blockchain Technology for Transparent Land Registry",
    researcher: "Dr. Richard Mukasa",
    year: "2024",
    abstract: "Investigating the role of blockchain in reducing land disputes and improving transparency in land registration.",
    m_status: "ongoing",
    ratings: 4.3,
    created_at: "2024-01-30"
  },
  {
    id: 12,
    status: "published",
    title: "E-Government Services and Public Administration",
    researcher: "Prof. Diane Uwimbabazi",
    year: "2023",
    abstract: "Evaluating the impact of digital government services on efficiency and citizen engagement.",
    m_status: "completed",
    ratings: 4.5,
    created_at: "2023-07-19"
  },
  {
    id: 13,
    status: "published",
    title: "The Role of Education Technology in Rwanda’s Schools",
    researcher: "Dr. Marie Claire Mukarubega",
    year: "2023",
    abstract: "A study on how EdTech tools enhance learning outcomes in Rwanda's primary and secondary schools.",
    m_status: "completed",
    ratings: 4.4,
    created_at: "2023-09-01"
  },
  {
    id: 14,
    status: "draft",
    title: "Artificial Intelligence in Precision Farming",
    researcher: "Ing. David Uwamahoro",
    year: "2024",
    abstract: "An exploration of AI-driven solutions to optimize crop yields and reduce wastage.",
    m_status: "ongoing",
    ratings: 4.0,
    created_at: "2024-02-10"
  },
  {
    id: 15,
    status: "under review",
    title: "Smart Cities in East Africa: Case Study of Kigali",
    researcher: "Dr. Samuel Mugisha",
    year: "2024",
    abstract: "A study on Kigali’s smart city initiatives, challenges, and future potential.",
    m_status: "ongoing",
    ratings: 4.6,
    created_at: "2024-03-15"
  },
  {
    id: 16,
    status: "published",
    title: "Sustainable Mining Practices in Rwanda",
    researcher: "Dr. Eric Nzabonimana",
    year: "2023",
    abstract: "A review of environmentally friendly mining practices and their economic impact.",
    m_status: "completed",
    ratings: 4.3,
    created_at: "2023-06-29"
  },
  {
    id: 17,
    status: "draft",
    title: "The Future of Telemedicine in Rwanda",
    researcher: "Dr. Emmanuel Niyibizi",
    year: "2024",
    abstract: "An evaluation of telemedicine adoption, challenges, and benefits in Rwanda’s healthcare sector.",
    m_status: "ongoing",
    ratings: 4.2,
    created_at: "2024-04-05"
  },
  {
    id: 18,
    status: "under review",
    title: "The Growth of E-Commerce in Rwanda",
    researcher: "Prof. Jane Mutoni",
    year: "2023",
    abstract: "This paper explores the rise of e-commerce businesses in Rwanda and their impact on traditional retail.",
    m_status: "ongoing",
    ratings: 4.7,
    created_at: "2023-12-11"
  }
];
*/
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
  return `${month}, ${day} ${year} ${hours}:${minutes}`;
}

const Researches = () => {
  const [researches, setResearches] = useState<Research[]>([]);
  const [activeBtn, setActiveBtn] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  if (!researches.length) {
    //return <Preloader />; // Show preloader if no researches are passed
  }

   //get search query form url
   const urlParams = new URLSearchParams(window.location.search);
   const query = urlParams.get("search");

  // Calculate total pages
  const totalPages = Math.ceil(researches.length / itemsPerPage);

  // Get researches for the current page
  const currentResearches = researches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination navigation
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  
   // Fetch Researches
   useEffect(() => {
    
    const fetchResearches = async () => {
      //get search query form url
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("search");
      setLoading(true);

      if (!query) {
        setError("No search query provided.");
        setLoading(false);
        return;
      }
     
      try {
        const response = await fetch(`/api/researches?search=${query}`);
        if (!response.ok) throw new Error("Failed to fetch researches");
        if (!response.ok) setError("No results found");
        
        const data = await response.json();
        setResearches(data);
        setLoading(false);

      } catch (error) {
        setError("An error occurred while fetching researches.");
      }
    };
    fetchResearches();
  }, []);

 const handleAbstract = (research: string, id: number) => {
    if (typeof window !== "undefined") { // ✅ Ensure it runs only on the client
      const abstract = document.getElementById("abstract"+id) as HTMLDivElement;
      if (abstract && research) {
        abstract.innerHTML = research;
      }
    }
  };
  useEffect(() => {
    currentResearches.map((research) => (
      handleAbstract(research.abstract, research.id)
    ))
  }, [currentResearches]);

  if (loading) {
    return (<div className="p-5 ml-[20vw] w-full min-h-[60vh]"><Preloader /></div>);
  }

  if (error) {
    return (<div className="p-5 ml-[20vw] w-full min-h-[60vh]"><div className="text-center text-red-500 py-20">{error}</div></div>);
  }

  if (researches.length === 0) {
    return (<div className="p-5 ml-[20vw] w-full min-h-[60vh]"><div className="text-center text-gray-500 py-20 text-xl">No results found for {'"'}<b>{query}</b>{'"'}.</div></div>);
  }
  return (
    <div className="p-5 ml-[20vw] w-full min-h-[60vh]">
      <h4 className="text-slate-400 font-semibold py-2">Results for {"\""+query+"\""}</h4>
      <div className="header">
        {headers.map((header, i) => (
          <button key={i} onClick={() => {setActiveBtn(i)}} className={`${activeBtn === i ? 'bg-white border border-slate-100 border-b-0' : '' } py-1 px-6 capitalize`}>{header.name}</button>
        ))}
      </div>
      <div className="flex flex-col py-2 space-y-2 w-full">
        {currentResearches.map((reseach, i) => (

        <Link key={i} href={`/w-page/view/${reseach.hashed_id}`} className="border w-full border-slate-200 rounded-lg py-2 px-5 hover:bg-slate-100 bg-white">
          <div className="font-medium text-teal-600">{reseach.title}</div>
          <div className="ratings space-x-3">
           <Ratings rating={reseach.ratings}/>
          </div>
          <div className="text-slate-500 text-sm py-2" id={`abstract${reseach.id}`}>{}</div>
          <div className="text-slate-600 u">{reseach.researcher} | {reseach.year} | {reseach.m_status} - Since {formatDate(reseach.created_at)}</div>
        </Link>
        ))}
            {/* Pagination Controls */}
<div className="flex justify-center items-center space-x-2 mt-4">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${
      currentPage === 1
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
    }`}
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${
        currentPage === index + 1
          ? "bg-teal-400 text-white border-teal-500"
          : "bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
      }`}
      onClick={() => handlePageChange(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${
      currentPage === totalPages
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
    }`}
  >
    Next
  </button>
</div>

       
      </div>
    </div>
  );
}
export default Researches;