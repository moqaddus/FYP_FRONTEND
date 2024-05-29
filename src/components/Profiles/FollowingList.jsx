import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // or 'react-router' if you're using a different version

const List = ({ id }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory(); // Hook for navigation

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/user/followersOfUser/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrganizations(response.data.organizations); // Update to correctly access the organizations array
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError('Failed to fetch organizations');
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [id]);

  const handleOrganizationClick = (orgId) => {
    history.push(`/orgProfile/${orgId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="fixed inset-0 overflow-y-auto bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[30%] list-container">
          <div className="bg-gray-100 rounded-xl shadow-md p-4 max-h-[450px] overflow-y-auto">
            {Array.isArray(organizations) && organizations.map((org) => (
              <div
                key={org.id}
                className="organization flex flex-col items-center mb-4 cursor-pointer"
                onClick={() => handleOrganizationClick(org.id)}
              >
                <img src={org.imagePath || "https://via.placeholder.com/300"} alt={org.name || "No name"} className="w-10 h-10 rounded-full mb-2" />
                <span className="name text-lg">{org.name || "No name"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
