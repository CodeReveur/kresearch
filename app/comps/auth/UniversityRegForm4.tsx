"use client";
import React, { useState } from "react";

interface UniversityRegForm4Props {
  onNext: ((data: Record<string, any>) => void) & (() => void);
  onPrev: () => void;
  formData: Record<string, any>;
}

const UniversityRegForm4: React.FC<UniversityRegForm4Props> = ({
  onNext,
  onPrev,
  formData,
}) => {
  const [focus, setFocus] = useState<Record<string, boolean>>({});
  const [localFormData, setLocalFormData] = useState({
    department: formData?.department || "", // Only department field
  });

  const handleFocus = (field: string) => setFocus({ ...focus, [field]: true });
  const handleBlur = (field: string, value: string) =>
    setFocus({ ...focus, [field]: value.trim().length > 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // When form is submitted, pass the department data to the parent component via onNext
    onNext(localFormData);
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
        <h2 className="text-center text-sm font-normal text-gray-600 mb-8 px-2">
          University Registration {'>'} Add Department
        </h2>

        {/* Form */}
        <form className="space-y-6 px-8" onSubmit={handleSubmit}>
          {/* Department Name */}
          <div className="relative">
            <label
              htmlFor="department"
              className={`absolute left-3 text-gray-500 transition-all duration-300 ${
                focus["department"]
                  ? "top-[-10px] text-sm bg-white px-1"
                  : "top-3 text-base"
              }`}
            >
              Department Name<span className="text-red-500"> *</span>
            </label>
            <input
              id="department"
              type="text"
              className="w-full border-b border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none transition-colors"
              onFocus={() => handleFocus("department")}
              onBlur={(e) => handleBlur("department", e.target.value)}
              value={localFormData.department}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
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
            >
              Register
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

export default UniversityRegForm4;
