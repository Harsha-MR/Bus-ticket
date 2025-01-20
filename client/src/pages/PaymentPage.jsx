
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CreditCard, Smartphone, QrCode, Wallet, ChevronRight, Shield } from "lucide-react";

// const PaymentPage = ({
//   selectedSeats = ["L15", "L18"],
//   totalAmount = 1798,
//   busDetails = {
//     name: "Sugama Tourist",
//     source: "Bangalore",
//     destination: "Mysore",
//     date: "2025-01-18",
//     departureTime: "22:45",
//   },
// }) => {
//   const [selectedMethod, setSelectedMethod] = useState("upi");
//   const [showQR, setShowQR] = useState(false);
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

//   const navigate = useNavigate(); // Hook to handle navigation

//   const paymentMethods = [
//     {
//       id: "upi",
//       name: "UPI Payment",
//       icon: <QrCode className="w-6 h-6" />,
//       description: "Pay using any UPI app",
//     },
//     {
//       id: "card",
//       name: "Credit/Debit Card",
//       icon: <CreditCard className="w-6 h-6" />,
//       description: "All major cards accepted",
//     },
//     {
//       id: "wallet",
//       name: "Mobile Wallets",
//       icon: <Wallet className="w-6 h-6" />,
//       description: "Paytm, PhonePe, etc.",
//     },
//     {
//       id: "netbanking",
//       name: "Net Banking",
//       icon: <Smartphone className="w-6 h-6" />,
//       description: "All Indian banks",
//     },
//   ];

//   const handlePaymentMethodSelect = (methodId) => {
//     setSelectedMethod(methodId);
//     if (methodId === "upi") {
//       setShowQR(true);
//     } else {
//       setShowQR(false);
//     }
//   };

//   const handlePayment = () => {
//     // Simulate payment processing
//     setTimeout(() => {
//       setIsPaymentSuccess(true);
//     }, 500); // Simulate a delay for payment processing
//   };

//   const handleClose = () => {
//     navigate("/"); // Navigate to the home page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Payment Methods Section */}
//           <div className="md:col-span-2 space-y-6">
//             {/* Journey Summary */}
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-lg font-semibold mb-4">Journey Summary</h2>
//               <div className="space-y-2 text-gray-600">
//                 <p>
//                   <span className="font-medium">Bus:</span> {busDetails.name}
//                 </p>
//                 <p>
//                   <span className="font-medium">From:</span> {busDetails.source}
//                 </p>
//                 <p>
//                   <span className="font-medium">To:</span> {busDetails.destination}
//                 </p>
//                 <p>
//                   <span className="font-medium">Date:</span> {busDetails.date}
//                 </p>
//                 <p>
//                   <span className="font-medium">Time:</span> {busDetails.departureTime}
//                 </p>
//                 <p>
//                   <span className="font-medium">Seats:</span> {selectedSeats.join(", ")}
//                 </p>
//               </div>
//             </div>

//             {/* Payment Methods */}
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
//               <div className="space-y-3">
//                 {paymentMethods.map((method) => (
//                   <div
//                     key={method.id}
//                     className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-red-500 transition-colors ${
//                       selectedMethod === method.id ? "border-red-500 bg-red-50" : "border-gray-200"
//                     }`}
//                     onClick={() => handlePaymentMethodSelect(method.id)}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="text-gray-600">{method.icon}</div>
//                       <div>
//                         <h3 className="font-medium">{method.name}</h3>
//                         <p className="text-sm text-gray-500">{method.description}</p>
//                       </div>
//                     </div>
//                     <ChevronRight className="w-5 h-5 text-gray-400" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* QR Code Section */}
//             {showQR && (
//               <div className="bg-white rounded-lg shadow-md p-6 text-center">
//                 <h3 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h3>
//                 <div className="max-w-xs mx-auto bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
//                     alt="Payment QR Code"
//                     className="w-full h-auto"
//                   />
//                 </div>
//                 <p className="mt-4 text-sm text-gray-600">
//                   Open any UPI app and scan this code to pay
//                 </p>
//                 <div className="mt-4 flex justify-center gap-4">
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png"
//                     alt="UPI"
//                     className="h-8"
//                   />
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/200px-Paytm_Logo_%28standalone%29.svg.png"
//                     alt="Paytm"
//                     className="h-8"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Price Summary Section */}
//           <div className="md:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
//               <h2 className="text-lg font-semibold mb-4">Price Summary</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span>Ticket Amount</span>
//                   <span>₹{totalAmount}</span>
//                 </div>
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount</span>
//                   <span>-₹100</span>
//                 </div>
//                 <div className="flex justify-between text-gray-500">
//                   <span>Service Fee</span>
//                   <span>₹20</span>
//                 </div>
//                 <div className="border-t pt-3 font-semibold flex justify-between">
//                   <span>Total Amount</span>
//                   <span>₹{totalAmount - 100 + 20}</span>
//                 </div>
//               </div>

