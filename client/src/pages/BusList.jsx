// import React from 'react';

// const BusList = () => {
//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-4 text-gray-600">
//         <div>
//           <span className="font-bold text-gray-800">70 Buses</span>
//           <span className="ml-1">found</span>
//         </div>
        
//         {/* <div className="flex items-center gap-6">
//           <span className="font-medium">SORT BY:</span>
//           <button className="hover:text-gray-800">Departure</button>
//           <button className="hover:text-gray-800">Duration</button>
//           <button className="hover:text-gray-800">Arrival</button>
//           <button className="hover:text-gray-800">Ratings</button>
//           <button className="hover:text-gray-800">Fare</button>
//           <button className="hover:text-gray-800">Seats Available</button>
//         </div> */}
//       </div>

//       {/* Bus Card */}
//       <div className="border rounded-lg bg-white shadow-sm mb-4">
//         <div className="p-4">
//           <div className="grid grid-cols-12 gap-4">
//             {/* Bus Info */}
//             <div className="col-span-3">
//               <h3 className="text-lg font-semibold">Sugama Tourist</h3>
//               <p className="text-sm text-gray-600">NON A/C Sleeper (2+1)</p>
//               <div className="flex items-center gap-3 mt-2">
//                 {/* <img src="/path-to-icons/bed.svg" alt="bed" className="w-5 h-5" />
//                 <img src="/path-to-icons/water.svg" alt="water" className="w-5 h-5" />
//                 <img src="/path-to-icons/charging.svg" alt="charging" className="w-5 h-5" />
//                 <img src="/path-to-icons/location.svg" alt="location" className="w-5 h-5" /> */}
//                 <span className="text-gray-600"></span>
//                 <div className="flex items-center text-blue-600">
//                   {/* <img src="/path-to-icons/tracking.svg" alt="tracking" className="w-5 h-5" /> */}
//                   {/* <span className="ml-1">Live Tracking</span> */}
//                 </div>
//               </div>
//             </div>

//             {/* Time and Location */}
//             <div className="col-span-2 text-center">
//               <div className="text-xl font-bold">22:45</div>
//               <div className="text-sm text-gray-600">Yeshwantpur</div>
//             </div>

//             {/* Duration */}
//             <div className="col-span-2 text-center">
//               <div className="text-gray-600">07h 01m</div>
//             </div>

//             {/* Arrival */}
//             <div className="col-span-2 text-center">
//               <div className="text-xl font-bold">05:46</div>
//               <div className="text-sm text-gray-600">16-Jan</div>
//               <div className="text-sm text-gray-600">Pvs Circle</div>
//             </div>

//             {/* Ratings */}
//             <div className="col-span-1 text-center">
//               <div className="inline-flex items-center bg-green-500 text-white px-2 py-1 rounded">
//                 <span>★ 4.5</span>
//               </div>
//               <div className="text-sm text-gray-600 mt-1">374</div>
//             </div>

//             {/* Price */}
//             <div className="col-span-1 text-right">
//               <div className="text-sm text-gray-600">Starts from</div>
//               <div className="text-sm text-gray-500 line-through">INR 600</div>
//               <div className="text-xl font-bold">540</div>
//               <div className="text-sm text-red-500">redDeal applied</div>
//             </div>

