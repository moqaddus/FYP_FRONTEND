import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Import a spinner component

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [organizationUsername, setOrganizationUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserTypeAndEvents = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        // Fetch user type
        const userTypeResponse = await axios.get(`${import.meta.env.VITE_API_KEY}/user/getType`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        // Extract user type from the response
        const userType = userTypeResponse.data.type;
  
        if (userType === "PlatformUser") {
          // Fetch data from http://localhost:5000/user/getAllEvents endpoint
          const responseByInterest = await axios.get(`${import.meta.env.VITE_API_KEY}/user/getAllEvents`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setOrganizationUsername(responseByInterest.data.organizationUsername);
          setEvents(responseByInterest.data.events);
          setUserType(userType); // Set the user type
        } else if (userType === "OrgAdmin") {
          // Fetch data from http://localhost:5000/Organization/getEvents endpoint
          const responseByOrg = await axios.get(`${import.meta.env.VITE_API_KEY}/Organization/getEvents`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setOrganizationUsername(responseByOrg.data.organizationUsername);
          setEvents(responseByOrg.data.events);
          setUserType(userType); // Set the user type
        }

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user type or events:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };
  
    fetchUserTypeAndEvents();
  }, []);

  const handleUserFollowedEventsClick = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data

      // Fetch UserFollowedEvents
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/user/getEvents/OrganizationFollowed`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrganizationUsername(response.data.organizationUsername);
      setEvents(response.data.events);

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching UserFollowedEvents:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleInterestEventsClick = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data

      // Fetch InterestEvents
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/user/getAllEvents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrganizationUsername(response.data.organizationUsername);
      setEvents(response.data.events);

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching InterestEvents:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div className="mt-36">
      <h1 className="text-2xl font-bold mb-4">{organizationUsername}</h1>
      <h2 className="text-lg font-semibold mb-4">User Type: {userType}</h2>
      <div className="flex justify-center mb-4">
        {userType === 'PlatformUser' && (
          <div className="flex space-x-4">
            <button onClick={handleUserFollowedEventsClick} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-orange-600">UserFollowedEvents</button>
            <button onClick={handleInterestEventsClick} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-orange-900 focus:outline-none focus:bg-green-600">InterestEvents</button>
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
          {events.map((event, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">{event.Name}</h2>
              <div className="flex items-center mb-2">
                <img src="https://via.placeholder.com/150" alt="Organization Profile" className="w-8 h-8 rounded-full mr-2" />
                <span className="text-gray-700">{event.organization[0].Username}</span>
              </div>
              <Link to={`/singleEvent/${event._id}`} className="text-blue-500">Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
