// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const AttendeeList = () => {
//   const { eventId } = useParams();
//   const [attendees, setAttendees] = useState([]);

//   useEffect(() => {
//     const fetchAttendees = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_KEY}/Events/get/${eventId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setAttendees(response.data);
//       } catch (error) {
//         console.error("Error fetching attendees:", error);
//       }
//     };

//     fetchAttendees();
//   }, [eventId]);

//   return (
//     <div className="container mx-auto p-4  mt-28">
//       <h2 className="text-3xl font-bold mb-4">Attendee List</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {attendees.map((attendee, index) => (
//           <div key={index} className="p-4 border rounded shadow-md">
//             <img
//               src={attendee.imagePath}
//               alt={attendee.name}
//               className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
//             />
//             <h3 className="text-xl text-center">{attendee.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AttendeeList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const AttendeeList = () => {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/Events/get/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAttendees(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };

    fetchAttendees();
  }, [eventId]);

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-3xl font-bold mb-4">Attendee List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {attendees.map((attendee, index) => (
          <Link
            key={index}
            to={`/userProfile/${attendee.id}`}
            className="p-4 border rounded shadow-md"
          >
            <img
              src={attendee.imagePath}
              alt={attendee.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl text-center">{attendee.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AttendeeList;
