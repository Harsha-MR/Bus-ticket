// import { useState, useEffect } from 'react';

// function usePaymentData() {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [busDetails, setBusDetails] = useState(null);
//   const [selectedMethod, setSelectedMethod] = useState('upi');
//   const [showQR, setShowQR] = useState(false);
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

//   useEffect(() => {
//     // Reset data when the page is mounted
//     setSelectedSeats([]);
//     setTotalAmount(0);
//     setBusDetails(null);
//     setSelectedMethod('upi');
//     setShowQR(false);
//     setIsPaymentSuccess(false);
//   }, []); // Empty dependency array ensures this effect runs only once when the component mounts

//   return {
//     selectedSeats,
//     setSelectedSeats,
//     totalAmount,
//     setTotalAmount,
//     busDetails,
//     setBusDetails,
//     selectedMethod,
//     setSelectedMethod,
//     showQR,
//     setShowQR,
//     isPaymentSuccess,
//     setIsPaymentSuccess,
//   };
// }

// export default usePaymentData;
