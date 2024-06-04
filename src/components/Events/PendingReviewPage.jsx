import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { useParams } from "react-router-dom";

const PendingReviewPage = () => {
  const { attendeeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Fetch token from local storage once when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/user/eventsForReview/${attendeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.events);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-36">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 pl-3">
          {events.length === 0 ? (
            <div className="grid col-span-full place-items-center mt-[60px] mb-[60px]">
              <div className="text-lg font-semibold font-mono">No pending events for review</div>
            </div>
          ) : (
            events.map((event, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
                <div className="flex items-center mb-2">
                  <img src={event.organizationImagePath || "https://via.placeholder.com/150"} alt="Organization Profile" className="w-8 h-8 rounded-full mr-2" />
                </div>
                <Link to={`/rating/${event.attendeeId}`} className="text-blue-500">Details</Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PendingReviewPage;
