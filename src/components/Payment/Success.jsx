      
      
import { useState, useEffect } from 'react';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { useHistory } from 'react-router-dom';


const Success = () => {
  const location = useLocation();
  const eventId = new URLSearchParams(location.search).get('eventId');
  const [error, setError] = useState(null);
  const[token,setToken]=useState('');
  const [tokenId,setTokenId]=useState('');
  let response;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Stored token",storedToken);
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setTokenId(decodedToken.id);
      setToken(storedToken);
    }

    const updateTicketsCount = async () => {
      try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const tokenId=decodedToken.id;
        console.log("Event ID:", eventId)
        console.log("Token",tokenId)
        if (token) {
          
          response = await axios.post(
            `${import.meta.env.VITE_API_KEY}/attendees/create/${eventId}/${tokenId}`,
            {
              // headers: {
              //   Authorization: `Bearer ${token}`,
              // }
            }
          );
          console.log(response.data); // Assuming you need to log the response

        }
        const ticketId=response.data.attendee.EventID;
        console.log(ticketId)
        if (token) {
          
          response = await axios.post(
            `${import.meta.env.VITE_API_KEY}/attendees/sendTicket/${tokenId}/${ticketId}`,
            {
              // headers: {
              //   Authorization: `Bearer ${token}`,
              // }
            }
          );
          console.log(response.data); // Assuming you need to log the response
        }
      } catch (error) {
        console.error("Error updating tickets count:", error);
        setError(error);
      }
    };


    updateTicketsCount();
  }, [eventId]);

  // useEffect(() => {
  //   const sendToken = async () => {
  //     try {
  //     const token = localStorage.getItem('token');
  //     const decodedToken = jwtDecode(token);
  //     const userId=decodedToken.id;
  //     const ticketId=response.data._id;
        
  //       if (token) {
          
  //         response = await axios.post(
  //           `${import.meta.env.VITE_API_KEY}/attendees/sendTicket/${userId}/${ticketId}`,
  //           {
  //             // headers: {
  //             //   Authorization: `Bearer ${token}`,
  //             // }
  //           }
  //         );
  //         console.log(response.data); // Assuming you need to log the response
  //       }
  //     } catch (error) {
  //       console.error("Error updating tickets count:", error);
  //       setError(error);
  //     }
  //   };
  //   sendToken();
      
  // }, []);

  

  return (
    <div className="max-w-xl mt-64 mx-auto py-10 px-8 bg-white rounded-lg shadow-lg border border-green-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full p-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p className="ml-4 text-lg font-semibold text-green-500">Payment Successful</p>
        </div>
        <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
      </div>
      <p className="mt-4 text-gray-700">Your payment was successful. Thank you for your purchase!</p>
    </div>
  );
};

export default Success;






// import { useState } from 'react';
// import React,{useEffect} from 'react';
// import { Link,useLocation } from 'react-router-dom';
// import axios from "axios";



// const Success = () => {
//   const location = useLocation();
//   const eventId = new URLSearchParams(location.search).get('eventId');
//   const [token, setToken] = useState("");
//   const [error, setError] = useState(null);


  

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if(!storedToken)
//       {
//         console.log("No token found");
//       }
//     setToken(storedToken);
//     updateTicketsCount();

    
//   }, [eventId]);

//   const updateTicketsCount=async()=>{
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_KEY}/attendees/create`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             eventId:eventId
//           }
//         );
//         const { organization } = response.data; 
//         console.log(organization);// Assuming orgData is not nested in the response
//         // Set the organization data state
       
//       }

//       // setLoading(false); // Set loading to false
//     } catch (error) {
//       console.error("Error fetching organization data:", error);
//       setError(error); // Set the error state
      
//     }
//   }
//   return (
//     <div className="max-w-xl mt-64 mx-auto py-10 px-8 bg-white rounded-lg shadow-lg border border-green-500">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <div className="bg-green-500 text-white rounded-full p-3">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//             </svg>
//           </div>
//           <p className="ml-4 text-lg font-semibold text-green-500">Payment Successful</p>
//         </div>
//         <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
//       </div>
//       <p className="mt-4 text-gray-700">Your payment was successful. Thank you for your purchase!</p>
//     </div>
//   );
// };

// export default Success;
