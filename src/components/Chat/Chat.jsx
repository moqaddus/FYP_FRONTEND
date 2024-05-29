import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat = ({ chat }) => {
  return (
    <div className="flex-grow">
      <div className="chatInfo h-16 bg-orange-500 flex items-center justify-start p-2 text-gray-300">
        {chat.recieverImage && (
          <img className="w-10 h-10 rounded-full object-cover mr-2" src={chat.recieverImage} alt="" />
        )}
        <span>{chat.userName}</span>
      </div>
      <Messages messages={chat.messages} recieverImage={chat.recieverImage} senderImage={chat.senderImage} />
      <Input chatId={chat.chatId}/>
    </div>
  );
  
}

export default Chat