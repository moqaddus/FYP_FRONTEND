import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch token from local storage once when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogoutConfirmation = async () => {
    const result = await Swal.fire({
      title: 'Confirm Logout',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    });

    if (result.isConfirmed) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    history.push('/home');
  };

  const colors = {
    green: ["text-green-400", "hover:text-green-500"],
    orange: ["text-orange-400", "hover:text-orange-500"],
    red: ["text-red-400", "hover:text-red-500"],
    gray: [
      "text-gray-800",
      "bg-gray-300",
      "hover:bg-gray-400",
      "hover:bg-gray-500",
    ],
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-10 shadow-md">
      <div className={`bg-gray-800 flex justify-between items-center p-6 rounded-lg h-13`}>
        <div className="mr-8 flex flex-row items-center">
          <img className="h-12 w-13" src="/images/eventhubLogo.png" alt="EventHub Logo" />
          <h1 className="text-white text-3xl mt-4 font-bold ml-2">EventHub</h1>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-6 md:m-auto">
          <Link to="/home" className={`${colors.green[0]} ${colors.green[1]} text-xl font-bold`}>Home</Link>
          <Link to="/about" className={`${colors.orange[0]} ${colors.orange[1]} text-xl font-bold`}>About</Link>
          <Link to="/contact" className={`${colors.red[0]} ${colors.red[1]} text-xl font-bold`}>Contact</Link>
        </div>
        <div className="hidden md:block">
          {!isLoggedIn && (
            <>
              <Link to="/signup" className={`${colors.gray[1]} ${colors.gray[0]} ${colors.gray[2]} py-2 px-3 font-bold rounded-full mr-2`}>Sign Up</Link>
              <Link to="/login" className={`${colors.gray[1]} ${colors.gray[0]} ${colors.gray[2]} py-2 px-3 font-bold rounded-full`}>Log In</Link>
            </>
          )}
          {isLoggedIn && (
            <button onClick={handleLogoutConfirmation} className={`${colors.gray[1]} ${colors.gray[0]} ${colors.gray[2]} py-2 px-3 font-bold rounded-full`}>Log Out</button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleDropdown} className="text-gray-300 text-4xl focus:outline-none hover:text-green-400">&#8801;</button>
        </div>
      </div>
      <div ref={dropdownRef} className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="p-4 ml-[60%] w-[35%] mr-[5%] rounded-lg shadow-lg bg-white">
          <Link to="/home" className={`${colors.green[0]} py-2 text-lg block mt-2`}>Home</Link>
          <Link to="/about" className={`${colors.orange[0]} py-2 text-lg block`}>About</Link>
          <Link to="/contact" className={`${colors.red[0]} py-2 text-lg block`}>Contact</Link>
          <div className="flex flex-col">
            {!isLoggedIn && (
              <>
                <Link to="/signup" className={`${colors.gray[1]} ${colors.gray[0]} ${colors.gray[2]} py-2 px-4 rounded-full mt-4 m-auto`}>Sign Up</Link>
                <Link to="/login" className={`${colors.gray[1]} ${colors.gray[0]} ${colors.gray[2]} py-2 px-4 rounded-full mt-4 m-auto`}>Log In</Link>
              </>
            )}
            {isLoggedIn && (
              <button onClick={handleLogoutConfirmation} className={`${colors.gray[1]} ${colors.gray[0]} ${colors.gray[2]} py-2 px-4 rounded-full mt-4 m-auto`}>Log Out</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
