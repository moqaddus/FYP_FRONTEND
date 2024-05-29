import React from "react";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

function Signup() {

  const [isAdmin,setIsAdmin]=useState(false);

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    const decodedToken = jwtDecode(storedToken);
    if(decodedToken.type==='PlatformAdmin')
      {
        setIsAdmin(true);
      }
  }
}, []);

  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    type: "",
  });

  useEffect(() => {
    if (isAdmin) {
      setFormData((prevData) => ({ ...prevData, type: 'PlatformAdmin' }));
    }
  }, [isAdmin]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/user/register/`,
        formData
      );
      console.log(response.data);
      if(isAdmin)
        {
          Swal.fire({
            icon: "success",
            title: "New Admin Created Succesfully!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to login page after confirmation
              history.goBack();
            }
          });
        }
        else{
          Swal.fire({
            icon: "success",
            title: "Sign Up Successful!",
            text: "You can now log in.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to login page after confirmation
              history.push("/login");
            }
          });
        }
      
      // Handle success response
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle validation error from the API
        console.error("Registration error:", error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
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
         {isAdmin ? 'Add New Admin' : 'Sign Up'}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="max-w-md mx-auto">
          <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-200 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold"
              >
                Username:
              </label>
              <input
                type="text"
                id="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-200 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email:
              </label>
              <input
                type="email"
                id="Email"
                value={formData.Email}
                onChange={handleChange}
                name="Email"
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
                type="password"
                id="Password"
                value={formData.Password}
                name="Password"
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-200 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {isAdmin ? (
           <div>
            <label
            htmlFor="type"
            className="block text-gray-700 font-semibold"
          >
           Type:
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            readOnly
            className="mt-2 block w-full rounded-md border-gray-200 border-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
           </div> 
        ) : (
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="font-semibold p-3 mb-4 w-full border border-gray-300 rounded-lg text-lg"
          >
            <option value="">Select Type</option>
            <option value="OrgAdmin">OrgAdmin</option>
            <option value="PlatformUser">PlatformUser</option>
          </select>
        )}

          {/* <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="font-semibold"
          >
            <option value="">Select Type</option>
            <option value="OrgAdmin">OrgAdmin</option>
            <option value="PlatformAdmin">PlatformAdmin</option>
            <option value="PlatformUser">PlatformUser</option>
          </select> */}

          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              {isAdmin ? 'Add' : 'Sign Up'}
            </button>
          </div>
          <div className="flex justify-center">
            {!isAdmin && <p className="text-gray-800">
              Already have an Account?
              <Link
                to="/login"
                className="text-green-800 font-bold hover:text-green-500"
              >
                {" "}
                LogIn
              </Link>
            </p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
