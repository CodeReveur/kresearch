"use client";
import React, { useState } from "react";
import UniversityRegForm1 from "@/app/comps/auth/UniversityRegForm1";
import UniversityRegForm2 from "@/app/comps/auth/UniversityRegForm2";
import UniversityRegForm3 from "@/app/comps/auth/UniversityRegForm3";
import UniversityRegForm4 from "@/app/comps/auth/UniversityRegForm4";

// Defining the types for the form data
interface FormData {
  step1: Record<string, any>;
  step2: Record<string, any>;
  step3: Record<string, any>;
  step4: Record<string, any>;
}

const forms = [
  UniversityRegForm1,
  UniversityRegForm2,
  UniversityRegForm3,
  UniversityRegForm4,
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });

  const FormComponent = forms[currentStep];

  // Handle the Next button functionality
  const handleNext = (data: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      [`step${currentStep + 1}`]: data,
    }));
    setCurrentStep((prev) => prev + 1);
  };

  // Handle the Back button functionality
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handle the final submit after the last form step
  const handleFinalSubmit = async () => {
    const allData = {
      ...formData.step1,
      ...formData.step2,
      ...formData.step3,
      ...formData.step4,
    };

    try {
      const response = await fetch("/api/auth/university/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      alert("Registration complete!");
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen">
      <head>
        <title>University Registration</title>
      </head>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-2 mb-6">
        <div
          className="bg-teal-400 h-2"
          style={{ width: `${((currentStep + 1) / forms.length) * 100}%` }}
        ></div>
      </div>

      {/* Form Component */}
      <FormComponent
        onNext={currentStep < forms.length - 1 ? handleNext : handleFinalSubmit}
        onPrev={currentStep > 0 ? handleBack : undefined}
        formData={formData[`step${currentStep + 1}`]}
      />
    </div>
  );
}
