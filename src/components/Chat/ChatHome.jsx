import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Chat from './Chat';
import ClipLoader from 'react-spinners/ClipLoader'; // Import a spinner component

const ChatHome = (props) => {
  const { user2 } = props.location.state;
  const [tokenId, setTokenId] = useState('');
  const [chat, setChat] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const [sending, setSending] = useState(false); // Add sending state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      console.log("Decoded", decodedToken.id);
      setTokenId(decodedToken.id);
    }
  }, []);

  const fetchChatData = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      let tokenId;
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        tokenId = decodedToken.id;
      }
      // Make the HTTP request to fetch user data
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/messages/getChat/${tokenId}/${user2}`);
      // Extract the user data from the response
      const { chat } = response.data;
      setChat(chat);
      setLoading(false); // Set loading to false after data is fetched
      setSending(false); // Set sending to false after data is fetched
      console.log(chat);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false); // Set loading to false if there's an error
      setSending(false); // Set sending to false if there's an error
    }
  };

  const sendMessage = async (message) => {
    try {
      setSending(true); // Set sending to true before sending a message
      const storedToken = localStorage.getItem('token');
      let tokenId;
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        tokenId = decodedToken.id;
      }
      // Make the HTTP request to send a message
      await axios.post(`${import.meta.env.VITE_API_KEY}/messages/sendMessage`, {
        senderId: tokenId,
        receiverId: user2,
        message,
      });
      // Fetch updated chat messages
      await fetchChatData();
    } catch (error) {
      console.error('Error sending message:', error);
      setSending(false); // Set sending to false if there's an error
    }
  };

  useEffect(() => {
    // Fetch chat messages initially
    fetchChatData();

    // Set up an interval to fetch new messages every 10 seconds
    const intervalId = setInterval(fetchChatData, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-blue-300 h-screen flex items-center justify-center relative">
      <div className="border border-white rounded-lg w-3/4 h-3/4 flex overflow-hidden relative">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        ) : (
          <Chat chat={chat} sendMessage={sendMessage} />
        )}
        {(sending && !loading) && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHome;









// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import axios from 'axios';
// import Chat from './Chat';
// import ClipLoader from 'react-spinners/ClipLoader'; // Import a spinner component

// const ChatHome = (props) => {
//   const { user2 } = props.location.state;
//   const [tokenId, setTokenId] = useState('');
//   const [chat, setChat] = useState('');
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       const decodedToken = jwtDecode(storedToken);
//       console.log("Decoded", decodedToken.id);
//       setTokenId(decodedToken.id, () => {
//         console.log("TOKENiD:", tokenId);
//       });
//     }
//   }, []);

//   const fetchChatData = async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       let tokenId;
//       if (storedToken) {
//         const decodedToken = jwtDecode(storedToken);
//         tokenId = decodedToken.id;
//       }
//       // Make the HTTP request to fetch user data
//       const response = await axios.get(`${import.meta.env.VITE_API_KEY}/messages/getChat/${tokenId}/${user2}`);
//       // Extract the user data from the response
//       const { chat } = response.data;
//       setChat(chat);
//       setLoading(false); // Set loading to false after data is fetched
//       // Set the user data state
//       console.log(chat);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setLoading(false); // Set loading to false if there's an error
//     }
//   };

//   useEffect(() => {
//     // Fetch chat messages initially
//     fetchChatData();

//     // Set up an interval to fetch new messages every 10 seconds
//     const intervalId = setInterval(fetchChatData, 10000);

//     // Clear the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="bg-blue-300 h-screen flex items-center justify-center">
//       <div className="border border-white rounded-lg w-3/4 h-3/4 flex overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center w-full">
//             <ClipLoader size={50} color={"#123abc"} loading={true} />
//           </div>
//         ) : (
//           <Chat chat={chat} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatHome;







// // // import Sidebar from './Sidebar';
// // // import { useLocation } from 'react-router-dom';
// // // import { jwtDecode } from 'jwt-decode';
// // // import axios from 'axios'; // Import axios for making API requests

// // // import React, { useState, useEffect } from 'react';

// // // import Chat from './Chat';
// // // //import NavBar from '../NavBar';
// // // //import Sidebar from './Sidebar';
// // // //import Sidebar from "./Sidebar";

// // // //"border-white rounded-tr-lg w-2.5 overflow-hidden"
// // // //    <div className="bg-blue flex items-center h-full justify-center">
// // // //<Sidebar/>
// // // //<Chat/>

// // // ///getChat/:userId/:receiverId

// // // const ChatHome=(props)=>{
// // //   const { user2 } = props.location.state;
// // //   const[tokenId,setTokenId]=useState('');
// // //   const[chat,setChat]=useState('');

 

  
// // //   useEffect(() => {
// // //     const storedToken = localStorage.getItem('token');
// // //     if (storedToken) {
// // //       const decodedToken = jwtDecode(storedToken);
// // //       console.log("Decoded",decodedToken.id)
// // //       setTokenId(decodedToken.id, () => {
// // //         console.log("TOKENiD:", tokenId);
// // //       });
    

      
// // //     }
// // // }, []);

// // // const fetchChatData = async () => {
// // //   try {
// // //     const storedToken = localStorage.getItem('token');
// // //     let tokenId;
// // //     if (storedToken) {
// // //       const decodedToken = jwtDecode(storedToken);
// // //       tokenId=decodedToken.id;
// // //     }
// // //       // Make the HTTP request to fetch user data
// // //       const response = await axios.get(`${import.meta.env.VITE_API_KEY}/messages/getChat/${tokenId}/${user2}`,
// // //       {
       
// // //       }
// // //     );
// // //       // Extract the user data from the response
// // //       const { chat } = response.data;
// // //       setChat(chat)
// // //       // Set the user data state
// // //       console.log(chat);
// // //   } catch (error) {
// // //       console.error('Error fetching user data:', error);
// // //   }
// // // };

// // // // useEffect(() => {
// // // //   fetchChatData();
// // // // }, []);

// // // useEffect(() => {
// // //   // Fetch chat messages initially
// // //   fetchChatData();

// // //   // Set up an interval to fetch new messages every 10 seconds
// // //   const intervalId = setInterval(fetchChatData, 1000);

// // //   // Clear the interval when the component unmounts
// // //   return () => clearInterval(intervalId);
// // // }, []);

  


  
// // //   return(
// // //     <div className="  bg-blue-300  h-screen flex items-center justify-center">
// // //       <div className=" border border-white rounded-lg w-3/4 h-3/4 flex overflow-hidden">
      
// // //       <Chat chat={chat}/>
    
// // //       </div>      
// // //     </div>
// // //   )
// // // }

// // // export default ChatHome;