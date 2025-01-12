// src/pages/Booking.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatRows = [
    ['A1', 'A2', 'A3', 'A4'],
    ['B1', 'B2', 'B3', 'B4'],
    ['C1', 'C2', 'C3', 'C4'],
    ['D1', 'D2', 'D3', 'D4'],
  ];

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    navigate('/payment', { state: { selectedSeats } });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Select Your Seat</h1>
      <div className="space-y-4">
        {seatRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {row.map((seat) => (
              <button
                key={seat}
                className={`py-2 px-4 rounded-lg ${selectedSeats.includes(seat) ? 'bg-green-500' : 'bg-gray-300'} hover:bg-gray-400`}
                onClick={() => handleSeatSelect(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={handleProceedToPayment}
        className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg text-lg shadow-lg hover:bg-blue-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Booking;
