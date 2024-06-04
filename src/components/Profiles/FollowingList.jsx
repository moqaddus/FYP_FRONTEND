import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const List = ({ id, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === 'PlatformUser') {
          response = await axios.get(`${import.meta.env.VITE_API_KEY}/user/followersOfUser/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setData(response.data.organizations);
        } else if (type === 'OrgAdmin') {
          response = await axios.get(`${import.meta.env.VITE_API_KEY}/Organization/followersOfOrganization/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setData(response.data.followers);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  const handleClick = (Id) => {
    if (type === 'PlatformUser') {
      history.push(`/orgProfile/${Id}`);
    } else if (type === 'OrgAdmin') {
      history.push(`/userProfile/${Id}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-1/3 list-container">
        <div className="bg-gray-100 rounded-xl shadow-md p-4 max-h-96 overflow-y-auto">
          {Array.isArray(data) && data.map((item) => (
            <div
              key={item.id} // Ensure the key is correct and matches the data structure
              className="organization flex flex-col items-center mb-4 cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <img src={item.imagePath || "https://via.placeholder.com/300"} alt={item.name || "No name"} className="w-10 h-10 rounded-full mb-2" />
              <span className="name text-lg">{item.name || "No name"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;

