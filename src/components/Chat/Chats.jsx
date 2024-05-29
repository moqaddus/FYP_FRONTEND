import React from 'react'
//import Pic_5 from 'C:/Users/Lenovo/Downloads/Fyp_frontend/Fyp_frontend/EventHub-FrontEnd/src/Images/Pic_5.jpeg'


const Chats = () => {
  return (
    <div className="">
      <div className="userChat p-2 flex items-center gap-10 text-black cursor-pointer hover:bg-green-800 hover:text-white">
        <img className="w-12 h-12 rounded-full object-cover" src={""} alt="" />
        <div className='info '>
          <span className="text-lg font-semibold">Jane</span>
          <p class="text-sm text-gray-400">Hello</p>
        </div>
      </div>
      <div className="userChat p-2 flex items-center gap-10 text-black cursor-pointer hover:bg-green-800 hover:text-white">
        <img className="w-12 h-12 rounded-full object-cover" src={""} alt="" />
        <div >
          <span className="text-lg font-semibold">Jane</span>
          <p class="text-sm text-white">Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats