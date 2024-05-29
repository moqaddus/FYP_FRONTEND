import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect} from "react";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LogIn({handleLogin}) {

  const history=useHistory();


  useEffect(() => {
    // Fetch token from local storage once when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken=jwtDecode(storedToken);
      const {type,username}=decodedToken;
      if(type==='PlatformUser')
        {
          history.push({
            pathname: "/userProfile",
            state: { userName: username }
            
        })
        }
      else if(type==='OrgAdmin')
        {
          history.push({
            pathname: "/orgProfile",
            state: { userName: username }
        })
        }
        else if(type=='PlatformAdmin')
          {
            history.push({
              pathname: "/admin"});
          }
    }
    
  }, []);


  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/user/login/`,
        formData
      );
      // console.log(response.data);
      const { token, username,type } = response.data; // Extract token and type from response
      localStorage.setItem("token", token); // Store token in local storage
      // console.log("Token stored:", token); 
      handleLogin();
      Swal.fire({
        icon: "success",
        title: "LogIn Successful!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirecting based on type
          if (type === "PlatformUser") {
            history.push({
              pathname: "/userProfile",
              state: { userName: username } // Pass the user ID as state
          });
          } else if (response.data.type === "OrgAdmin") {
            history.push({
              pathname: "/orgProfile",
              state: { userName: username }
          })
        }
        else if (response.data.type === "PlatformAdmin") {
          history.push({
            pathname: "/admin",
            state: { userName: username }
        })
      }
      }});
      // Handle success response
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle validation error from the API
        console.error("Login error:", error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "LogIn Failed",
          text: error.response.data.message,
        });

        // handle error message (e.g., username or email already in use)
      } else {
        // Handle other errors (e.g., network issues, server errors)
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="flex flex-col md:flex-row mt-[90px]">
      <div className="md:flex md:flex-col m-auto">
        <img
          className="h-40 w-40 md:h-[260px] md:w-[260px] m-auto"
          src="/images/eventhubLogo.png"
          alt="logo"
        />
        <div className="hidden md:block">
          <h1 className="text-orange-600 text-6xl font-extrabold  text-center">
            EventHub
          </h1>
          <p className="text-green-500 font-bold text-4xl text-center mt-6">
            Create | Discover | Thrive
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-8 pl-[90px] pr-[90px] pt-8 pb-8 bg-white rounded-lg shadow-xl shadow-gray-300">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-800">
          Log In
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="max-w-md mx-auto">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email:
              </label>
              <input
                type="Email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-200 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password:
              </label>
              <input
                type="Password"
                id="Password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-200 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className=" flex justify-center">
            <button
              type="submit"
              className=" bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
