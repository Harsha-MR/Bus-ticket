import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBus, FaCalendarAlt, FaExchangeAlt } from "react-icons/fa"; // Importing icons
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [fromDropdown, setFromDropdown] = useState([]);
  const [toDropdown, setToDropdown] = useState([]);

  const southIndianCities = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Coimbatore",
    "Kochi",
    "Madurai",
    "Mysore",
    "Visakhapatnam",
    "Vijayawada",
    "Thiruvananthapuram",
  ];

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  // Generate all possible direct routes
  const possibleRoutes = southIndianCities.flatMap((source) =>
    southIndianCities
      .filter((destination) => source !== destination)
      .map((destination) => ({
        from: source,
        to: destination,
      }))
  );

  const handleSearch = async (e) => {
    e.preventDefault();

    // Check if the route is valid
    const isValidRoute = possibleRoutes.some(
      (route) =>
        route.from.toLowerCase() === from.toLowerCase() &&
        route.to.toLowerCase() === to.toLowerCase()
    );

    if (isValidRoute && from && to && date) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/buses/?from=${from}&to=${to}&date=${date}`
        );

        console.log(response.data); // Handle the bus data here if needed

        navigate("/buses", { state: { from, to, date } });
      } catch (error) {
        console.error("Error fetching buses:", error);
        alert("There was an error fetching bus data. Please try again later.");
      }
    } else {
      alert("Please select valid cities and a date for the trip.");
    }
  };

  const handleFromInput = (e) => {
    const input = e.target.value;
    setFrom(input);
    if (input.length > 0) {
      const filteredCities = southIndianCities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setFromDropdown(filteredCities);
    } else {
      setFromDropdown([]);
    }
  };

  const handleToInput = (e) => {
    const input = e.target.value;
    setTo(input);
    if (input.length > 0) {
      const filteredCities = southIndianCities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setToDropdown(filteredCities);
    } else {
      setToDropdown([]);
    }
  };

  const handleFromSelect = (city) => {
    setFrom(city);
    setFromDropdown([]);
  };

  const handleToSelect = (city) => {
    setTo(city);
    setToDropdown([]);
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">
            India's No. 1 Online Bus Ticket Booking Site
          </h1>
          <div className="max-w-3xl mx-auto bg-white rounded-lg p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-gray-700 mb-2">From</label>
                  <input
                    type="text"
                    value={from}
                    onChange={handleFromInput}
                    className="text-black w-full p-2 border rounded"
                    placeholder="Enter source city"
                  />
                  {fromDropdown.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto z-10">
                      {fromDropdown.map((city, index) => (
                        <li
                          key={index}
                          onClick={() => handleFromSelect(city)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-gray-700 mb-2">To</label>
                  <input
                    type="text"
                    value={to}
                    onChange={handleToInput}
                    className="text-black w-full p-2 border rounded"
                    placeholder="Enter destination city"
                  />
                  {toDropdown.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto z-10">
                      {toDropdown.map((city, index) => (
                        <li
                          key={index}
                          onClick={() => handleToSelect(city)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <DatePicker
                    selected={date ? new Date(date) : null}
                    onChange={handleDateChange}
                    className="text-black w-full p-2 border rounded"
                    minDate={new Date()}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700"
              >
                Search Buses
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose getBus?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBus className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">2000+ Bus Partners</h3>
            <p className="text-gray-600">
              Book tickets from a wide range of bus operators
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Cancellation</h3>
            <p className="text-gray-600">
              Get instant refund and reschedule options
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExchangeAlt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Customer Service</h3>
            <p className="text-gray-600">Get support anytime, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaBus, FaCalendarAlt, FaExchangeAlt } from "react-icons/fa";

// function Home() {
//   const navigate = useNavigate();
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [fromDropdown, setFromDropdown] = useState([]);
//   const [toDropdown, setToDropdown] = useState([]);

//   const southIndianCities = [
//     "Chennai",
//     "Bangalore",
//     "Hyderabad",
//     "Coimbatore",
//     "Kochi",
//     "Madurai",
//     "Mysore",
//     "Visakhapatnam",
//     "Vijayawada",
//     "Thiruvananthapuram",
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (!from || !to || !date) {
//       alert("Please provide valid source, destination, and date.");
//       return;
//     }

//     navigate("/buses", {
//       state: {
//         from: from.trim(),
//         to: to.trim(),
//         date: date.toISOString().split("T")[0], // Pass the date in YYYY-MM-DD format
//       },
//     });
//   };

//   const handleFromInput = (e) => {
//     const input = e.target.value;
//     setFrom(input);
//     if (input.length > 0) {
//       const filteredCities = southIndianCities.filter((city) =>
//         city.toLowerCase().includes(input.toLowerCase())
//       );
//       setFromDropdown(filteredCities);
//     } else {
//       setFromDropdown([]);
//     }
//   };

//   const handleToInput = (e) => {
//     const input = e.target.value;
//     setTo(input);
//     if (input.length > 0) {
//       const filteredCities = southIndianCities.filter((city) =>
//         city.toLowerCase().includes(input.toLowerCase())
//       );
//       setToDropdown(filteredCities);
//     } else {
//       setToDropdown([]);
//     }
//   };

//   const handleFromSelect = (city) => {
//     setFrom(city);
//     setFromDropdown([]);
//   };

//   const handleToSelect = (city) => {
//     setTo(city);
//     setToDropdown([]);
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)]">
//       <div className="bg-primary text-white py-16">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold mb-8 text-center">
//             India's No. 1 Online Bus Ticket Booking Site
//           </h1>
//           <div className="max-w-3xl mx-auto bg-white rounded-lg p-6">
//             <form onSubmit={handleSearch} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="relative">
//                   <label className="block text-gray-700 mb-2">From</label>
//                   <input
//                     type="text"
//                     value={from}
//                     onChange={handleFromInput}
//                     className="text-black w-full p-2 border rounded"
//                     placeholder="Enter source city"
//                   />
//                   {fromDropdown.length > 0 && (
//                     <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto z-10">
//                       {fromDropdown.map((city, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleFromSelect(city)}
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                         >
//                           {city}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <label className="block text-gray-700 mb-2">To</label>
//                   <input
//                     type="text"
//                     value={to}
//                     onChange={handleToInput}
//                     className="text-black w-full p-2 border rounded"
//                     placeholder="Enter destination city"
//                   />
//                   {toDropdown.length > 0 && (
//                     <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto z-10">
//                       {toDropdown.map((city, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleToSelect(city)}
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                         >
//                           {city}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Date</label>
//                   <DatePicker
//                     selected={date}
//                     onChange={(date) => setDate(date)}
//                     className="text-black w-full p-2 border rounded"
//                     minDate={new Date()}
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700"
//               >
//                 Search Buses
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
