
"use client";
import { Verify } from "crypto";
import React, { useEffect, useState } from "react";
import VerifyForm from "./verify";
import Link from "next/link";

interface Departments {
  id: number;
  name: string;
  institute: string;
  school: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  department: string;
  profilePicture: File | null;
}

const JoinForm = () => { 

  const [focus, setFocus] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    profilePicture: null,
  });
  const [departments, setDepartments] = useState<Departments[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [hashed, setHashedId] = useState("");

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        setError("An error occurred while fetching departments.");
      }
    };
    fetchDepartments();
  }, []);


  const handleFocus = (field: string) =>
    setFocus((prev) => ({ ...prev, [field]: true }));

  const handleBlur = (field: string, value: string) =>
    setFocus((prev) => ({ ...prev, [field]: value.trim().length > 0 }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value as string);
    });
    if (file) {
      payload.append("profilePicture", file);
    } else {
      setError("Profile picture require! Please select")
    }

    try {
      const response = await fetch("/api/add/students", {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        setSuccess("Registration successful!");
        const data = await response.json();
        setHashedId(data.student.hashed_id);
        setFile(null);
      } else {
        const error = await response.json();
        setError(`${error.error}`);
      }
    } catch (error) {
      setError(`Submission failed. ${(error as Error).message}`);
    }
  };

    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileNameDisplay = document.getElementById("file-name");
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prev) => ({ ...prev, logo: file }));
        setFile(file);
        if (fileNameDisplay) {
          fileNameDisplay.textContent = file.name;
        }
      }
    };
    
    if(success.includes("success") && hashed !== ""){
      return <VerifyForm hashed={hashed} email={formData.email}/>
    }

  return (
    <div className="min-h-screen py-5 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg py-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full shadow-lg shadow-teal-100 bg-indigo-100">
            <img src="/logo.svg" alt="Logo" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-center text-xl font-medium text-teal-600 mb-6 px-2">
          Welcome to Kamero Research Base, join us
        </h2>

        {/* Form */}
        <form className="space-y-4 px-8" onSubmit={handleSubmit}>
        {success || error && (
          <div
          className={`${success.includes('success') ? 'bg-green-100 text-green-500 border-green-300' : 'bg-red-100 text-red-500 border-red-300'} p-4 rounded-md`}
          >
            {success ? success : error ? error : ""}
          </div>
        )}
          {/* Row 1: First and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "first_name", label: "First Name", type: "text" },
              { id: "last_name", label: "Other Names", type: "text" },
            ].map((field) => (
              <div key={field.id} className="relative">
                <label
                  htmlFor={field.id}
                  className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                    focus[field.id]
                      ? "top-[-10px] text-sm bg-white px-1"
                      : "top-2 text-base"
                  }`}
                >
                  {field.label}
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-400 focus:outline-none transition-colors"
                  onFocus={() => handleFocus(field.id)}
                  onBlur={(e) => handleBlur(field.id, e.target.value)}
                  value={(formData as any)[field.id]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

           {/* Row 2: Email */}
           <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                focus["email"]
                  ? "top-[-10px] text-sm bg-white px-1"
                  : "top-2 text-base"
              }`}
            >
              Email<span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-400 focus:outline-none transition-colors"
              onFocus={() => handleFocus("email")}
              onBlur={(e) => handleBlur("email", e.target.value)}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

           {/* Row 3: password and Phone */}
           <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label
                htmlFor="phone"
                className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                  focus["phone"]
                    ? "top-[-10px] text-sm bg-white px-1"
                    : "top-2 text-base"
                }`}
              >
                Phone Number<span className="text-red-500"> *</span>
              </label>
              <input
                id="phone"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-400 focus:outline-none transition-colors"
                onFocus={() => handleFocus("phone")}
                onBlur={(e) => handleBlur("phone", e.target.value)}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                  focus["password"]
                    ? "top-[-10px] text-sm bg-white px-1"
                    : "top-2 text-base"
                }`}
              >
                Password<span className="text-red-500"> *</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-400 focus:outline-none transition-colors"
                onFocus={() => handleFocus("password")}
                onBlur={(e) => handleBlur("password", e.target.value)}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/** department */}
          <div className="relative">
              <label
                htmlFor="department"
                className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                  focus["department"]
                    ? "top-[-10px] text-sm bg-white px-1"
                    : "top-2 text-base"
                }`}
              >
                Department<span className="text-red-500"> *</span>
              </label>
              <select
                id="department"
                className="w-full border rounded-md border-gray-300 px-3 py-2 bg-transparen2 focus:border-teal-500 focus:outline-none appearance-none transition-colors"
                onFocus={() => handleFocus("department")}
                onBlur={(e) => handleBlur("department", e.target.value)}
                value={formData.department}
                onChange={handleChange}
                required
              >
               <option value=""></option>
               {departments.map((department) =>(
                <option key={department.id} value={department.id}>{department.name +" - " + department.school + " - " + department.institute}</option>
               ))}
              </select>
            </div>
             {/* Row 3: Profile Picture Upload */}
          <div className="relative mb-6">
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept=".png, .jpg, .svg, .gif"
              onFocus={() => handleFocus("profilePicture")}
              onBlur={(e) => handleBlur("profilePicture", e.target.value)}
              onChange={handleFileChange}
              required
            />
            <div className="mt-1 border border-gray-300 bg-gray-100 rounded-lg py-2 text-center flex flex-col justify-center">
              <label
                htmlFor="profilePicture"
                className="py-1 px-5 border text-gray-400 border-dashed rounded-md mx-auto w-min h-min text-center cursor-pointer border-teal-500"
              >
                <i className="bi bi-upload tex-xl"></i>
              </label>
              <label
                htmlFor="profilePicture"
                className="cursor-pointer text-teal-600 hover:text-teal-300"
              >
                Click here to upload profile picture
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Support for a single file. Supported formats: .png, .jpg, .svg, .gif
              </p>
              <span id="file-name" className="text-base font-semibold py-2"></span>
            </div>
          </div>
           
             {/* Submit Button */}
            <div className="text-center">
             <button
              type="submit"
              className="w-[150px] border border-teal-400 text-teal-500 py-2 rounded-md hover:bg-teal-100 transition-all duration-300"
             >
              Sign Up
             </button>
            </div>
       
            <div className="relative flex flex-col justify-center space-y-1 text-center">
              <Link href={"https://krbdash.vercel.app/auth/login"} className="text-sm text-teal-600"><span className="text-slate-500">Already joined?</span> Sign in</Link>
            </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 border-t border-teal-300 mt-3 py-2">
          © 2023 - 2024 Kamero Research Base
        </p>
      </div>
    </div>
  );
};

export default JoinForm;
