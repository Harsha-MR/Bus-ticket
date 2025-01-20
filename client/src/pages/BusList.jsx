
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Buses() {
//   const { state } = useLocation();
//   const { from, to, date } = state || {};
//   const [buses, setBuses] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true); // Added loading state
//   const [activeBusId, setActiveBusId] = useState(null);
//   const [visibleSections, setVisibleSections] = useState({});

//   // Format bus time in 12-hour format
//   const formatBusTime = (startTime) => {
//     const date = new Date(startTime);

//     // Get hours and minutes
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'pm' : 'am';

//     // Convert to 12-hour format
//     hours = hours % 12;
//     hours = hours ? hours : 12; // 12-hour format, "0" becomes "12"
//     minutes = minutes < 10 ? '0' + minutes : minutes;

//     // Get the day and month
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // months are 0-based
//     const formattedDate = `${hours}:${minutes} ${ampm} ${day}-${month}`;

//     return formattedDate;
//   }

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/buses?from=${from}&to=${to}&date=${date}`
//         );
//         setBuses(response.data); // Assuming response.data contains an array of buses
//         setLoading(false); // Set loading to false once data is received
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch buses");
//         setLoading(false); // Stop loading when there's an error
//       }
//     };

//     if (from && to && date) {
//       fetchBuses();
//     }
//   }, [from, to, date]);

//   const togglePoints = (busId) => {
//     setActiveBusId((prevId) => (prevId === busId ? null : busId));
//   };

//   const toggleSection = (busId, section) => {
//     setVisibleSections((prevSections) => ({
//       ...prevSections,
//       [busId]: {
//         ...prevSections[busId],
//         [section]: !prevSections[busId]?.[section],
//       },
//     }));
//   };

//   if (loading) {
//     return <div>Loading buses...</div>; // Loading indicator while fetching
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="flex items-center justify-between mb-4 text-gray-600">
//         <div>
//           <span className="font-bold text-gray-800">
//             {buses.length > 0 ? buses.length : 0} Buses
//           </span>
//           <span className="ml-1">found</span>
//         </div>
//       </div>

//       {buses.length === 0 && <div>No buses available for the selected route.</div>}
//       {buses.map((bus) => (
//         <div key={bus.id} className="border rounded-lg bg-white shadow-sm mb-4">
//           <div className="p-4">
//             <div className="grid grid-cols-12 gap-4">
//               <div className="col-span-3">
//                 <h3 className="text-lg font-semibold">{bus.name}</h3>
//                 <p className="text-sm text-gray-600">{bus.type}</p>
//               </div>
//               <div className="col-span-2 text-center">
//                 <div className="text-xl font-bold">{formatBusTime(bus.startTime)}</div>
//                 <div className="text-sm text-gray-600">{from}</div>
//               </div>
//               <div className="col-span-2 text-center">
//                 <div className="text-gray-600">{bus.duration}</div>
//               </div>
//               <div className="col-span-2 text-center">
//                 <div className="text-xl font-bold">{formatBusTime(bus.endTime)}</div>
//                 <div className="text-sm text-gray-600">{to}</div>
//               </div>
//               <div className="col-span-1 text-center">
//                 <div className="inline-flex items-center bg-green-500 text-white px-2 py-1 rounded">
//                   <span>★ {bus.ratings}</span>
//                 </div>
//                 <div className="text-sm text-gray-600 mt-1">Reviews {bus.reviews}</div>
//               </div>
//               <div className="col-span-1 text-right">
//                 <div className="text-sm text-gray-600">Starts from</div>
//                 <div className="text-sm text-gray-500 line-through">
//                   INR {bus.originalPrice}
//                 </div>
//                 <div className="text-xl font-bold">{bus.price}</div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
//             <div className="flex space-x-4 text-gray-600 text-sm">
//               <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'amenities')}>
//                 Amenities
//               </button>
//               <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'photos')}>
//                 Bus Photos
//               </button>
//               <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'reviews')}>
//                 Reviews
//               </button>
//               <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'bookingPolicies')}>
//                 Booking Policies
//               </button>
//               <button className="hover:text-gray-800" onClick={() => togglePoints(bus.id)}>
//                 Boarding & Dropping Points
//               </button>
//             </div>
//             <button
//               onClick={() => (window.location.href = `/bus/${bus.id}`)}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               VIEW SEATS
//             </button>
//           </div>

//           {activeBusId === bus.id && (
//             <div className="p-4 bg-gray-100">
//               <h4 className="font-bold text-gray-800">Boarding Points</h4>
//               <ul className="list-disc pl-5 text-gray-600">
//                 {bus.boardingPoints && bus.boardingPoints.length > 0 ? (
//                   bus.boardingPoints.map((point, index) => (
//                     <li key={index}>{point.bpName || point}</li> 
//                   ))
//                 ) : (
//                   <li>No boarding points available</li>
//                 )}
//               </ul>
//               <h4 className="font-bold text-gray-800 mt-4">Dropping Points</h4>
//               <ul className="list-disc pl-5 text-gray-600">
//                 {bus.dropingPoints && bus.dropingPoints.length > 0 ? (
//                   bus.dropingPoints.map((point, index) => (
//                     <li key={index}>{point.dpName || point}</li> 
//                   ))
//                 ) : (
//                   <li>No dropping points available</li>
//                 )}
//               </ul>
//             </div>
//           )}

//           {/* Amenities Section */}
//           {visibleSections[bus.id]?.amenities && (
//             <div className="p-4 bg-gray-50">
//               <h4 className="font-bold text-gray-800">Amenities</h4>
//               <ul className="list-disc pl-5 text-gray-600">
//                 {bus.amenities ? bus.amenities.map((amenity, index) => (
//                   <li key={index}>{amenity}</li>
//                 )) : <li>No amenities available</li>}
//               </ul>
//             </div>
//           )}

//           {/* Bus Photos Section */}
//           {visibleSections[bus.id]?.photos && (
//             <div className="p-4 bg-gray-50">
//               <h4 className="font-bold text-gray-800">Bus Photos</h4>
//               <div className="flex space-x-4">
//                 {bus.photos ? bus.photos.map((photo, index) => (
//                   <img key={index} src={photo} alt={`Bus photo ${index}`} className="w-32 h-32 object-cover" />
//                 )) : <p>No photos available</p>}
//               </div>
//             </div>
//           )}

//           {/* Reviews Section */}
//           {visibleSections[bus.id]?.reviews && (
//             <div className="p-4 bg-gray-50">
//               <h4 className="font-bold text-gray-800">Reviews</h4>
//               <p>{bus.reviews ? `${bus.reviews} reviews` : "No reviews yet"}</p>
//             </div>
//           )}

//           {/* Booking Policies Section */}
//           {visibleSections[bus.id]?.bookingPolicies && (
//             <div className="p-4 bg-gray-50">
//               <h4 className="font-bold text-gray-800">Booking Policies</h4>
//               <p>{bus.bookingPolicies || "No booking policies available"}</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Buses;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Buses() {
  const { state } = useLocation();
  const { from, to, date } = state || {};
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const [activeBusId, setActiveBusId] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const navigate = useNavigate(); // Initialize the navigate hook

  // Format bus time in 12-hour format
  const formatBusTime = (startTime) => {
    const date = new Date(startTime);

    // Get hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour format, "0" becomes "12"
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Get the day and month
    const day = date.getDate();
    const month = date.getMonth() + 1; // months are 0-based
    const formattedDate = `${hours}:${minutes} ${ampm} ${day}-${month}`;

    return formattedDate;
  }

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/buses?from=${from}&to=${to}&date=${date}`
        );
        setBuses(response.data); // Assuming response.data contains an array of buses
        setLoading(false); // Set loading to false once data is received
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch buses");
        setLoading(false); // Stop loading when there's an error
      }
    };

    if (from && to && date) {
      fetchBuses();
    }
  }, [from, to, date]);

  const togglePoints = (busId) => {
    setActiveBusId((prevId) => (prevId === busId ? null : busId));
  };

  const toggleSection = (busId, section) => {
    setVisibleSections((prevSections) => ({
      ...prevSections,
      [busId]: {
        ...prevSections[busId],
        [section]: !prevSections[busId]?.[section],
      },
    }));
  };

  const handleBooking = (busId) => {
    navigate(`/bus/${busId}`); // Navigate to BusDetails page with the busId as a parameter
  };

  if (loading) {
    return <div>Loading buses...</div>; // Loading indicator while fetching
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4 text-gray-600">
        <div>
          <span className="font-bold text-gray-800">
            {buses.length > 0 ? buses.length : 0} Buses
          </span>
          <span className="ml-1">found</span>
        </div>
      </div>

      {buses.length === 0 && <div>No buses available for the selected route.</div>}
      {buses.map((bus) => (
        <div key={bus.id} className="border rounded-lg bg-white shadow-sm mb-4">
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <h3 className="text-lg font-semibold">{bus.name}</h3>
                <p className="text-sm text-gray-600">{bus.type}</p>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-xl font-bold">{formatBusTime(bus.startTime)}</div>
                <div className="text-sm text-gray-600">{from}</div>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-gray-600">{bus.duration}</div>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-xl font-bold">{formatBusTime(bus.endTime)}</div>
                <div className="text-sm text-gray-600">{to}</div>
              </div>
              <div className="col-span-1 text-center">
                <div className="inline-flex items-center bg-green-500 text-white px-2 py-1 rounded">
                  <span>★ {bus.ratings}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">Reviews {bus.reviews}</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="text-sm text-gray-600">Starts from</div>
                <div className="text-sm text-gray-500 line-through">
                  INR {bus.originalPrice}
                </div>
                <div className="text-xl font-bold">{bus.price}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
            <div className="flex space-x-4 text-gray-600 text-sm">
              <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'amenities')}>
                Amenities
              </button>
              <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'photos')}>
                Bus Photos
              </button>
              <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'reviews')}>
                Reviews
              </button>
              <button className="hover:text-gray-800" onClick={() => toggleSection(bus.id, 'bookingPolicies')}>
                Booking Policies
              </button>
              <button className="hover:text-gray-800" onClick={() => togglePoints(bus.id)}>
                Boarding & Dropping Points
              </button>
            </div>
            <button
              onClick={() => handleBooking(bus.id)} // Navigate to BusDetails page when clicked
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              VIEW SEATS
            </button>
          </div>

          {activeBusId === bus.id && (
            <div className="p-4 bg-gray-100">
              <h4 className="font-bold text-gray-800">Boarding Points</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {bus.boardingPoints && bus.boardingPoints.length > 0 ? (
                  bus.boardingPoints.map((point, index) => (
                    <li key={index}>{point.bpName || point}</li>
                  ))
                ) : (
                  <li>No boarding points available</li>
                )}
              </ul>
              <h4 className="font-bold text-gray-800 mt-4">Dropping Points</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {bus.dropingPoints && bus.dropingPoints.length > 0 ? (
                  bus.dropingPoints.map((point, index) => (
                    <li key={index}>{point.dpName || point}</li>
                  ))
                ) : (
                  <li>No dropping points available</li>
                )}
              </ul>
            </div>
          )}

          {/* Amenities Section */}
          {visibleSections[bus.id]?.amenities && (
            <div className="p-4 bg-gray-50">
              <h4 className="font-bold text-gray-800">Amenities</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {bus.amenities ? bus.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                )) : <li>No amenities available</li>}
              </ul>
            </div>
          )}

          {/* Bus Photos Section */}
          {visibleSections[bus.id]?.photos && (
            <div className="p-4 bg-gray-50">
              <h4 className="font-bold text-gray-800">Bus Photos</h4>
              <div className="flex space-x-4">
                {bus.photos ? bus.photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Bus photo ${index}`} className="w-32 h-32 object-cover" />
                )) : <p>No photos available</p>}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {visibleSections[bus.id]?.reviews && (
            <div className="p-4 bg-gray-50">
              <h4 className="font-bold text-gray-800">Reviews</h4>
              <p>{bus.reviews ? `${bus.reviews} reviews` : "No reviews yet"}</p>
            </div>
          )}

          {/* Booking Policies Section */}
          {visibleSections[bus.id]?.bookingPolicies && (
            <div className="p-4 bg-gray-50">
              <h4 className="font-bold text-gray-800">Booking Policies</h4>
              <p>{bus.bookingPolicies || "No booking policies available"}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Buses;
