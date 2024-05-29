import React from 'react'
import  Message  from './Message'
import { useEffect } from 'react';

const Messages = ({messages,recieverImage,senderImage}) => {

  //const sortedMessages = messages && Array.isArray(messages) ? messages.sort((a, b) => new Date(a.TimeStamp) - new Date(b.TimeStamp)) : [];
  const sortedMessages = messages && Array.isArray(messages) ? messages.sort((a, b) => new Date(a.TimeStamp).getTime() - new Date(b.TimeStamp).getTime()) : [];

  useEffect(() => {
    console.log("Image In Messages:",recieverImage);

   // console.log('Messages prop:', messages); // Log messages prop
    console.log('Sorted messages:', sortedMessages); // Log sortedMessages for debugging
  }, [messages, sortedMessages]);
  return (
    <div className=" h-full bg-white md:h-4/5 overflow-y-scroll" >
      {sortedMessages.map((message, index) => (
        <Message key={index} message={message} recieverImage={recieverImage} senderImage={senderImage} />
      ))}
    </div>
  )
}

export default Messages