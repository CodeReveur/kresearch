"use client";
import React, { useState, useEffect } from "react";

interface UniversityRegForm3Props {
  onPrev: () => void;
  onNext: ((data: Record<string, any>) => void) & (() => void);
  formData: {
    name: string;
    address: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    address: string;
  }>>;
}

const UniversityRegForm3: React.FC<UniversityRegForm3Props> = ({ onPrev, onNext, formData, setFormData }) => {
  const [focus, setFocus] = useState<Record<string, boolean>>({});

  // Managing focus state
  const handleFocus = (field: string) => setFocus({ ...focus, [field]: true });
  const handleBlur = (field: string, value: string) =>
    setFocus({ ...focus, [field]: value.trim().length > 0 });

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("collegeName", formData.name);
      formDataToSend.append("address", formData.address);
     

      const response = await fetch("/api/auth/university/reg", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`Failed to register: ${response.statusText}`);
      }

      const result = await response.json();
      alert("Registration successful!");
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-5 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg py-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full shadow-lg shadow-teal-100 bg-indigo-100">
            <img src="/avatar.jpg" alt="Logo" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-center text-md font-normal text-gray-600 mb-8 px-2">
          University Registration {'>'} Add a college {'>'} Add School
        </h2>

        {/* Form */}
        <form className="space-y-6 px-8" onSubmit={handleSubmit}>
          {/* Row 1: Profile Picture */}
          <div className="w-full text-right">
            <i className="bi bi-plus px-[6px] py-1 rounded-full border text-lg text-slate-400"></i>
          </div>
          
          {/* Row 2: College Name */}
          <div className="relative">
            <label
              htmlFor="name"
              className={`absolute left-3 text-gray-500 transition-all duration-300 ${focus["name"] ? "top-[-10px] text-sm bg-white px-1" : "top-3 text-base"}`}
            >
              College Name<span className="text-red-500"> *</span>
            </label>
            <select
              id="name"
              className="w-full border-b border-gray-300 px-3 py-2 bg-transparent focus:border-teal-500 focus:outline-none appearance-none transition-colors"
              onFocus={() => handleFocus("name")}
              onBlur={(e) => handleBlur("name", e.target.value)}
              value={formData.name}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="College 1">College 1</option>
              <option value="College 2">College 2</option>
            </select>
          </div>

          {/* Row 3: Headquarter Address */}
          <div className="relative">
            <label
              htmlFor="address"
              className={`absolute left-3 text-gray-500 transition-all duration-300 ${focus["address"] ? "top-[-10px] text-sm bg-white px-1" : "top-3 text-base"}`}
            >
              School Name<span className="text-red-500"> *</span>
            </label>
            <input
              id="address"
              type="text"
              className="w-full border-b border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none transition-colors"
              onFocus={() => handleFocus("address")}
              onBlur={(e) => handleBlur("address", e.target.value)}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

         

          {/* Navigation Buttons */}
          <div className="text-center mt-6">
            <button
              type="button"
              className="w-[120px] border border-teal-300 text-teal-400 py-2 rounded-md hover:bg-teal-100 transition-all duration-300 mr-2"
              onClick={onPrev}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-[120px] border border-teal-300 text-teal-400 py-2 rounded-md hover:bg-teal-100 transition-all duration-300"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 border-t border-teal-300 mt-6 py-2">
          © 2023 - 2024 Kamero Research Base
        </p>
      </div>
    </div>
  );
};

export default UniversityRegForm3;
