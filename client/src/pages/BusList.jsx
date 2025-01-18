

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const BusList = () => {
//   const location = useLocation();
//   const { from, to, date } = location.state || {}; // Retrieve user input from Home.jsx

//   const [filteredBuses, setFilteredBuses] = useState([]);
//   const [message, setMessage] = useState("Loading buses...");
//   const [activeBusId, setActiveBusId] = useState(null); // To track the toggled bus

//   // Sample bus data
//   const buses = [
//     {
//       id: 1,
//       name: "Sugama Tourist",
//       type: "NON A/C Sleeper (2+1)",
//       departure: "22:45",
//       arrival: "05:46",
//       duration: "07h 01m",
//       ratings: 4.5,
//       reviews: 374,
//       price: 540,
//       originalPrice: 600,
//       seatsAvailable: 9,
//       windowSeats: 2,
//       from: "Bangalore",
//       to: "Mysore",
//       date: "2025-01-18",
//       boardingPoints: [
//         "Majestic",
//         "Shanti Nagar Bus Stand",
//         "Jalahalli Metro Station",
//         "Yeshwanthpur",
//       ],
//       droppingPoints: [
//         "Mysuru RTC Bus Stand",
//         "Mysuru Railway Station",
//       ],
//     },
//     {
//       id: 2,
//       name: "KSRTC Airavat",
//       type: "A/C Sleeper (2+1)",
//       departure: "21:30",
//       arrival: "04:15",
//       duration: "06h 45m",
//       ratings: 4.7,
//       reviews: 520,
//       price: 720,
//       originalPrice: 800,
//       seatsAvailable: 12,
//       windowSeats: 3,
//       from: "Chennai",
//       to: "Coimbatore",
//       date: "2025-01-18",
//       boardingPoints: [
//         "Koyambedu",
//         "Porur",
//         "Guindy",
//         "Tambaram",
//       ],
//       droppingPoints: [
//         "Gandhipuram",
//         "Singanallur",
//       ],
//     },
//   ];

//   useEffect(() => {
//     if (from && to && date) {
//       const filtered = buses.filter(
//         (bus) =>
//           bus.from.toLowerCase() === from.toLowerCase() &&
//           bus.to.toLowerCase() === to.toLowerCase() &&
//           bus.date === date.toISOString().split("T")[0]
//       );

//       if (filtered.length > 0) {
//         setFilteredBuses(filtered);
//         setMessage(`${filtered.length} buses found for your search.`);
//       } else {
//         setFilteredBuses([]);
//         setMessage("No buses found for your search criteria.");
//       }
//     } else {
//       setFilteredBuses([]);
//       setMessage("Please provide valid search criteria.");
//     }
//   }, [from, to, date]);

//   const togglePoints = (busId) => {
//     setActiveBusId(activeBusId === busId ? null : busId);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="flex items-center justify-between mb-4 text-gray-600">
//         <div>
//           <span className="font-bold text-gray-800">
//             {filteredBuses.length > 0 ? filteredBuses.length : 0} Buses
//           </span>
//           <span className="ml-1">found</span>
//         </div>
//       </div>

//       <div className="text-gray-600 mb-4">{message}</div>

//       {filteredBuses.map((bus) => (
//         <div key={bus.id} className="border rounded-lg bg-white shadow-sm mb-4">
//           <div className="p-4">
//             <div className="grid grid-cols-12 gap-4">
//               <div className="col-span-3">
//                 <h3 className="text-lg font-semibold">{bus.name}</h3>
//                 <p className="text-sm text-gray-600">{bus.type}</p>
//               </div>
//               <div className="col-span-2 text-center">
//                 <div className="text-xl font-bold">{bus.departure}</div>
//                 <div className="text-sm text-gray-600">{from}</div>
//               </div>
//               <div className="col-span-2 text-center">
//                 <div className="text-gray-600">{bus.duration}</div>
//               </div>
//               <div className="col-span-2 text-center">
//                 <div className="text-xl font-bold">{bus.arrival}</div>
//                 <div className="text-sm text-gray-600">{to}</div>
//               </div>
//               <div className="col-span-1 text-center">
//                 <div className="inline-flex items-center bg-green-500 text-white px-2 py-1 rounded">
//                   <span>★ {bus.ratings}</span>
//                 </div>
//                 <div className="text-sm text-gray-600 mt-1">{bus.reviews}</div>
//               </div>
//               <div className="col-span-1 text-right">
//                 <div className="text-sm text-gray-600">Starts from</div>
//                 <div className="text-sm text-gray-500 line-through">
//                   INR {bus.originalPrice}
//                 </div>
//                 <div className="text-xl font-bold">{bus.price}</div>
//               </div>
//               <div className="col-span-1 text-right">
//                 <div className="text-sm font-medium">
//                   {bus.seatsAvailable} Seats available
//                 </div>
//                 <div className="text-sm text-gray-600">{bus.windowSeats} Window</div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
//             <div className="flex space-x-4 text-gray-600 text-sm">
//               <button className="hover:text-gray-800">Amenities</button>
//               <button className="hover:text-gray-800">Bus Photos</button>
//               <button
//                 className="hover:text-gray-800"
//                 onClick={() => togglePoints(bus.id)}
//               >
//                 Boarding & Dropping Points
//               </button>
//               <button className="hover:text-gray-800">Reviews</button>
//               <button className="hover:text-gray-800">Booking policies</button>
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
//                 {bus.boardingPoints.map((point, index) => (
//                   <li key={index}>{point}</li>
//                 ))}
//               </ul>
//               <h4 className="font-bold text-gray-800 mt-4">Dropping Points</h4>
//               <ul className="list-disc pl-5 text-gray-600">
//                 {bus.droppingPoints.map((point, index) => (
//                   <li key={index}>{point}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BusList;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Buses() {
  const { state } = useLocation();
  const { from, to, date } = state || {};
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const [activeBusId, setActiveBusId] = useState(null);
   // To handle toggling of boarding & dropping points
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
      {console.log(buses)}
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
                <div className="text-gray-600">{formatBusTime(bus.startTime) - formatBusTime(bus.endTime)}</div>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-xl font-bold">{formatBusTime(bus.endTime)}</div>
                <div className="text-sm text-gray-600">{to}</div>
              </div>
              <div className="col-span-1 text-center">
                <div className="inline-flex items-center bg-green-500 text-white px-2 py-1 rounded">
                  <span>★ {bus.ratings}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{bus.reviews}</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="text-sm text-gray-600">Starts from</div>
                <div className="text-sm text-gray-500 line-through">
                  INR {bus.originalPrice}
                </div>
                <div className="text-xl font-bold">{bus.price}</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="text-sm font-medium">{bus.seatsAvailable} Seats available</div>
                <div className="text-sm text-gray-600">{bus.windowSeats} Window</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
            <div className="flex space-x-4 text-gray-600 text-sm">
              <button className="hover:text-gray-800">Amenities</button>
              <button className="hover:text-gray-800">Bus Photos</button>
              <button className="hover:text-gray-800" onClick={() => togglePoints(bus.id)}>
                Boarding & Dropping Points
              </button>
              <button className="hover:text-gray-800">Reviews</button>
              <button className="hover:text-gray-800">Booking policies</button>
            </div>
            <button
              onClick={() => (window.location.href = `/bus/${bus.id}`)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              VIEW SEATS
            </button>
          </div>

          {activeBusId === bus.id && (
            <div className="p-4 bg-gray-100">
              <h4 className="font-bold text-gray-800">Boarding Points</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {bus.boardingPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <h4 className="font-bold text-gray-800 mt-4">Dropping Points</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {bus.droppingPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Buses;
