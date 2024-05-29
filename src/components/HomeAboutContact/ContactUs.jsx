import React, { useState } from "react";
import axios from 'axios';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); 

    try {
      axios.post(`${import.meta.env.VITE_API_KEY}/contactUs/complaints/`, formData);
      console.log('Complaint submitted successfully');
      setSuccessMessage("Complaint/Suggestion submitted successfully");
      setErrorMessage(""); // Clear any previous error message


      // Optionally, you can reset the form after submission
      setFormData({
        name: '',
        email: '',
        complaint: '',
      });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setSuccessMessage(""); // Clear any previous success message
      setErrorMessage("Failed to submit complaint. Please try again.");
    } // You can replace this with your desired logic
  };

  return (
    <div className="max-w-sm md:max-w-md mx-auto mt-[120px] p-4  bg-white rounded-lg shadow-xl shadow-gray-300">
      <h2 className="text-4xl text-green-700 font-bold mb-7 text-center">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            className="w-[90%] px-3 py-2 rounded-lg border-gray-200 border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your valid Email Address"
            className=" w-[90%] px-3 py-2 rounded-lg border-gray-200 border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-5">
          <textarea
            id="complaint"
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            placeholder="Enter your Suggestion for Interests or Any Complaint"
            rows="4"
            className=" w-[90%] px-3 py-2 rounded-lg border-gray-200 border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="mt-4 text-center text-green-600">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 text-center text-red-600">
          {errorMessage}
        </div>
      )}

    </div>
  );
};

export default ContactUs;
