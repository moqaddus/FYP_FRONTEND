import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddInterest = () => {
  const [interest, setInterest] = useState('');
  const token = 'your_token_here'; // Replace with actual token

  const handleInputChange = (e) => {
    setInterest(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/admin/addInterest`, { interest }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await Swal.fire({
        icon: 'success',
        title: 'Interest Added Successfully!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });

      setInterest('');
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: error.response?.data?.message || 'An error occurred',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Add Interest</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          value={interest}
          onChange={handleInputChange}
          placeholder="Enter interest"
          className="p-3 mb-4 w-full border border-gray-300 rounded-lg text-lg"
        />
        <button type="submit" className="p-3 bg-orange-400 text-white rounded-lg text-lg w-[40%] hover:bg-orange-500 transition duration-300">
          Add Interest
        </button>
      </form>
    </div>
  );
};

export default AddInterest;
