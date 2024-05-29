import React from 'react'
import { useState,useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

//import Pic_3 from 'C:/Users/Lenovo/Downloads/Fyp_frontend/Fyp_frontend/EventHub-FrontEnd/src/Images/Pic_3.jpeg'


const Message = ({message,recieverImage,senderImage }) => {
  const [tokenId, setTokenId] = useState('');
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    console.log("Image:",recieverImage);
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setTokenId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    // Check if the sender ID matches the current user's ID
    setIsCurrentUser(message.Sender._id === tokenId);
  }, [message, tokenId]);

  return (
    <div className={`message ${isCurrentUser ? 'owner' : ''} flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} text-gray-900 gap-3 mb-5`}>
      <div className="messageInfo flex flex-col text-gray-500 font-light">
    
      {isCurrentUser ? (
        <img className="w-10 h-10 rounded-full object-cover" src={senderImage} alt="" />
      ) : (
        <img className="w-10 h-10 rounded-full object-cover" src={recieverImage} alt="" />
      )}
      </div>
      <div className="messageContent flex flex-col items-end">
        <p className={`${isCurrentUser ? 'bg-blue-500' : 'bg-green-500'} px-2 py-2 ${isCurrentUser ? 'rounded-tl-2xl rounded-br rounded-bl-2xl rounded-tr-2xl' : 'rounded-tl-2xl rounded-bl rounded-br-2xl rounded-tr-2xl'} text-white`}>{message.Message}</p>
        {message.Image && <img className="w-1/2" src={recieverImage} alt="" />}
      </div>
    </div>
  );
};

export default Message;
