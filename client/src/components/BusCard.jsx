import React from 'react';
import '../styles/components/BusCard.css';

const BusCard = ({ bus }) => (
  <div className="bus-card">
    <h3>{bus.name}</h3>
    <p>From: {bus.origin}</p>
    <p>To: {bus.destination}</p>
    <p>Fare: ${bus.fare}</p>
    <button>Book Now</button>
  </div>
);

export default BusCard;
