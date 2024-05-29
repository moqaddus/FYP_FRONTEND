import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const EditUserForm = () => {

  const history=useHistory();
  const location = useLocation();

const { userId, name: Name = 'Update User Name', bio: Bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit..' } = location.state || {};




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
  }, [userId, tokenId]); // Add userId and tokenId as dependencies

  const [formData, setFormData] = useState({
    Name: Name,
    Bio: Bio,
    // ali commented it may 5
    //Interests: ['Programming', 'Travel', 'Photography'], // Hardcoded interests
  });

  useEffect(() => {
    const { name, bio } = location.state || {};
    if (name && bio) {
      setFormData({ Name: name, Bio: bio });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleInterestRemove = (interestToRemove) => {
  //   const updatedInterests = formData.Interests.filter(interest => interest !== interestToRemove);
  //   setFormData({ ...formData, Interests: updatedInterests });
  // };

  // const handleAddInterest = (newInterest) => {
  //   setFormData({ ...formData, Interests: [...formData.Interests, newInterest] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API endpoint
      const response = await axios.patch(`${import.meta.env.VITE_API_KEY}/user/update/user/`, formData ,{
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

  if(!showPage)
    {
      return <div className='mt-[200px] mb-[300px] font-extrabold text-center'>UnAuthorized Access</div>;
    }

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
              // required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="Bio"
              value={formData.Bio}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              // required
            ></textarea>
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Interests
            </label>
            <div className="flex flex-wrap">
              {formData.Interests.map((interest, index) => (
                <div key={index} className="bg-blue-500 text-white rounded-full px-2 py-1 mr-2 mb-2 flex items-center">
                  <span>{interest}</span>
                  <button type="button" onClick={() => handleInterestRemove(interest)} className="ml-2 focus:outline-none">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 12.586l3.293-3.293a1 1 0 011.414 1.414L11.414 14l3.293 3.293a1 1 0 01-1.414 1.414L10 15.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 14 5.293 10.707a1 1 0 011.414-1.414L10 12.586z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="newInterest" className="block text-sm font-medium text-gray-700">
              Add Interest
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="newInterest"
                name="newInterest"
                className="mt-1 p-2 flex-grow border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter interest"
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md ml-2"
                onClick={() => handleAddInterest(document.getElementById('newInterest').value)}
              >
                Add
              </button>
            </div>
          </div> */}
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

export default EditUserForm;
