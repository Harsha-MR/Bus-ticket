// src/pages/Confirmation.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const { state } = useLocation();
  const { selectedSeats } = state || {};

  return (
    <div>
      <h1>Booking Confirmation</h1>
      {selectedSeats && selectedSeats.length > 0 ? (
        <>
          <p>Your selected seats:</p>
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>{seat}</li>
            ))}
          </ul>
          <p>Payment Status: Payment Successful!</p>
          <p>Thank you for your booking!</p>
        </>
      ) : (
        <p>No seats selected.</p>
      )}
    </div>
  );
};

export default Confirmation;
