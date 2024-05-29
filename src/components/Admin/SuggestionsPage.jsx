// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SuggestionsPage = () => {
  // State to store complaints data
  const [suggestions, setSuggestions] = useState([]);
  const [isAdmin,setIsAdmin]=useState(false);
  const [token,setToken]=useState("");

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    const decodedToken = jwtDecode(storedToken);
    setToken(storedToken);
    if(decodedToken.type==='PlatformAdmin')
      {
        setIsAdmin(true);
      }
  }
}, []);

  // Function to fetch complaints data
  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/admin/getSuggestions`
      ); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching Suggestions:', error);
    }
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  // Function to handle complaint deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}/admin/deleteSuggestion/${id}`,
      {
        headers: {
        Authorization: `Bearer ${token}`,
      }}
      ); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      // Filter out the deleted complaint from the state
      setSuggestions(suggestions.filter(suggestion => suggestion._id !== id));
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  if (!isAdmin) {
    return <div className="mt-[200px] mb-[200px] text-lg text-center font-bold">UnAuthorized Access </div>;
  }

  return (
    <div className="flex flex-col justify-center w-[50%] mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-6 text-green-500 m-auto">Complaints</h1>
      <div className="grid grid-cols-1 gap-4">
        {suggestions.map(suggestion => (
          <div key={suggestion._id} className="border p-4 shadow-md">
            <p className="mb-2"><strong>Name:</strong> {suggestion.name}</p>
            <p className="mb-2"><strong>Email:</strong> {suggestion.email}</p>
            <p className="mb-2"><strong>Complaint:</strong> {suggestion.complaint}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg transition duration-300"
              onClick={() => handleDelete(suggestion._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPage;
