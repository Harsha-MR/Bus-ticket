import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaWheelchair, FaFemale, FaMale } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function useBusDetails() {
  const { state } = useLocation();
  const { busId } = state || {};
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/buses/getBuses/?id=${busId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGJkNjcxZTZhMGQxMzM1MzUzNWMxMSIsImVtYWlsIjoiaEBnbWFpbC5jb20iLCJuYW1lIjoiaGFyc2hhIiwiaWF0IjoxNzM3Mzg0OTY1LCJleHAiOjE3Mzc0NjQxNjV9.tIQVUlB_f3dGyxw4Ef5nrsawyDTvmB75oiqoG5-B_rU`,
            },
          }
        );

        setBus(response.data.buses[0]); // Access the first bus object in the response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [busId]);

  return { bus, loading, error };
}

function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bus, loading, error } = useBusDetails(id);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState('');

  useEffect(() => {
    if (bus && bus.segments && bus.segments.length > 0) {
      setSelectedSegment(bus.segments[0].from); // Set the initial segment on mount
    }
  }, [bus]);

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      alert('You can select a maximum of 6 seats');
    }
  };

  const handleBooking = () => {
    navigate(`/booking/${id}`, { state: { selectedSeats, bus } });
    console.log(selectedSeats);
    
  };

  const getSeatColor = (seat) => {
    if (seat.isBooked) return 'bg-gray-300';
    if (selectedSeats.includes(seat._id)) return 'bg-primary text-white';
    if (seat.type === 'female') return 'bg-pink-100';
    if (seat.type === 'handicap') return 'bg-blue-100';
    return 'bg-gray-100';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentSegment = bus.segments.find((segment) => segment.from === selectedSegment);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{bus.name}</h2>
        </div>

        <div className="flex gap-8 mb-8">
          <div className="w-3/4">
            <div className="mb-4">
              <label htmlFor="segment" className="font-bold mr-2">Segment:</label>
              <select
                id="segment"
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="border p-2 rounded"
              >
                {bus.segments.map((segment) => (
                  <option key={segment._id} value={segment.from}>
                    {segment.from} to {segment.to}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {currentSegment?.seats.map((seat) => (
                <button
                  key={seat._id}
                  onClick={() => !seat.isBooked && handleSeatClick(seat._id)}
                  className={`p-4 rounded flex items-center justify-center ${getSeatColor(
                    seat
                  )} ${
                    seat.isBooked
                      ? 'cursor-not-allowed'
                      : 'hover:opacity-80'
                  }`}
                  disabled={seat.isBooked}
                >
                  <div>
                    <div className="text-sm mb-1">{seat.number}</div>
                    {seat.type === 'female' && <FaFemale />}
                    {seat.type === 'handicap' && <FaWheelchair />}
                    {seat.type === 'regular' && <FaMale />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-1/4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-2">Seat Info</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-100 rounded"></div>
                  <span>Ladies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 rounded"></div>
                  <span>Handicap</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-lg">Selected Seats: {selectedSeats.map((seatId) => currentSegment?.seats.find((seat) => seat._id === seatId)?.number).join(', ')}</p>
            <p className="text-2xl font-bold">
              Total: ₹{selectedSeats.length * parseInt(bus.price)}
            </p>
          </div>
          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            className={`px-6 py-3 rounded-lg ${
              selectedSeats.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-red-700'
            }`}
          >
            Proceed to Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusDetails;




// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaWheelchair, FaFemale, FaMale } from 'react-icons/fa';
// import { useLocation } from 'react-router-dom';

// function useBusDetails() {
//   const { state } = useLocation();
//   const { busId } = state || {};
//   const [bus, setBus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBusDetails = async () => {
//       try {
//         // // Assuming token is stored in localStorage
//         // const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGJkNjcxZTZhMGQxMzM1MzUzNWMxMSIsImVtYWlsIjoiaEBnbWFpbC5jb20iLCJuYW1lIjoiaGFyc2hhIiwiaWF0IjoxNzM3Mzg0OTY1LCJleHAiOjE3Mzc0NjQxNjV9.tIQVUlB_f3dGyxw4Ef5nrsawyDTvmB75oiqoG5-B_rU');

//         const response = await axios.get(`http://localhost:3000/api/buses/getBuses/?id=${busId}`, {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGJkNjcxZTZhMGQxMzM1MzUzNWMxMSIsImVtYWlsIjoiaEBnbWFpbC5jb20iLCJuYW1lIjoiaGFyc2hhIiwiaWF0IjoxNzM3Mzg0OTY1LCJleHAiOjE3Mzc0NjQxNjV9.tIQVUlB_f3dGyxw4Ef5nrsawyDTvmB75oiqoG5-B_rU`,
//           },
//         });

//         setBus(response.data);
//         // console.log(response.data);
//         console.log(busId);
        
        
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchBusDetails();
//   }, [busId]);

//   return { bus, loading, error };
// }

// function BusDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { bus, loading, error } = useBusDetails(id);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedDeck, setSelectedDeck] = useState('lower');

//   const handleSeatClick = (seatId) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId));
//     } else if (selectedSeats.length < 6) {
//       setSelectedSeats([...selectedSeats, seatId]);
//     } else {
//       alert('You can select a maximum of 6 seats');
//     }
//   };

//   const handleBooking = () => {
//     navigate(`/booking/${id}`, { state: { selectedSeats } });
//   };

//   const getSeatColor = (seat) => {
//     if (!seat.isAvailable) return 'bg-gray-300';
//     if (selectedSeats.includes(seat.id)) return 'bg-primary text-white';
//     if (seat.type === 'female') return 'bg-pink-100';
//     if (seat.type === 'handicap') return 'bg-blue-100';
//     return 'bg-gray-100';
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">{bus.operator}</h2>
//         </div>

//         <div className="flex gap-8 mb-8">
//           <div className="w-3/4">
//             <div className="grid grid-cols-5 gap-4">
//               {(selectedDeck === 'lower' ? bus.lowerDeck : bus.upperDeck).map((seat) => (
//                 <button
//                   key={seat.id}
//                   onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
//                   className={`p-4 rounded flex items-center justify-center ${getSeatColor(seat)} ${seat.isAvailable ? 'hover:opacity-80' : 'cursor-not-allowed'
//                     }`}
//                   disabled={!seat.isAvailable}
//                 >
//                   <div>
//                     <div className="text-sm mb-1">{seat.id}</div>
//                     {seat.type === 'female' && <FaFemale />}
//                     {seat.type === 'handicap' && <FaWheelchair />}
//                     {seat.type === 'regular' && <FaMale />}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="w-1/4">
//             <div className="bg-gray-50 p-4 rounded">
//               <h3 className="font-bold mb-2">Seat Info</h3>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-gray-300 rounded"></div>
//                   <span>Booked</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-gray-100 rounded"></div>
//                   <span>Available</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-pink-100 rounded"></div>
//                   <span>Ladies</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-blue-100 rounded"></div>
//                   <span>Handicap</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-primary rounded"></div>
//                   <span>Selected</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between items-center border-t pt-4">
//           <div>
//             <p className="text-lg">Selected Seats: {selectedSeats.join(', ')}</p>
//             <p className="text-2xl font-bold">
//               Total: ₹{selectedSeats.length * bus.price}
//             </p>
//           </div>
//           <button
//             onClick={handleBooking}
//             disabled={selectedSeats.length === 0}
//             className={`px-6 py-3 rounded-lg ${selectedSeats.length === 0
//                 ? 'bg-gray-300 cursor-not-allowed'
//                 : 'bg-primary text-white hover:bg-red-700'
//               }`}
//           >
//             Proceed to Book
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BusDetails;

