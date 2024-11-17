"use client";
import React, { useState } from "react";

interface FormProps {
  onNext: ((data: Record<string, any>) => void) & (() => void);
  onBack?: () => void;
  formData: Record<string, any>;
}

const UniversityRegForm1: React.FC<FormProps> = ({ onNext, onBack, formData }) => {
  const [focus, setFocus] = useState<Record<string, boolean>>({});
  const [data, setData] = useState(formData || { name: "", address: "", profilePicture: null });

  const handleFocus = (field: string) => setFocus({ ...focus, [field]: true });
  const handleBlur = (field: string, value: string) =>
    setFocus({ ...focus, [field]: value.trim().length > 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(data); // Pass the updated form data to the next step
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
          University Registration
        </h2>

        {/* Form */}
        <form className="space-y-6 px-8" onSubmit={handleSubmit}>
          {/* Row 1: Name */}
          <div className="relative">
            <label
              htmlFor="name"
              className={`absolute left-3 text-gray-500 transition-all duration-300 ${focus["name"] ? "top-[-10px] text-sm bg-white px-1" : "top-3 text-base"}`}
            >
              University name<span className="text-red-500"> *</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full border-b border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none transition-colors"
              onFocus={() => handleFocus("name")}
              onBlur={(e) => handleBlur("name", e.target.value)}
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2: Headquarters address */}
          <div className="relative">
            <label
              htmlFor="address"
              className={`absolute left-3 text-gray-500 transition-all duration-300 ${focus["address"] ? "top-[-10px] text-sm bg-white px-1" : "top-3 text-base"}`}
            >
              Headquarters address<span className="text-red-500"> *</span>
            </label>
            <input
              id="address"
              type="text"
              className="w-full border-b border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none transition-colors"
              onFocus={() => handleFocus("address")}
              onBlur={(e) => handleBlur("address", e.target.value)}
              value={data.address}
              onChange={handleChange}
              required
            />
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
                Click file upload button to upload university logo
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Support for a single file. Supported formats: .png, .jpg, .svg, .gif
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            {onBack && (
              <button
                type="button"
                className="w-[120px] border border-teal-300 text-teal-400 py-2 rounded-md hover:bg-teal-100 transition-all duration-300"
                onClick={onBack}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="w-[120px] border border-teal-300 text-teal-400 py-2 rounded-md hover:bg-teal-100 transition-all duration-300"
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

export default UniversityRegForm1;
