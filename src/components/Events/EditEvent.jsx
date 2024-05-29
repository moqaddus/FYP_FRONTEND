import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditEventForm = () => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    Description: "",
    Location: "",
    EventDate: "",
    StartTime: "",
    EndTime: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
           const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/Events/GetSingleEvent/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const eventData = response.data.event;
        setFormData({
          Description: eventData.Description,
          Location: eventData.Location,
          EventDate: eventData.EventDate.substring(0, 10),
          StartTime: eventData.StartTime,
          EndTime: eventData.EndTime,
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_KEY}/Events/Update/${eventId}`,
        formData,
        config
      );
      console.log(response.data);

      history.push(`/singleEvent/${eventId}`);
    } catch (error) {
      setErrorMessage("Error updating event");
      console.error("Error:", error);
    }
  };
  return (
    <div className="mt-28">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Event</h2>

      <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {/* Form fields... */}

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
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
          <div className="mb-4">
            <label>
              Event Date:
              <input
                type="date"
                name="EventDate"
                value={formData.EventDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Start Time:
              <input
                type="time"
                name="StartTime"
                value={formData.StartTime}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label>
              End Time:
              <input
                type="time"
                name="EndTime"
                value={formData.EndTime}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Location:
              <input
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
