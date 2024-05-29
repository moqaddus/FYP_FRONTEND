import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faGithub,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const colors = {
  green: ["text-green-400", "hover:text-green-500"],
  orange: ["text-orange-400", "hover:text-orange-500", "text-orange-500"],
  red: ["text-red-600", "hover:text-red-700"],
  blue: ["text-blue-400", "hover:text-blue-500"],
  gray: [
    "text-gray-800",
    "bg-gray-500",
    "hover:bg-gray-600",
    "hover:bg-gray-500",
  ],
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-20 rounded-lg">
      <div className="flex sm:flex-col md:flex-row px-8">
        <div className="flex flex-col ml-2 md:ml-8 ">
          <div className="mr-4">
            <img
              src="/images/eventhubLogo.png"
              alt="Logo"
              className=" h-20 w-20"
            />
            <h1
              className={`${colors.orange[2]} ${colors.green[1]} text-lg font-bold`}
            >
              EventHub
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center md:ml-[30%] ml-[5%]">
          <div className="flex justify-center mb-8">
            <a href="https://instagram.com" className="mx-4">
              <FontAwesomeIcon
                icon={faInstagram}
                className={`${colors.green[0]} ${colors.green[1]}  md:text-3xl text-2xl`}
              />
            </a>
            <a href="https://twitter.com" className="mx-4">
              <FontAwesomeIcon
                icon={faTwitter}
                className={`${colors.blue[0]} ${colors.blue[1]} md:text-3xl text-2xl`}
              />
            </a>
            <a href="https://github.com" className="mx-4">
              <FontAwesomeIcon
                icon={faGithub}
                className={`${colors.gray[1]} ${colors.gray[2]} md:text-3xl text-2xl`}
              />
            </a>
            <a href="https://linkedin.com" className="mx-4">
              <FontAwesomeIcon
                icon={faLinkedin}
                className={`${colors.orange[0]} ${colors.orange[1]} md:text-3xl text-2xl`}
              />
            </a>
            <a href="https://google.com" className="mx-4">
              <FontAwesomeIcon
                icon={faGoogle}
                className={`${colors.red[0]} ${colors.red[1]} md:text-3xl text-2xl`}
              />
            </a>
          </div>
          <div className="flex justify-center space-x-12 ">
            <a
              href="#"
              className={`${colors.green[0]} ${colors.green[1]}  md:text-xl font-bold`}
            >
              Home
            </a>
            <a
              href="#"
              className={`${colors.orange[0]} ${colors.orange[1]}  md:text-xl font-bold`}
            >
              About
            </a>
            <a
              href="#"
              className={`${colors.red[0]} ${colors.red[1]}  md:text-xl font-bold`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-4">
        © 2024 EventHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
