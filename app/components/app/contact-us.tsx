import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const response = await fetch("/api/auth/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMsg("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMsg(data.error || "Failed to send message.");
      }
    } catch (error) {
      setResponseMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-50 p-3 sm:p-6 mt-[120px]">
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 sm:max-w-[80%] w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-teal-600 text-center mb-6">Contact us nationwide</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info & Locations */}
          <div className="space-y-6 bg-teal-100 p-6 rounded-xl shadow-lg">
            <h2 className="text-base sm:text-xl font-semibold text-teal-700 border-b-2 border-teal-400 pb-2">Our Locations</h2>
            <ul className="text-gray-600 space-y-3">
              <li className="flex text-sm sm:text-base items-center"><i className="bi bi-geo-alt-fill text-teal-600 mr-3"></i><strong className="mr-2">Kigali:</strong> Byimana C7, Kanombe</li>
            </ul>
            
            <h2 className="text-base sm:text-xl font-semibold text-teal-700 border-b-2 border-teal-400 pb-2">Phone & Email</h2>
            <p className="text-gray-600 flex items-center text-sm sm:text-base bg-white p-3 rounded-lg shadow-md"><i className="bi bi-telephone-fill text-teal-600 mr-3"></i> +250 781 121 117</p>
            <p className="text-gray-600 flex items-center text-sm sm:text-base bg-white p-3 rounded-lg shadow-md"><i className="bi bi-envelope-fill text-teal-600 mr-3"></i> support@kamero.rw</p>
            <p className="text-gray-600 flex items-center text-sm sm:text-base bg-white p-3 rounded-lg shadow-md"><i className="bi bi-globe text-teal-600 mr-3"></i> www.kamero.rw</p>
          </div>
          
          {/* Contact Form */}
          <div className="bg-teal-100 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-teal-700 mb-4">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full p-3 rounded-md border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full p-3 rounded-md border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        className="w-full p-3 rounded-md border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-teal-600 text-white font-semibold p-3 rounded-md hover:bg-teal-700 transition"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {responseMsg && <p className="text-center text-teal-700 mt-2">{responseMsg}</p>}
    </form>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-teal-700 text-center mb-4">Find Us on the Map</h2>
          <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center text-gray-700">
            [Network Error To Load Google Map]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;