
import React, { useState } from 'react';
import Navbar  from  './Navbar';
import SearchBar from './SearchBar';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <div className=" flex-initial bg-green-400 relative">
      <Navbar/>
      <SearchBar/>
      <Chats/>
    </div>
  )
}

export default Sidebar