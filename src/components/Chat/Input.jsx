// import React from 'react'

// const Input = ({ chatId }) => {

//   const [message, setMessage] = useState('');
//   return (
//     <div className='Input h-12 bg-orange-200 p-4 flex items-center justify-between'>
//       <input className="w-full bg-orange-200 border-none outline-none text-gray-900 text-lg placeholder-gray-400" type="text" placeholder="Type message..."></input>
//       <div className='send flex items-center gap-10'>
//         <img className="h-6 cursor-pointer" src="" alt="" />
//         <input className="hidden" type="file" id="file"/>
//         <label htmlFor='file'>
//           <img src="" alt=""/>
//         </label>
//         <button className='border-none px-2 py-2 text-white bg-blue-500 cursor-pointer'>Send</button>
//       </div>
//     </div>
//   )
// }

// export default Input

import React, { useState,useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import axios from 'axios';

const Input = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const[tokenId,setTokenId]=useState('');


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      console.log("Decoded",decodedToken.id)
      setTokenId(decodedToken.id, () => {
        console.log("TOKENiD:", tokenId);
      });
    

      
    }
}, []);


  const sendMessage = async () => {
    // const storedToken = localStorage.getItem('token');
    // let tokenId;
    // if (storedToken) {
    //   const decodedToken = jwtDecode(storedToken);
    //   tokenId=decodedToken.id;
    // }

    try {
      // Make an HTTP POST request to send the message to the backend
      await axios.post(`${import.meta.env.VITE_API_KEY}/messages/create`, {
        message,
        chatId,
        Sender:tokenId

      });
      
      // Clear the input field after sending the message
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='Input h-12 bg-white p-4 flex items-center justify-between'>
  <input
    className="w-full bg-white border-none outline-none text-gray-900 text-lg placeholder-gray-400"
    type="text"
    placeholder="Type message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <div className='send flex items-center gap-10'>
    <button
      className='border-none px-2 py-2 text-white bg-blue-500 cursor-pointer'
      onClick={sendMessage}
    >
      Send
    </button>
  </div>
</div>

  );
};

export default Input;
