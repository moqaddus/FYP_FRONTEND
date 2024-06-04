import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function HomeDiv() {

  

  let slides = [
    "/images/e1.png",
    "/images/e2.jpg",
    "/images/e3.jpg",
    "/images/e4.jpg"
  ];
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  return (
    
    
    <>


<div className="w-full md:w-[80%] h-auto m-auto pt-1  shadow-black shadow-lg sm:mt-6">
      <Carousel>
        <div className="overflow-hidden relative">
          <div
            className={`flex transition ease-out duration-40`}
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((s) => {
              return <img className="object-fill" src={s} />;
            })}
          </div>

          <div className="absolute top-0 h-full w-full justify-between items-center flex text-gray-400 px-10 text-3xl">
            <button onClick={previousSlide}>
              <BsFillArrowLeftCircleFill />
            </button>
            <button onClick={nextSlide}>
              <BsFillArrowRightCircleFill />
            </button>
          </div>

          <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
            {slides.map((s, i) => {
              return (
                <div
                  onClick={() => {
                    setCurrent(i);
                  }}
                  key={"circle" + i}
                  className={`rounded-full w-5 h-5 cursor-pointer  ${
                    i == current ? "bg-white" : "bg-gray-500"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </Carousel>
    </div>


      <div className="h-auto w-full flex flex-wrap flex-col items-center text-center mt-9">
        <h1 className="text-green-600 text-4xl md:text-5xl font-extrabold">
          {" "}
          EventHub{" "}
        </h1>
        <p className="text-orange-500 text-xl md:text-3xl font-sans font-bold">
          Create | Discover | Thrive
        </p>
        <div className="bg-yellow-200 w-[30%] h-[6px] mt-2 rounded-sm"></div>
      </div>

      <div className="h-auto w-full flex flex-wrap justify-evenly p-4 mt-5 mb-8 ">
        <div className="max-w-sm  rounded-lg  overflow-hidden shadow-xl shadow-gray-400 hover:shadow-gray-700 transition duration-1000 mb-8">
          <img
            className="w-[300px] h-[250px] hover:w-[350px] hover:h-[300px] rounded-md transition duration-[2000ms]"
            src="/images/org.jpg"
            alt=""
          />
          <p className="text-center font-bold text-4xl text-orange-600 mt-5">
            2000+
          </p>
          <p className="text-center font-bold text-2xl text-yellow-800 mb-6">
            Organizations
          </p>
        </div>

        <div className="max-w-sm  rounded-lg  overflow-hidden shadow-xl shadow-gray-400 hover:shadow-gray-700 transition duration-1000 mb-8">
          <img
            className="w-[300px] h-[250px] hover:w-[350px] hover:h-[300px] rounded-md transition duration-[2000ms]"
            src="/images/users.png"
            alt=""
          />
          <p className="text-center font-bold text-4xl text-orange-600 mt-5">
            50000+
          </p>
          <p className="text-center font-bold text-2xl text-green-600 mb-6">
            Users
          </p>
        </div>

        <div className="max-w-sm rounded-lg  overflow-hidden shadow-xl shadow-gray-400 hover:shadow-gray-700 transition duration-1000 mb-8">
          <img
            className="w-[300px] h-[250px] hover:w-[350px] hover:h-[300px] rounded-md transition duration-[2000ms]"
            src="/images/events.jpeg"
            alt=""
          />
          <p className="text-center font-bold text-4xl text-orange-600 mt-5">
            10000+
          </p>
          <p className="text-center font-bold text-2xl text-red-600 mb-6">
            Events
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <h1 className=" text-orange-700 text-4xl font-sans font-bold hover:text-5xl transition duration-1000">
          {" "}
          Want To Explore More Event?{" "}
        </h1>
        <Link to="/signUp"  className="text-green-400 hover:text-green-500 text-bold text-3xl font-sans ml-2 transition duration-1000">
           Click Here
        </Link>
      </div>
    </>
  );
}

export default HomeDiv;
