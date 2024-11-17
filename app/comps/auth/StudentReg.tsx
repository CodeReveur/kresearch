"use client";
import React, { useState } from "react";

const StudentRegForm: React.FC = () => {
  const [focus, setFocus] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    profilePicture: null as File | null,
  });

  const handleFocus = (field: string) => setFocus({ ...focus, [field]: true });
  const handleBlur = (field: string, value: string) =>
    setFocus({ ...focus, [field]: value.trim().length > 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining ensures 'files' exists
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("phone", formData.phone);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const response = await fetch("/api/auth/student/reg", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`Failed to register: ${response.statusText}`);
      }

      const result = await response.json();
      alert("Registration successful!"); // Replace with your preferred UI feedback
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
        <h2 className="text-center text-lg font-normal text-gray-600 mb-8 px-2">
          Welcome to Kamero Research Base, sign up here
        </h2>

        {/* Form */}
        <form className="space-y-6 px-8" onSubmit={handleSubmit}>
          {/* Row 1: First and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "firstName", label: "First Name", type: "text" },
              { id: "lastName", label: "Other Names", type: "text" },
            ].map((field) => (
              <div key={field.id} className="relative">
                <label
                  htmlFor={field.id}
                  className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                    focus[field.id]
                      ? "top-[-10px] text-sm bg-white px-1"
                      : "top-3 text-base"
                  }`}
                >
                  {field.label}
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  className="w-full border-b border-gray-300 px-3 py-2 focus:border-teal-400 focus:outline-none transition-colors"
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
                  : "top-3 text-base"
              }`}
            >
              Email<span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full border-b border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none transition-colors"
              onFocus={() => handleFocus("email")}
              onBlur={(e) => handleBlur("email", e.target.value)}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 3: Country and Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label
                htmlFor="country"
                className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                  focus["country"]
                    ? "top-[-10px] text-sm bg-white px-1"
                    : "top-3 text-base"
                }`}
              >
                Select a country<span className="text-red-500"> *</span>
              </label>
              <select
                id="country"
                className="w-full border-b border-gray-300 px-3 py-2 bg-transparen2 focus:border-teal-500 focus:outline-none appearance-none transition-colors"
                onFocus={() => handleFocus("country")}
                onBlur={(e) => handleBlur("country", e.target.value)}
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="+250">Rwanda</option>
                <option value="+1">United States</option>
              </select>
            </div>

            <div className="relative">
              <label
                htmlFor="phone"
                className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                  focus["phone"]
                    ? "top-[-10px] text-sm bg-white px-1"
                    : "top-3 text-base"
                }`}
              >
                Phone Number<span className="text-red-500"> *</span>
              </label>
              <input
                id="phone"
                type="text"
                className="w-full border-b border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none transition-colors"
                onFocus={() => handleFocus("phone")}
                onBlur={(e) => handleBlur("phone", e.target.value)}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 4: Profile Picture Upload */}
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
            <div className="mt-1 border border-gray-300 bg-gray-100 rounded-lg p-4 text-center flex flex-col justify-center">
              <label
                htmlFor="profilePicture"
                className="py-4 px-6 border-2 border-dashed rounded-lg mx-auto w-min h-min text-center cursor-pointer"
              >
                <i className="bi bi-upload tex-xl"></i>
              </label>
              <label
                htmlFor="profilePicture"
                className="text-slate-500 cursor-pointer hover:text-teal-300"
              >
                Click file upload button to upload your profile picture
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Support for a single file. Supported formats: .png, .jpg, .svg,
                .gif
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-[120px] border border-teal-300 text-teal-400 py-2 rounded-md hover:bg-teal-100 transition-all duration-300"
            >
              Sign Up
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

export default StudentRegForm;
