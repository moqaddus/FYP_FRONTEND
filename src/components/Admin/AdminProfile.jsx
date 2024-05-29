import React from 'react';
import { useEffect,useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const AdminProfile = () => {

  const [isAdmin,setIsAdmin]=useState(false);
  const [tokenUsername, setTokenUsername] = useState("");
  const [tokenType,setTokenType]=useState("");

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    const decodedToken = jwtDecode(storedToken);
    setTokenUsername(decodedToken.username);
    setTokenType(decodedToken.type);
    if(decodedToken.type==='PlatformAdmin')
      {
        setIsAdmin(true);
      }
  }
}, []);

if (!isAdmin) {
  return <div className="mt-[200px] mb-[200px] text-lg text-center font-bold">UnAuthorized Access </div>;
}
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-center  mb-10">
          <h1 className="text-2xl font-bold text-center text-green-500">Hello, </h1>
          <p className="text-2xl font-bold text-red-400 hover:text-red-600 ml-2 transition duration-300">{tokenUsername}</p>
        </div>
        
        <div className="flex flex-col  space-y-4">
        <button className="m-auto w-[60%] bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition duration-300">
          <Link to="/signUp"> Add New Admin</Link>
          </button>
          <button className=" m-auto w-[60%] bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition duration-300">
          <Link to="/addInterest">Add Interest</Link> 
          </button>
          <button className="m-auto w-[60%] bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition duration-300">
          <Link to="/suggestions"> Show All Suggestions</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
