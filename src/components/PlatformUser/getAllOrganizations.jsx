// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from React Router


// const AllOrgs=()=>{

//   const [organizations, setOrganizations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

  
//   useEffect(() => {
//     fetchOrganizations();
//   }, []);

//   // Fetch organizations data from backend API
//   async function fetchOrganizations() {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_KEY}/Organization/getAllOrgs', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in the headers
//         },
//       });
//       const data = await response.json();
//       setOrganizations(data);
//     } catch (error) {
//       console.error('Error fetching organizations:', error);
//     }
//   }

//   // Filter organizations based on search term
//   const filteredOrganizations = organizations.filter(org =>
//     org.Name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mt-36 mx-auto py-8">
//     <h1 className="text-2xl text-center font-bold mb-4">All Organizations</h1>
//     <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by organization name"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="border border-gray-300 rounded-md px-4 py-2 w-full"
//         />
//       </div>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    
//       {filteredOrganizations.map(org => (
//         <Link key={org._id} to={`/orgProfile/${org._id}`} className="block bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
//           <div className="p-4">
//             <h2 className="text-lg font-semibold">{org.Name}</h2>
//             <img 
//               src={org.ImagePath || 'https://via.placeholder.com/300'}
//               alt="Organization Image"
//               className="w-full h-48 object-cover mt-4"
//             />
//           </div>
//         </Link>
//       ))}
//     </div>
//   </div>
//   );
// }

// export default AllOrgs;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import ClipLoader from 'react-spinners/ClipLoader'; // Import a spinner component

const AllOrgs = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Fetch organizations data from backend API
  async function fetchOrganizations() {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/Organization/getAllOrgs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in the headers
        },
      });
      const data = await response.json();
      setOrganizations(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  }

  // Filter organizations based on search term
  const filteredOrganizations = organizations.filter(org =>
    org.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-36 mx-auto py-8">
      <h1 className="text-2xl text-center font-bold mb-4">All Organizations</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by organization name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        ) : (
          filteredOrganizations.map(org => (
            <Link key={org._id} to={`/orgProfile/${org._id}`} className="block bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
              <div className="p-4">
                <h2 className="text-lg font-semibold">{org.Name}</h2>
                <img 
                  src={org.ImagePath || 'https://via.placeholder.com/300'}
                  alt="Organization Image"
                  className="w-full h-48 object-cover mt-4"
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default AllOrgs;


