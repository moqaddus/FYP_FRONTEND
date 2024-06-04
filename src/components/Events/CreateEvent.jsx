import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { MdKeyboardArrowDown } from 'react-icons/md'; // Import the arrow down icon

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    EventDate: '',
    StartTime: '',
    EndTime: '',
    Location: '',
    TotalTickets: 0, // Provide default value for numeric fields
    TicketPrice: 0, // Provide default value for numeric fields
    Status: 'Approved', // Default status
    EventTag: '',
  });

  const [showEventTagDropdown, setShowEventTagDropdown] = useState(false); // State to control the display of the EventTag dropdown
  const [eventTags, setEventTags] = useState([]); // State to store fetched event tags
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch all interests when the component mounts
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/interest/get`);
        setEventTags(response.data);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
  
    fetchInterests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check for positive values in TotalTickets and TicketPrice
    if ((name === 'TotalTickets' || name === 'TicketPrice') && value < 0) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate positive values for TotalTickets and TicketPrice
    if (formData.TotalTickets <= 0 || formData.TicketPrice <= 0) {
      setErrorMessage('Total Tickets and Ticket Price must be positive values');
      setSuccessMessage(''); // Clear previous success message
      return;
    }

    // Validate EventDate is not the current date
    const today = new Date().toISOString().split('T')[0];
    if (formData.EventDate <= today) {
      setErrorMessage('Event date must be in the future');
      setSuccessMessage('');
      return;
    }

    // Validate EndTime is not smaller than StartTime
    if (formData.EndTime <= formData.StartTime) {
      setErrorMessage('End time must be after start time');
      setSuccessMessage('');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found');
        setSuccessMessage(''); // Clear previous success message
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/Events/Register`, formData, config);
      setSuccessMessage('Event created successfully');
      setErrorMessage(''); // Clear previous error message
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Error creating event');
      setSuccessMessage(''); // Clear previous success message
      console.error('Error:', error);
    }
  };
  
  const handleToggleEventTagDropdown = () => {
    setShowEventTagDropdown(!showEventTagDropdown);
  };

  const handleEventTagSelection = (eventTag) => {
    setFormData({ ...formData, EventTag: eventTag });
    setShowEventTagDropdown(false);
  };

  return (
    <div className="mt-28">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Event</h2>

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
          <div className="mb-4">
            <label>
              Event Date:
              <input type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Start Time:
              <input type="time" name="StartTime" value={formData.StartTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </label>
          </div>
          <div className="mb-4">
            <label>
              End Time:
              <input type="time" name="EndTime" value={formData.EndTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Location:
              <input type="text" name="Location" value={formData.Location} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Total Tickets:
              <input type="number" name="TotalTickets" value={formData.TotalTickets} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Ticket Price:
              <input type="number" name="TicketPrice" value={formData.TicketPrice} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </label>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="EventTag" className="block text-sm font-medium text-gray-700">
              EventTag
            </label>
            <div className="relative">
              <input
                type="text"
                id="EventTag"
                name="EventTag"
                value={formData.EventTag}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Select or type EventTag"
              />
              <div
                className="absolute right-2 top-2 cursor-pointer"
                onClick={handleToggleEventTagDropdown}
              >
                <MdKeyboardArrowDown />
              </div>
              {showEventTagDropdown && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-300 z-10 max-h-96 overflow-y-auto">
                  {eventTags.map((eventTag) => (
                    <div
                      key={eventTag._id} // Assuming each interest has a unique ID
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleEventTagSelection(eventTag.Name)}
                    >
                      {eventTag.Name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {errorMessage}</span>
            </div>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
