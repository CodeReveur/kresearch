import { useState } from "react";

export default function PopupForm() {
  const [selectedRole, setSelectedRole] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleRedirect = (role: string) => {
    const urls: Record<string, string> = {
      student: "https://app.kamero.rw/auth/login?auth=0&uuid=unknown&type=",
      supervisor: "https://supervisor.kamero.rw/auth/login?auth=1&uuid=unknown&type=",
      institution: "https://onboarding.kamero.rw/auth/login?auth=0&uuid=unknown&type=",
    };
    if (urls[role]) {
      window.location.href = urls[role];
    }
  };

  return (
    isOpen && (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-30 backdrop-blur z-40" 
        onClick={() => setIsOpen(false)}
      >
        <div 
          className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center relative" 
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-6 text-teal-800">Select Your Role</h2>
          <form className="space-y-4">
            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-teal-100">
              <span className="text-gray-700">Student</span>
              <input
                type="radio"
                name="role"
                value="student"
                onChange={() => handleRedirect("student")}
                className="form-radio h-5 w-5 text-blue-600"
              />
            </label>
            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-teal-100">
              <span className="text-gray-700">Supervisor</span>
              <input
                type="radio"
                name="role"
                value="supervisor"
                onChange={() => handleRedirect("supervisor")}
                className="form-radio h-5 w-5 text-blue-600"
              />
            </label>
            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-teal-100">
              <span className="text-gray-700">Institution</span>
              <input
                type="radio"
                name="role"
                value="institution"
                onChange={() => handleRedirect("institution")}
                className="form-radio h-5 w-5 text-blue-600"
              />
            </label>
          </form>
        </div>
      </div>
    )
  );
}
