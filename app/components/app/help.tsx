import Link from "next/link";
import React, { useState } from "react";

const HelpPage = () => {
  const [showResearch, setShowResearch] = useState(false);
  
  const researchData = [
    {
      title: "AI in Environmental Science",
      year: 2023,
      abstract: "This research explores the role of artificial intelligence in environmental sustainability.",
      documentLink: "https://example.com/ai-research.pdf",
      institution: "Kamero Research Base"
    },
    {
      title: "Renewable Energy Innovations",
      year: 2022,
      abstract: "A study on the latest trends and developments in renewable energy sources.",
      documentLink: "https://example.com/energy.pdf",
      institution: "Kamero Research Base"
    }
  ];

  return (
    <div className="max-w-screen-lg mx-auto p-6 mt-[120px]">
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Help & Support</h1>
      
      {/* Help Topics */}
      <div className="space-y-4 mb-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">How to Sign Up?</h2>
          <p>Go to the <Link href={"/auth/join"} >Sign-Up page</Link>, enter your details click join, verify your email by entering verification on your email, and create an account.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">How to Sign In?</h2>
          <p>Click on Login form side bar and option role, Enter your email and password on the <Link href={"/auth/login"} >Log-in page</Link> to access your account.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">How to Search for Research?</h2>
          <p>Use the search bar to find research papers based on keywords, year, or institution.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">How to change password?</h2>
          <p>On the <Link href={"/auth/login"} >Log-in page</Link>, click on <a href="/auth/forgot-password"></a> verify email and change the password  of your account.</p>
        </div>
      </div>
      
      {/* Research Documentation with Hide/View Option */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-2">Research Documentation</h2>
        <button onClick={() => setShowResearch(!showResearch)} className="bg-teal-500 text-white px-4 py-2 rounded">
          {showResearch ? "Hide Research" : "View Research"}
        </button>
        {showResearch && (
          <div className="mt-4 space-y-4">
            {researchData.map((item, index) => (
              <div key={index} className="border p-4 rounded shadow-md">
                <h3 className="font-semibold text-teal-600">{item.title}</h3>
                <p><strong>Year:</strong> {item.year}</p>
                <p><strong>Abstract:</strong> {item.abstract}</p>
                <p><strong>Institution:</strong> {item.institution}</p>
                <a href={item.documentLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">View Document</a>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Need Help? Ask a Question Form */}
      <div className="bg-gray-100 p-6 rounded">
        <h2 className="text-xl font-semibold text-teal-600 mb-2">Need Help? Ask a Question</h2>
        <form>
          <textarea className="w-full p-2 border rounded mb-2" placeholder="Type your question here..." rows={4}></textarea>
          <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HelpPage;
