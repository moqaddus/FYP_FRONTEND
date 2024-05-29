import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarAlt,
  faBuilding,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  return (
    <>
      <div className="max-w-md md:max-w-4xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-lg shadow-gray-300">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
          About Us
        </h1>

        <div className="mb-8">
          <div className="flex">
            <h2 className="text-xl font-bold mt-2 mr-3 mb-4 text-orange-500">
              About EventHub
            </h2>
            <img
              src="/images/eventhubLogo.png"
              alt="Logo"
              className="h-10 w-10 "
            />
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to EventHub, your one-stop platform for organizing,
            discovering, and attending exciting events. EventHub is designed to
            cater to the needs of both event organizers and attendees, providing
            a seamless and enriching experience for all users.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex">
            <h2 className="text-xl font-bold mb-4 mr-3 text-orange-500">
              For Organizers:
            </h2>
            <FontAwesomeIcon
              icon={faBuilding}
              className="text-gray-600 hover:text-gray-900 text-3xl mr-2"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            At EventHub, we understand the importance of organizing successful
            events. Our platform empowers organizations to register and create
            engaging events effortlessly. With intuitive tools and features,
            organizers can showcase their events, upload event pictures, manage
            ticket sales, and interact with attendees seamlessly.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex">
            <h2 className="text-xl font-bold mb-4 mr-3 text-orange-500">
              For Attendees{" "}
            </h2>
            <FontAwesomeIcon
              icon={faUsers}
              className="text-green-600 hover:text-green-900 text-2xl mr-2"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Discovering and attending events has never been easier. With
            EventHub, users can explore a wide range of events across various
            categories. Whether you're interested in concerts, conferences,
            workshops, or community gatherings, EventHub has something for
            everyone. After signing up, users can purchase tickets conveniently,
            rate events based on their experiences, and even follow their
            favorite organizations to stay updated on upcoming events.
          </p>
        </div>

        <div>
          <div className="flex">
            <h2 className="text-xl font-bold mb-4 mr-3 text-orange-500">
              Join EventHub Today
            </h2>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-blue-500 hover:text-green-900 text-2xl mr-2"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're an organizer looking to host successful events or an
            attendee eager to explore exciting experiences, EventHub is your
            ultimate destination. Join us today and embark on a journey of
            endless possibilities in the world of events!
          </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div>
            <img
              src="/images/eventhubLogo.png"
              alt="Logo"
              className="md:h-[15rem] md:w-[15rem] w-24 h-24 "
            />
          </div>
          <div className="flex flex-col ml-4">
            <h2 className="text-xl  mb-4 text-orange-500 font-bold">
              Our Team:
            </h2>
            <p className="text-lg font-bold text-gray-700 leading-relaxed">
              Muhammad Ali
              <a href="mali536356@gmail.com" className="mx-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-red-500 hover:text-green-600"
                />
              </a>
            </p>
            <p className="text-lg font-bold text-gray-700 leading-relaxed">
              Maaz Tariq
              <a href="mali536356@gmail.com" className="mx-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-red-500 hover:text-green-600"
                />
              </a>
            </p>
            <p className="text-lg font-bold text-gray-700 leading-relaxed">
              Moqaddus Rafi
              <a href="mali536356@gmail.com" className="mx-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-red-500 hover:text-green-600"
                />
              </a>
            </p>
            <p className="text-lg font-bold text-gray-700 leading-relaxed">
              Tayabba Abdul Basit
              <a href="mali536356@gmail.com" className="mx-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-red-500 hover:text-green-600"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