//               <button
//                 className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
//                 onClick={handlePayment}
//               >
//                 Pay ₹{totalAmount - 100 + 20}
//               </button>

//               <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
//                 <Shield className="w-4 h-4" />
//                 <span>Safe and Secure Payments</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payment Success Message */}
//         {isPaymentSuccess && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
//               <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
//               <p className="text-gray-700">
//                 Your seats have been successfully booked. Check your registered email for the
//                 journey summary and ticket.
//               </p>
//               <button
//                 className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
//                 onClick={handleClose} // Navigate to the home page
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const { state } = useLocation();
  const { selectedSeats, bus } = state || {};
  const navigate = useNavigate();

  const [showUpi, setShowUpi] = useState(false);
  const [codChecked, setCodChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedSeats || !bus) {
      navigate('/');
    }
  }, [selectedSeats, bus, navigate]);

  const handleUpiToggle = () => {
    setShowUpi(!showUpi);
  };

  const handleCodToggle = () => {
    setCodChecked(!codChecked);
  };

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);
      setError('');

      // Get the seat numbers from the selected seat IDs
      const seatNumbers = selectedSeats.map((seatId) => 
        bus.segments
          .flatMap(segment => segment.seats)
          .find(seat => seat._id === seatId)?.number
      ).filter(Boolean);
      console.log(bus._id,bus.route[0], bus.route[bus.route.length - 1], seatNumbers);
      
      const response = await axios.post(`http://localhost:3000/api/bookings/${bus._id}/book-seats`, {
        busId: bus._id,
        from: bus.route[0],
        to: bus.route[bus.route.length - 1],
        to: seatNumbers
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add your authentication token here if required
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGJkNjcxZTZhMGQxMzM1MzUzNWMxMSIsImVtYWlsIjoiaEBnbWFpbC5jb20iLCJuYW1lIjoiaGFyc2hhIiwiaWF0IjoxNzM3NDAzNjQ5LCJleHAiOjE3Mzc0ODI4NDl9.ac5qmVM3iGb_Z3YEsOn-3xATmdAU8S2kJuIkHPl1O1M`
        }
      });

      if (response.data) {
        setShowPopup(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while processing your booking');
      console.error('Booking error:', err);
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
          <h3 className="text-lg font-bold mb-2">Bus Details</h3>
          <p>
            <strong>Bus Name:</strong> {bus?.name}
          </p>
          <p>
            <strong>From:</strong> {bus?.route[0]}
          </p>
          <p>
            <strong>To:</strong> {bus?.route[bus?.route.length - 1]}
          </p>
          <p>
            <strong>Date:</strong> {getDate(bus?.endTime)}
          </p>
          <p>
            <strong>Time:</strong> {new Date(bus?.startTime).toLocaleTimeString()}
          </p>
          <p>
            <strong>Selected Seats:</strong>{' '}
            {selectedSeats.length > 0 ? selectedSeats.map((seatId) => 
              bus.segments.flatMap(segment => segment.seats).find(seat => seat._id === seatId)?.number
            ).join(', ') : 'No seats selected'}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹
            {selectedSeats?.length * parseInt(bus?.price)}
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
          <div className="p-4 border rounded mb-4 cursor-pointer">
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
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Pay with Card'}
              </button>
            </div>
          </div>

          {/* Cash on Delivery */}
          <div className="p-4 border rounded mb-4 flex items-center gap-4">
            <input
              type="checkbox"
              checked={codChecked}
              onChange={handleCodToggle}
              className="cursor-pointer"
            />
            <div>
              <h4 className="text-lg font-bold">Cash on Delivery</h4>
              <p className="mt-2 text-gray-600">
                Pay cash on arrival at the bus station.
              </p>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handlePaymentSuccess}
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-lg bg-primary text-white hover:bg-red-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
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
              Payment Successful!
            </h2>
            <p className="mt-4">
              Your payment has been processed successfully. Please check your registered email for the booking verification and ticket details.
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