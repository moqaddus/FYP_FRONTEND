import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AverageReview from "./AverageReview";
import { ClipLoader } from "react-spinners";

// Define fetchEventImages outside the component
const fetchEventImages = async (eventId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/Events/getImage/${eventId}`
    );
    return response.data.images;
  } catch (error) {
    console.error("Error fetching event images:", error);
    return [];
  }
};

const SingleEvent = () => {
  const [event, setEvent] = useState(null);
  const [organizationName, setOrganizationName] = useState("");
  const [userType, setUserType] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [eventImages, setEventImages] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isAttendee, setIsAttendee] = useState(false);

  const { eventId } = useParams();
  const currentDate = new Date();

  const fetchEventData = async () => {
    try {
      const [eventResponse, userTypeResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_KEY}/Events/GetSingleEvent/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        axios.get(`${import.meta.env.VITE_API_KEY}/user/getType`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      setEvent(eventResponse.data.event);
      setOrganizationName(eventResponse.data.organizationName);
      setUserType(userTypeResponse.data.type);

      if (userTypeResponse.data.type === "PlatformUser") {
        const attendeeResponse = await axios.get(
          `${import.meta.env.VITE_API_KEY}/attendees/getIfAttendee/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsAttendee(attendeeResponse.data.buy);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    // Call fetchEventImages here to update event images
    fetchEventImages(eventId).then((images) => setEventImages(images));
  }, [eventId, userType]);

  const handleFileSelect = (event) => {
    if (selectedFiles) {
      // Clear selected files if files are already selected
      setSelectedFiles(null);
    } else {
      // Otherwise, set selected files
      setSelectedFiles(event.target.files);
    }
    setUploadSuccess(false);
  };

  const handleImageUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/Events/uploadMedia/${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      // Fetch updated event images after a 2-second delay
      setTimeout(async () => {
        try {
          const updatedImagesResponse = await axios.get(
            `${import.meta.env.VITE_API_KEY}/Events/getImage/${eventId}`
          );
          const updatedImages = updatedImagesResponse.data.images;

          // Update eventImages state with the newly fetched images
          setEventImages(updatedImages);
        } catch (error) {
          console.error("Error fetching updated images:", error);
        }
      }, 3000); // 2-second delay
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
      setSelectedFiles(null);
    }
  };

  const toggleEnlargeImage = (imageUrl) => {
    if (enlargedImage === imageUrl) {
      setEnlargedImage(null); // Close enlarged image if it's already open
    } else {
      setEnlargedImage(imageUrl); // Open clicked image
    }
  };

  if (!event) {
    return <div className="flex items-center justify-center h-full mt-[200px] mb-[200px]">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
  }

  const eventDate = new Date(event.EventDate);
  const remainingTickets = event.TotalTickets - event.SoldTickets;

  return (
    <div className="bg-slate-100">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-orange-600 sm:text-4xl">
            Event Description
          </h2>
          <p className="mt-4 text-gray-500 font-bold text-xl">
            {event.Description}
          </p>
          {eventDate < currentDate && (
          <div>
            <AverageReview id={eventId}/>
          </div>
        )}
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t-2 border-green-900 text-green-800 pt-4">
              <dt className="font-bold text-orange-600 text-2xl">Name</dt>
              <dd className="mt-2 font-bold text-gray-500 text-xl">
                {event.Name}
              </dd>
            </div>
            <div className="border-t-2 border-green-900 text-green-800 pt-4">
              <dt className="font-bold text-orange-600 text-2xl">Location</dt>
              <dd className="mt-2 text-gray-500 text-xl font-bold">
                {event.Location}
              </dd>
            </div>
            <div className="border-t-2 border-green-900 text-green-800 pt-4">
              <dt className="font-bold text-orange-600 text-2xl">Date</dt>
              <dd className="mt-2 text-gray-500 text-xl font-bold">
                {event.EventDate
                  ? new Date(event.EventDate).toLocaleDateString()
                  : "Date Not Available"}
              </dd>
            </div>
            <div className="border-t-2 border-green-900 text-green-800 pt-4">
              <dt className="font-bold text-orange-600 text-2xl">
                Organization
              </dt>
              <dd className="mt-2 text-gray-500 text-xl font-bold">
                {organizationName}
              </dd>
            </div>
            <div className="border-t-2 border-green-900 text-green-800 pt-4">
              <dt className="font-bold text-orange-600 text-2xl">Start Time</dt>
              <dd className="mt-2 text-gray-500 text-xl font-bold">
                {event.StartTime}
              </dd>
            </div>
            <div className="border-t-2 border-green-900 text-green-800 pt-4">
              <dt className="font-bold text-orange-600 text-2xl">End Time</dt>
              <dd className="mt-2 text-gray-500 text-xl font-bold">
                {event.EndTime}
              </dd>
            </div>
          </dl>
          
        </div>
        {userType === "OrgAdmin" && (
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow-md">
            <h2 className="text-3xl font-bold mb-4">Upload Images</h2>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              id="file-input"
              name="files"
            />
            <label
              htmlFor="file-input"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer mb-4"
            >
              {selectedFiles ? "Unselect" : "Select Images"}
            </label>
            {selectedFiles && (
              <button
                onClick={handleImageUpload}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mb-4"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
            )}
            {uploadSuccess && (
              <p className="text-green-600 font-bold mt-2">
                Images uploaded successfully!
              </p>
            )}
            {eventDate >= currentDate ? (
              <Link
                to={`/editEvent/${eventId}`}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 cursor-pointer"
              >
                Edit Event
              </Link>
            ) : <Link
             to={`/showRating/${eventId}`}
            
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 cursor-pointer"
          >
            View Rating and Review
          </Link>}
            <Link
              to={`/attendeeList/${eventId}`}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              View Attendee List
            </Link>
          </div>
        )}

        {userType === "OrgAdmin" && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold tracking-tight text-orange-600 sm:text-4xl">
              Event Images
            </h2>
            <div className="grid grid-cols-5 gap-4 mt-4 items-center">
              {eventImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Event Image ${index}`}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => toggleEnlargeImage(imageUrl)}
                />
              ))}
            </div>
          </div>
        )}
        {userType === "PlatformUser" && (
          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-3xl font-bold tracking-tight text-orange-600 sm:text-4xl"></h2>
            <div className="flex items-center justify-center bg-gray-200 rounded-md p-8 mt-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  Ticket Price
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  Rs. {event.TicketPrice}
                </p>
              </div>
              <div className="w-px bg-gray-500 mx-8 h-24"></div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  Remaining Tickets
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {remainingTickets}
                </p>
              </div>
            </div>
          </div>
        )}

        {userType === "PlatformUser" && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold tracking-tight text-orange-600 sm:text-4xl">
              Event Images
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-4 items-center">
              {eventImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Event Image ${index}`}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => toggleEnlargeImage(imageUrl)}
                />
              ))}
            </div>
          </div>
        )}

        {enlargedImage && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-90 flex justify-center items-center">
            <img
              src={enlargedImage}
              alt="Enlarged Image"
              className="max-w-full max-h-full"
              onClick={() => toggleEnlargeImage(null)}
            />
          </div>
        )}

        {userType === "PlatformUser" &&
          eventDate >= currentDate &&
          remainingTickets > 0 &&
          !isAttendee && (
            <div className="flex justify-center items-center mt-10">
              <p className="text-xl font-medium text-gray-800">
                Do you want to buy a ticket?
              </p>
              <button
                type="button"
                className="ml-4 px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-green-900 focus:outline-none"
              >
                <Link
                  to={{
                    pathname: "/checkout",
                    state: { event },
                  }}
                >
                  Buy Ticket
                </Link>
              </button>
            </div>
          )}
        {userType === "PlatformUser" && isAttendee && (
          <div className="flex justify-center items-center mt-10">
            <p className="text-xl font-medium text-gray-800">
              You have already bought a ticket.
            </p>
          </div>
        )}

        {userType === "PlatformUser" && remainingTickets === 0 && (
          <div className="flex justify-center items-center mt-10">
            <p className="text-xl font-medium text-red-600">
              All tickets are sold out. Sorry!
            </p>
          </div>
        )}

        {userType === "PlatformUser" && eventDate < currentDate && (
          <div className="flex justify-center items-center mt-10">
            <p className="text-xl font-medium text-red-600">
              This event has already passed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleEvent;

