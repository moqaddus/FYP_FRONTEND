import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useParams } from 'react-router-dom'; // Import useParams hook from React Router

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import List from "./FollowingList";

const OrgProfile = () => {
  const [chats, setChats] = useState([]);
  const [showChats, setShowChats] = useState(false);


  const { orgId } = useParams(); // Get orgId from URL parameters
  const [showEdit, setShowEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [image, setImage] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [isFollow,setIsFollow]=useState(false);
  let organi;


  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const userNameFromState = location.state ? location.state.userName : null;

  const [token, setToken] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenUsername, setTokenUsername] = useState("");
  

  useEffect(() => {
    // Fetch token from local storage once when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setTokenId(decodedToken.id);
      setTokenUsername(decodedToken.username);
      setToken(storedToken);
    }
  },[]);

  const doAll=async ()=>{
    validateToken();
    const userTypeResponse = await axios.get(`${import.meta.env.VITE_API_KEY}/user/getType`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Extract user type from the response
    const userType = userTypeResponse.data.type;

    if(userType=="OrgAdmin")
    {
        fetchOrgDataForOrg();
    }
    else
    {
      setIsUser(true);
      fetchOrgDataForUser();
      isOrganizationFollowed();
    }


  }

  const validateToken = async () => {
    if (token) {
      try {
        if (tokenUsername === userNameFromState) {
          setShowEdit(true);
        }
        //console.log(idFromToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
   

  };

  const fetchOrgDataForUser= async()=>{
    
    try {
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/user/profile/org/${orgId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { organization } = response.data; 
        organi=organization;
       
        setOrgData(organization);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
      setError(error); // Set the error state
      setLoading(false); // Set loading to false
    }

  }


  const fetchOrgDataForOrg = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/Organization/profile/org`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { organization } = response.data; // Assuming orgData is not nested in the response
        console.log(organization);
        organi=organization;// Assuming orgData is not nested in the response
        // Set the organization data state
        setOrgData(organization);
        setLoading(false);
      }

      // setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching organization data:", error);
      setError(error); // Set the error state 
    }
  };

  // Call the function after token changes

  useEffect(() => {
   doAll();
  }, [token]);

  useEffect(() => {
  
    fetchChats();
  }, [token]);
  
  const fetchChats = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      
        const decodedToken = jwtDecode(storedToken);
      
      const tokenId=decodedToken.id
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/messages/getAllChats/${tokenId}`);
      setChats(response.data.chats);
      console.log("Chats",chats)
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };
  const isOrganizationFollowed=async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/Organization/isUserFollowOrg/${orgId}/${tokenId}`
      );
      setIsFollow(response.data.isFollowing);
    } catch (error) {
      console.error('Error getting follower of Organization:', error);
    }
  };

  const followOrganization = async () => {
    try {
      console.log(token);
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/user/followOrg/${orgId}/${tokenId}`,
        {}, // empty data object, as the request doesn't require a request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFollow(true);
    } catch (error) {
      console.error('Error following Organization:', error);
    }
  };
  
  const unFollowOrganization = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/user/unFollowOrg/${orgId}/${tokenId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFollow(false);
    } catch (error) {
      console.error('Error unfollowing Organization:', error);
    }
  };
  
  const toggleChats = () => {
    setShowChats(!showChats);
  };
                
         





  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
  };

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Make a POST request to upload the image
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/Organization/uploadImg`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      await doAll();
      // Handle success
      console.log("Image uploaded successfully:", response.data);
      // You can add further logic here, like updating the UI with the new image
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    }
  };

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleEditProfile = () => {
    document.getElementById("upload-profile-pic").click(); // Trigger file picker dialog
  };

  const handleRemoveProfile = () => {
    // Logic to handle removing profile picture
    setShowProfileOptions(false);
  };

  const handleCloseList = () => {
    setShowFollowers(false);
  };
  
  
    if (loading) {
      return <div className="mt-[200px] mb-[200px] text-2xl text-center ">Loading...</div>;
  }

  // if (error) {
  //     return <div>Error: {error.message}</div>;
  // }

  // if (!orgData) {
  //     return <div>No user data available.</div>;
  // }

  const { Name, Email, Username, Description, ImagePath } = orgData || {};

  return (
    <div className="md:flex">
      {/* Sidebar */}
      <div>
      <div className={`fixed top-0 left-0 w-1/4 h-full bg-gray-700 bg-opacity-75 transition-all duration-300 ease-out z-10 ${showChats ? 'translate-x-0' : '-translate-x-full'}`}>
  <button onClick={toggleChats} className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-full">Close</button>
  <div className="h-full flex items-center justify-center">
    <ul className="p-4 space-y-4 w-full">
      {chats.map((chat) => (
        <li key={chat._id} className="py-2 flex items-center space-x-4 bg-white bg-opacity-90 shadow-md hover:bg-opacity-100 transition-all duration-200 rounded-md p-4">
          <img src={chat.userImage} alt={'https://via.placeholder.com/300'} className="w-10 h-10 rounded-full"/>
          <Link to={{ pathname: "/chatHome", state: { user2: chat._id } }} className="block text-blue-500 hover:underline">
            {chat.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>



      <div className="md:bg-gray-800 md:mt-24 md:text-white md:w-64 md:min-h-screen hidden md:block">
        <ul className="p-4">
        {isUser && <li className="py-2 pl-1 hover:bg-gray-600 rounded-lg"> {" "}
              {/* Added mr-4 for spacing */}
              <Link
                 to={{ pathname: "/chatHome", state: { user2: orgId} }}
              >
                Message
              </Link>
              </li> }
           {showEdit && <li className="py-2 pl-1 hover:bg-gray-600 rounded-lg">
            {" "}
            <Link to="/allEvents">All Events</Link>
          </li>}
          {showEdit && <li className="py-2 pl-1 hover:bg-gray-600 rounded-lg">
            <Link to="/createEvent">Create Event</Link>
          </li>}

          {showEdit && <li onClick={toggleChats} className="py-2 pl-1 hover:bg-gray-600 rounded-lg">
            My Chats
          </li>}

        </ul>
      </div>
      </div>

      <div className="max-w-4xl mx-auto mt-24 p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
            <img
              src={ImagePath || "https://via.placeholder.com/300"}
              alt="Profile"
              className="w-48 h-48 rounded-full border-4 border-white mr-4 cursor-pointer"
              onClick={toggleProfileOptions}
            />
            <div className="md:text-left">
              <h2 className="text-2xl font-semibold">{Name || "No Name"}</h2>
              <p className="text-gray-600">{"@" + Username || "No username"}</p>
            </div>
          </div>
          <div className="md:ml-auto md:text-right md:mt-[80px] flex items-center">
            {" "}
            {/* Added flex and items-center */}
            {showEdit && <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md mr-2">
              {" "}
              {/* Added mr-4 for spacing */}
              <Link
                to={{
                  pathname: "/editOrg",
                  state: {
                    userId: tokenId,
                    name: Name,
                    description: Description,
                  },
                }}
              >
                Edit Profile
              </Link>
            
            </button>}
            
            {isUser && !isFollow && <button onClick={followOrganization} className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md mr-2">
              {" "}
               Follow
            </button>}
            {isUser &&  isFollow &&<button onClick={unFollowOrganization} className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md mr-2">
              {" "}
               UnFollow
            </button>}


            <button
              onClick={toggleDropdown}
              className="md:hidden bg-orange-400 pt-0 px-3 text-white text-3xl focus:outline-none  hover:bg-orange-500 rounded-lg ml-4"
            >
              &#8801;
            </button>
          </div> 

          <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div
              className="absolute overflow-hidden inset-0 flex justify-center items-center "
              onClick={toggleDropdown}
            >
              <div className="m-auto rounded-lg shadow-lg bg-gray-100 w-[80%]">
              {showEdit  && <Link
                  to="/allEvents"
                  className=" text-center m-auto text-white w-[70%] px-7 py-1 text-lg block mt-5 mb-5 rounded-xl shadow shadow-gray-400 bg-orange-500 hover:bg-orange-400"
                >
                  All Events
                </Link>}
                {showEdit && <Link
                  to="/createEvent"
                  className="text-center m-auto text-white w-[70%] px-7 py-1 text-lg mt-2  block rounded-xl shadow shadow-gray-400 bg-orange-500 hover:bg-orange-400"
                >
                  Create Event
                </Link>}
                {showEdit && <button onClick={toggleChats}
                  className="text-center m-auto text-white w-[70%] px-7 py-1 text-lg mt-2 mb-5 block rounded-xl shadow shadow-gray-400 bg-orange-500 hover:bg-orange-400"
                >
                  My Chats
                </button>}
              </div>
            </div>
          </div>
        </div>

        {showFollowers && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
            onClick={handleCloseList}
          >
            <List />
          </div>
        )}

        {showEdit && showProfileOptions && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Profile Picture Options
              </h2>
              <button
                onClick={handleEditProfile}
                className="block w-full text-left py-2 px-4 mb-2 hover:bg-gray-200"
              >
                Edit Picture
              </button>
              <button
                onClick={toggleProfileOptions}
                className="block w-full text-left py-2 px-4 mb-2 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="upload-profile-pic"
        />

        <div>
          <h3 className="text-lg font-semibold mb-2">Description:</h3>
          <p className="text-gray-600">{Description}</p>
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
