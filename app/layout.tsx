"use client"; 

import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Footer from "./pages/footer";


const manipulateUrl = (url: string) => {
  // Remove the '/iooio/' prefix
    let query = "";
      // Get search query from URL and set the id
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const kay = urlParams.get("search");
        if (kay) {
          query = ""+kay;
        }
      }

  if(url.startsWith('/w-page/result')){
    url = url.replace('/w-page/result?search=', '');
    url = 'Search - \"'+query+'\" ';
  }else if(url.startsWith('/w-page/')){
    url = url.replace('/w-page/', '');
  }else{
    url = "Kamero Research Base"; 
  }

  // Capitalize the first letter of the remaining word
  const capitalized = url.charAt(0).toUpperCase() + url.slice(1);

  return capitalized;
};

const hideFooter = (url: string): any => {
  if(url.startsWith('/w-page/auth')){
    return true;
  }else{
    return false;
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const path = usePathname();
  const pathTitle = manipulateUrl(path);
  const [pageTitle, setPageTitle] = useState<string>(pathTitle); // State for dynamic page title

  const hide = hideFooter(path);

  return (
    <html lang="en">
       <head>
        <title>{pageTitle}</title> 
        <link 
          rel="shortcut icon" 
          href="/logo.svg" 
          type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />


       </head>
     
      <body>
        {children}
       
      </body>
      
    </html>
  );
}