//             {/* Seats */}
//             <div className="col-span-1 text-right">
//               <div className="text-sm font-medium">9 Seats available</div>
//               <div className="text-sm text-gray-600">2 Window</div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
//           <div className="flex space-x-4 text-gray-600 text-sm">
//             <button className="hover:text-gray-800">Amenities</button>
//             <button className="hover:text-gray-800">Bus Photos</button>
//             <button className="hover:text-gray-800">Boarding & Dropping Points</button>
//             <button className="hover:text-gray-800">Reviews</button>
//             <button className="hover:text-gray-800">Booking policies</button>
//           </div>
//           <button onClick={() => (window.location.href = '/bus/:id')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//             VIEW SEATS
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusList;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BusList = () => {
  const location = useLocation();
  const { from, to, date } = location.state || {}; // Retrieve user input from Home.jsx

  const [filteredBuses, setFilteredBuses] = useState([]);
  const [message, setMessage] = useState("Loading buses...");
  const [activeBusId, setActiveBusId] = useState(null); // To track the toggled bus

  // Sample bus data
  const buses = [
    {
      id: 1,
      name: "Sugama Tourist",
      type: "NON A/C Sleeper (2+1)",
      departure: "22:45",
      arrival: "05:46",
      duration: "07h 01m",
      ratings: 4.5,
      reviews: 374,
      price: 540,
      originalPrice: 600,
      seatsAvailable: 9,
      windowSeats: 2,
      from: "Bangalore",
      to: "Mysore",
      date: "2025-01-16",
      boardingPoints: [
        "Majestic",
        "Shanti Nagar Bus Stand",
        "Jalahalli Metro Station",
        "Yeshwanthpur",
      ],
      droppingPoints: [
        "Mysuru RTC Bus Stand",
        "Mysuru Railway Station",
      ],
    },
    {
      id: 2,
      name: "KSRTC Airavat",
      type: "A/C Sleeper (2+1)",
      departure: "21:30",
      arrival: "04:15",
      duration: "06h 45m",
      ratings: 4.7,
      reviews: 520,
      price: 720,
      originalPrice: 800,
      seatsAvailable: 12,
      windowSeats: 3,
      from: "Chennai",
      to: "Coimbatore",
      date: "2025-01-16",
      boardingPoints: [
        "Koyambedu",
        "Porur",
        "Guindy",
        "Tambaram",
      ],
      droppingPoints: [
        "Gandhipuram",
        "Singanallur",
      ],
    },
  ];

  useEffect(() => {
    if (from && to && date) {
      const filtered = buses.filter(
        (bus) =>
          bus.from.toLowerCase() === from.toLowerCase() &&
          bus.to.toLowerCase() === to.toLowerCase() &&
          bus.date === date.toISOString().split("T")[0]
      );

      if (filtered.length > 0) {
        setFilteredBuses(filtered);
        setMessage(`${filtered.length} buses found for your search.`);
      } else {
        setFilteredBuses([]);
        setMessage("No buses found for your search criteria.");
      }
    } else {
      setFilteredBuses([]);
      setMessage("Please provide valid search criteria.");
    }
  }, [from, to, date]);

  const togglePoints = (busId) => {
    setActiveBusId(activeBusId === busId ? null : busId);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4 text-gray-600">
        <div>
          <span className="font-bold text-gray-800">
            {filteredBuses.length > 0 ? filteredBuses.length : 0} Buses
          </span>
          <span className="ml-1">found</span>
        </div>
      </div>

      <div className="text-gray-600 mb-4">{message}</div>

      {filteredBuses.map((bus) => (
        <div key={bus.id} className="border rounded-lg bg-white shadow-sm mb-4">
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <h3 className="text-lg font-semibold">{bus.name}</h3>
                <p className="text-sm text-gray-600">{bus.type}</p>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-xl font-bold">{bus.departure}</div>
                <div className="text-sm text-gray-600">{from}</div>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-gray-600">{bus.duration}</div>
              </div>
              <div className="col-span-2 text-center">
                <div className="text-xl font-bold">{bus.arrival}</div>
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
                <div className="text-sm font-medium">
                  {bus.seatsAvailable} Seats available
                </div>
                <div className="text-sm text-gray-600">{bus.windowSeats} Window</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
            <div className="flex space-x-4 text-gray-600 text-sm">
              <button className="hover:text-gray-800">Amenities</button>
              <button className="hover:text-gray-800">Bus Photos</button>
              <button
                className="hover:text-gray-800"
                onClick={() => togglePoints(bus.id)}
              >
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
};

export default BusList;
