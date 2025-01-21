

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Payment() {
//   const { state } = useLocation();
//   const { selectedSeats, bus } = state || {};
//   const navigate = useNavigate();

//   const [showUpi, setShowUpi] = useState(false);
//   const [codChecked, setCodChecked] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!selectedSeats || !bus) {
//       navigate('/');
//     }
//   }, [selectedSeats, bus, navigate]);

//   const handleUpiToggle = () => {
//     setShowUpi(!showUpi);
//   };

//   const handleCodToggle = () => {
//     setCodChecked(!codChecked);
//   };

//   const handlePaymentSuccess = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       // Extract seat numbers from selected seats
//       const seatNumbers = selectedSeats.map((seatId) => {
//         const seat = bus.segments[0].seats.find(seat => seat._id === seatId);
//         return seat?.number;
//       }).filter(Boolean);

//       // Validate that we have seat numbers
//       if (!seatNumbers.length) {
//         throw new Error('No valid seats selected');
//       }

//       // Prepare the request payload
//       const payload = {
//         busId: bus._id,
//         from: bus.route[0],
//         to: bus.route[bus.route.length - 1],
//         seats: seatNumbers
//       };

//       console.log('Sending payload:', payload); // Debug log

//       const response = await axios.post(
//         `http://localhost:3000/api/bookings/${bus._id}/book-seats`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             // Add your authentication token here
//             'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGYzMDdkZTJlNzdlNjVjNzNkZTczZSIsImVtYWlsIjoiaGFyc2hha3VtYXJtcjg4QGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaGEiLCJpYXQiOjE3Mzc0MzczMjksImV4cCI6MTczNzUxNjUyOX0.Q3dT-XQRLi7-A_5btJ0EhoUXNT5NlUtjRmxVfnol4mk`
//           }
//         }
//       );

//       if (response.data) {
//         setShowPopup(true);
//       }
//     } catch (err) {
//       console.error('Booking error:', err);
//       setError(
//         err.response?.data?.message || 
//         err.message || 
//         'An error occurred while processing your booking'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     navigate('/');
//   };

//   const getDate = (datetime) => {
//     return datetime.split('T')[0];
//   };

//   // Validate if we can proceed with payment
//   const canProceed = selectedSeats?.length > 0 && bus;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

//         {error && (
//           <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {/* Booking Summary */}
//         <div className="mb-6">
//           <h3 className="text-lg font-bold mb-2">Bus Details</h3>
//           <p>
//             <strong>Bus Name:</strong> {bus?.name}
//           </p>
//           <p>
//             <strong>From:</strong> {bus?.route[0]}
//           </p>
//           <p>
//             <strong>To:</strong> {bus?.route[bus?.route.length - 1]}
//           </p>
//           <p>
//             <strong>Date:</strong> {bus?.endTime && getDate(bus.endTime)}
//           </p>
//           <p>
//             <strong>Time:</strong> {bus?.startTime && new Date(bus.startTime).toLocaleTimeString()}
//           </p>
//           <p>
//             <strong>Selected Seats:</strong>{' '}
//             {selectedSeats?.length > 0 ? selectedSeats.map((seatId) => {
//               const seat = bus.segments[0].seats.find(s => s._id === seatId);
//               return seat?.number;
//             }).filter(Boolean).join(', ') : 'No seats selected'}
//           </p>
//           <p>
//             <strong>Total Amount:</strong> ₹
//             {selectedSeats?.length * (parseInt(bus?.price) || 0)}
//           </p>
//         </div>

//         {/* Payment Methods */}
//         <div className="border-t pt-4 mt-6">
//           <h3 className="text-lg font-bold mb-2">Select Payment Method</h3>

//           {/* UPI Payment */}
//           <div
//             className={`p-4 border rounded mb-4 cursor-pointer ${
//               showUpi ? 'bg-gray-200' : ''
//             }`}
//             onClick={handleUpiToggle}
//           >
//             <h4 className="text-lg font-bold">UPI Payment</h4>
//             {showUpi && (
//               <div className="mt-2">
//                 <p>Scan the UPI QR code to complete your payment:</p>
//                 <div className="mt-4">
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
//                     alt="UPI QR Code"
//                     className="w-32 h-32 mx-auto"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Credit/Debit Card */}
//           <div className="p-4 border rounded mb-4">
//             <h4 className="text-lg font-bold">Credit/Debit Card</h4>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 placeholder="Card Number"
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Expiration Date"
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <input
//                 type="text"
//                 placeholder="CVV"
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <button 
//                 className="w-full py-2 bg-primary text-white rounded"
//                 onClick={handlePaymentSuccess}
//                 disabled={loading || !canProceed}
//               >
//                 {loading ? 'Processing...' : 'Pay with Card'}
//               </button>
//             </div>
//           </div>

          
//           {/* <div className="p-4 border rounded mb-4 flex items-center gap-4">
//             <input
//               type="checkbox"
//               checked={codChecked}
//               onChange={handleCodToggle}
//               className="cursor-pointer"
//             />
//             <div>
//               <h4 className="text-lg font-bold">Cash on Delivery</h4>
//               <p className="mt-2 text-gray-600">
//                 Pay cash on arrival at the bus station.
//               </p>
//             </div>
//           </div> */}

//           {/* Proceed Button */}
//           <button
//             onClick={handlePaymentSuccess}
//             disabled={loading || !canProceed}
//             className={`w-full py-3 mt-4 rounded-lg bg-primary text-white hover:bg-red-700 ${
//               (loading || !canProceed) ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {loading ? 'Processing Payment...' : 'Proceed to Payment'}
//           </button>
//         </div>
//       </div>

//       {/* Payment Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold text-green-600">
//               Payment Successful!
//             </h2>
//             <p className="mt-4">
//               Your payment has been processed successfully. Please check your registered email for the booking verification and ticket details.
//             </p>
//             <button
//               onClick={handleClosePopup}
//               className="mt-6 py-2 px-4 bg-primary text-white rounded hover:bg-red-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Payment;

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const { state } = useLocation();
  const { selectedSeats, bus, userData } = state || {};
  const navigate = useNavigate();

  const [showUpi, setShowUpi] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedSeats || !bus || !userData) {
      navigate('/');
    }
  }, [selectedSeats, bus, userData, navigate]);

  const handleUpiToggle = () => {
    setShowUpi(!showUpi);
  };

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);
      setError('');

      // Prepare the request payload
      const payload = {
        busId: bus._id,
        from: bus.route[0],
        to: bus.route[bus.route.length - 1],
        seats: selectedSeats, // These are already parsed numbers from the Booking page
        email: userData.email, // Include user's email from the booking form
        name: userData.name // Include user's name from the booking form
      };

      const response = await axios.post(
        `http://localhost:3000/api/bookings/${bus._id}/book-seats`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGYzMDdkZTJlNzdlNjVjNzNkZTczZSIsImVtYWlsIjoiaGFyc2hha3VtYXJtcjg4QGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaGEiLCJpYXQiOjE3Mzc0NDU2NDYsImV4cCI6MTczNzUyNDg0Nn0.8ftu1lhNOYHSKM7H-6Gq6B-ntJQGQaOqzoNG-WaD8hg` // Get token from localStorage
          }
        }
      );

      if (response.data) {
        setShowPopup(true);
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'An error occurred while processing your booking'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/');
  };

  const getDate = (datetime) => {
    return datetime.split('T')[0];
  };

  // Validate if we can proceed with payment
  const canProceed = selectedSeats?.length > 0 && bus;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Booking Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Booking Details</h3>
          <p><strong>Passenger Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>Phone:</strong> {userData?.phone}</p>
          <p><strong>Bus Name:</strong> {bus?.name}</p>
          <p><strong>From:</strong> {bus?.route[0]}</p>
          <p><strong>To:</strong> {bus?.route[bus?.route.length - 1]}</p>
          <p><strong>Date:</strong> {bus?.endTime && getDate(bus.endTime)}</p>
          <p><strong>Time:</strong> {bus?.startTime && new Date(bus.startTime).toLocaleTimeString()}</p>
          <p><strong>Selected Seats:</strong> {selectedSeats?.join(', ')}</p>
          <p className="text-xl font-bold mt-2">
            Total Amount: ₹{selectedSeats?.length * (parseInt(bus?.price) || 0)}
          </p>
        </div>

        {/* Payment Methods */}
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-bold mb-2">Select Payment Method</h3>

          {/* UPI Payment */}
          <div
            className={`p-4 border rounded mb-4 cursor-pointer ${
              showUpi ? 'bg-gray-200' : ''
            }`}
            onClick={handleUpiToggle}
          >
            <h4 className="text-lg font-bold">UPI Payment</h4>
            {showUpi && (
              <div className="mt-2">
                <p>Scan the UPI QR code to complete your payment:</p>
                <div className="mt-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                    alt="UPI QR Code"
                    className="w-32 h-32 mx-auto"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Credit/Debit Card */}
          <div className="p-4 border rounded mb-4">
            <h4 className="text-lg font-bold">Credit/Debit Card</h4>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Expiration Date"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded mb-2"
              />
              <button 
                className="w-full py-2 bg-primary text-white rounded"
                onClick={handlePaymentSuccess}
                disabled={loading || !canProceed}
              >
                {loading ? 'Processing...' : 'Pay with Card'}
              </button>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handlePaymentSuccess}
            disabled={loading || !canProceed}
            className={`w-full py-3 mt-4 rounded-lg bg-primary text-white hover:bg-red-700 ${
              (loading || !canProceed) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing Payment...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>

      {/* Payment Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Booking Successfull!
            </h2>
            <p className="mt-4">
              Your payment has been processed successfully. A confirmation email has been sent to {userData?.email} with your booking details and ticket.
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-6 py-2 px-4 bg-primary text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;