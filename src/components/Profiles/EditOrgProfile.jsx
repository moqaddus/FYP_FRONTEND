import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';





const EditOrganizationForm = () => {

  const history=useHistory();
  const location = useLocation();

  const { userId, name: Name = 'Update User Name', description: Description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..' } = location.state || {};
  
  const[token,setToken]=useState('');
  const [tokenId,setTokenId]=useState('');
  const[showPage,setShowPage]=useState(false);

  useEffect(() => {
    // Fetch token from local storage once when the component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setTokenId(decodedToken.id);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (userId && tokenId) { // Check if both userId and tokenId are not null
      if (userId === tokenId) {
        setShowPage(true);
      }
    }
  }, [userId, tokenId]); 

  const [formData, setFormData] = useState({
    Name: Name,
    Description: Description
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API endpoint
      const response = await axios.patch(`${import.meta.env.VITE_API_KEY}/Organization/update/org/`, formData ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      
      );
      console.log(response.data); // Log the response from the backend
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your information has been updated successfully.',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirect to previous page
        history.goBack();
      });
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating your information. Please try again later.',
        confirmButtonText: 'OK'
      });
      
    }
  };

  return (
    <div className=" mt-28">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Information</h2>

      <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
        </div>
        

        {/* Add other form fields similarly */}
        <div className='flex justify-center'>
        <button type="submit" className=" bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600">
            Save Changes
          </button>
        </div>
      </form>
    </div>
        
    </div>
  );
};

export default EditOrganizationForm;
