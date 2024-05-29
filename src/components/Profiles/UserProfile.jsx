import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import List from "./FollowingList";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';


const UserProfile = () => {

  const { userId } = useParams();
  const [chats, setChats] = useState([]);
  const [showChats, setShowChats] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("");
  const [userInterest, setUserInterest] = useState([]);
  const [interestsExceptUser, setInterestsExceptUser] = useState([]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showOrganizations, setShowOrganizations] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isOrganization,setIsOrganization]=useState(false);
  const [image, setImage] = useState(null);

  const location = useLocation();
  const userNameFromState = location.state ? location.state.userName : null;

  const [token, setToken] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenUsername, setTokenUsername] = useState("");
  const [tokenType,setTokenType]=useState("");

  useEffect(() => {
    // Fetch token from local storage once when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setTokenId(decodedToken.id);
      setTokenUsername(decodedToken.username);
      setTokenType(decodedToken.type);
      setToken(storedToken);
      
      if(decodedToken.type==='OrgAdmin')
        {
          setIsOrganization(true);
        }
    }
  }, []);

  const validateToken = async () => {
    if (token) {
      try {
        if (tokenUsername === userNameFromState) {
          setShowEdit(true);
        }
        else{
          setIsOrganization(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDataForUser =async()=>{
        try {
          // Make the HTTP request to fetch user data
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${import.meta.env.VITE_API_KEY}/user/profile/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Extract the user data from the response
          const { user } = response.data;
          // Set the user data state
          setUserData(user);
          setLoading(false); // Set loading to false
        
        } catch (error) {
          console.error("Error fetching user data:", error);
          console.log(error);
          setError(error); // Set the error state
          setLoading(false); // Set loading to false
        }
      
      
  };

  const fetchUserDataForOrg=async()=>{
    try {
      // Make the HTTP request to fetch user data
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/Organization/profile/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Extract the user data from the response
      const { user } = response.data;
      // Set the user data state
      setUserData(user);
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error); // Set the error state
      setLoading(false); // Set loading to false
    }
  };

  const fetchUserInterestNames = async () => {
    try {
      // Make a GET request to fetch user interest names
      if (isOrganization) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/interest/getOneUser/${userId}`
        );
        // Extract interest names from the response data
        //const { interestNames } = response.data;
        setUserInterest(response.data.interestNames);
        console.log(userInterest);
      }
      else{
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/interest/getOneUser/${tokenId}`
        );
        // Extract interest names from the response data
        //const { interestNames } = response.data;
        setUserInterest(response.data.interestNames);
        console.log(userInterest);
      }

      //return interestNames;
    } catch (error) {
      // Handle errors
      console.error("Error fetching user interest names:", error.message);
      throw error;
    }
  };

  const fetchInterestsNotOfUser = async () => {
    try {
      // const token = localStorage.getItem('token');
      if (tokenId) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/interest/notUserInterest/${tokenId}`
        );
        setInterestsExceptUser(response.data.interests);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    validateToken();
    if(tokenType)
      {
        if(tokenType=="PlatformUser")
        {
          fetchUserDataForUser();
          fetchInterestsNotOfUser();
          fetchChats();
        } 
        else 
        {
          fetchUserDataForOrg();
        }
      }
    
   
    fetchUserInterestNames();
    // Add more API calls here if needed
  }, [token]);

  // useEffect(() => {
  //   fetchChats();
  // }, [token]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/messages/getAllChats/${tokenId}`
      );
      setChats(response.data.chats);
      console.log("Chats", chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const toggleChats = () => {
    setShowChats(!showChats);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleOrganizations = () => {
    setShowOrganizations(!showOrganizations);
  };

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  // const handleEditProfile = () => {
  //   // Logic to handle editing profile picture
  //   setShowProfileOptions(false);
  // };
  const handleEditProfile = () => {
    document.getElementById("upload-profile-pic").click(); // Trigger file picker dialog
  };

  const handleRemoveProfile = () => {
    // Logic to handle removing profile picture
    setShowProfileOptions(false);
  };

  const handleCloseList = () => {
    setShowOrganizations(false);
  };

  const handleSelectChange = (event) => {
    setSelectedInterest(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAddInterest = async () => {
    try {
      // Validate selectedInterest
      if (!selectedInterest) {
        console.error("No interest selected");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/interest/add/${tokenId}`,
        { userID: tokenId, interestID: selectedInterest }
      );
      console.log("Added successfully");
      await fetchUserInterestNames();
      await fetchInterestsNotOfUser();
      return response.data;
      // Return the response data if the request was successful
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
        confirmButtonText: "OK",
      });
      // Handle errors (e.g., network error, server error)
    }
  };

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Make a POST request to upload the image
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/user/uploadImg`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUserDataForUser();
      // Handle success
      console.log("Image uploaded successfully:", response.data);
      // You can add further logic here, like updating the UI with the new image
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error.message);
    }
  };

  if (loading) {
    return <div className="mt-[200px] mb-[200px] text-lg text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-[200px] mb-[200px] text-lg text-center">Error: {error.message}</div>;
  }

  if (!userData) {
    return <div className="mt-[200px] mb-[200px] text-lg text-center">No user data available.</div>;
  }

  const { Name, Email, Username, Bio, ImagePath } = userData;

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
          {/* {showEdit &&  <li className="py-2 pl-1 hover:bg-gray-600 rounded-lg">
              {" "}
              <Link to="/allEvents">Review Events</Link>
            </li>} */}
           
            {showEdit && <li className="py-2 pl-1 hover:bg-gray-600 rounded-lg">
              <Link to="/allEvents">Browse Event</Link>
            </li>}
            
            {showEdit && <li className="py-2 pl-1 hover:bg-gray-600 rounded-lg">
              <Link to="/allOrgs">Explore Organizations</Link>
            </li>}
            
            {/*   */}
            {showEdit &&  <li
              onClick={toggleChats}
              className="py-2 pl-1 hover:bg-gray-600 rounded-lg"
            >
              My Chats
            </li>}
            {isOrganization && <li className="py-2 pl-1 hover:bg-gray-600 rounded-lg">
            <Link
                to={{ pathname: "/chatHome", state: { user2: userId } }}
              >
                Message
              </Link>
            </li>}
          </ul>
        </div>
      </div>

      {/* Main Content */}
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
           {showEdit && <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
              <Link
                to={{
                  pathname: "/editUser",
                  state: { userId: tokenId, name: Name, bio: Bio },
                }}
              >
                Edit Profile
              </Link>
            </button>
           } 
            {showEdit &&<button
              onClick={toggleOrganizations}
              className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md ml-4 mr-2"
            >
              Following
            </button>}
            {isOrganization && <button className="md:hidden bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md mr-2">
              {" "}
              {/* Added mr-4 for spacing */}
              <Link
                to={{ pathname: "/chatHome", state: { user2: userId } }}
              >
                Message
              </Link>
            </button>
            }
            {showEdit && <button
              onClick={toggleDropdown}
              className="md:hidden bg-orange-400 pt-0 px-3 text-white text-3xl focus:outline-none  hover:bg-orange-500 rounded-lg ml-4"
            >
              &#8801;
            </button>
            }
          </div>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div
            className="absolute overflow-hidden inset-0 flex justify-center items-center "
            onClick={toggleDropdown}
          >
            <div className="m-auto rounded-lg shadow-lg bg-gray-100 w-[80%]">
              <Link
                to="/allEvents"
                className=" text-center m-auto text-white w-[70%] px-7 py-1 text-lg block mt-5 rounded-xl shadow shadow-gray-400 bg-orange-500 hover:bg-orange-400"
              >
                Review Event
              </Link>
              <Link
                to="/allEvents"
                className="text-center m-auto text-white w-[70%] px-7 py-1 text-lg mt-2  block rounded-xl shadow shadow-gray-400 bg-orange-500 hover:bg-orange-400"
              >
                Browse Event
              </Link>
              <Link
                to="/allOrgs"
                className="text-center m-auto text-white w-[70%] px-7 py-1 text-lg mt-2  block rounded-xl shadow shadow-gray-400 bg-orange-500 hover:bg-orange-400"
              >
                Explore Organization
              </Link>
              <button
              onClick={toggleChats}
              className="text-center m-auto text-white w-[70%] px-7 py-1 text-lg mt-2 mb-5  block rounded-xl shadow shadow-gray-400 bg-orange-500 hover:bg-orange-400"        
            >
              My Chats
            </button>
            </div>
          </div>
        </div>

        {/* {showOrganizations && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" onClick={handleCloseList}>
            <List/>
        </div>
      )} */}
        {showOrganizations && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
            onClick={handleCloseList}
          >
            {/* <div className="flex flex-col justify-center items-center h-full">
              <button className="bg-white text-black px-4 py-2 rounded-lg shadow-md mb-4">
                Button 1
              </button>
              <button className="bg-white text-black px-4 py-2 rounded-lg shadow-md">
                Button 2
              </button>
            </div> */}
            <List id={tokenId} />
          </div>
        )}

        { showEdit && showProfileOptions && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Profile Picture Options
              </h2>
              <button
                onClick={handleEditProfile}
                className="block w-full text-left py-2 px-4 mb-2 hover:bg-gray-200"
              >
                Edit Profile
              </button>
              {/* <button
                onClick={handleRemoveProfile}
                className="block w-full text-left py-2 px-4 mb-2 hover:bg-gray-200"
              >
                Remove Profile
              </button> */}
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

        <div className="mb-4 relative">
          <h3 className="text-lg font-semibold mb-2">Interests:</h3>
          <div className="flex flex-wrap mb-2">
            {userInterest.map((interest, index) => (
              <span
                key={index}
                className="bg-green-500 hover:bg-green-400 text-white rounded-full px-2 py-1 mr-2 mb-2"
              >
                {interest}
              </span>
            ))}
          </div>
          {showEdit && <div className="flex flex-wrap">
            <select
              value={selectedInterest}
              onChange={handleSelectChange}
              className="bg-gray-200 text-gray-800 rounded-full px-4 py-2 mr-2 mb-2"
            >
              <option value="">Select Interest</option>
              {interestsExceptUser.map((interest) => (
                <option key={interest._id} value={interest._id}>
                  {interest.Name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddInterest}
              className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md mr-2 mb-2"
            >
              Add
            </button>
          </div> }
          {showEdit && <p className="text-gray-800 mt-2">
            Make request for
            <Link
              to="/contact"
              className="text-green-800 font-bold hover:text-green-500"
            >
              {" "}
              Custom Interest
            </Link>
          </p> }
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 mt-8">Bio:</h3>
          <p className="text-gray-600">
            {Bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
