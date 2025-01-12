// src/pages/SearchResults.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const navigate = useNavigate();

  const buses = [
    { id: 1, name: 'Bus A', time: '10:00 AM', price: 50 },
    { id: 2, name: 'Bus B', time: '2:00 PM', price: 40 },
    { id: 3, name: 'Bus C', time: '6:00 PM', price: 60 },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Available Buses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600">{bus.name}</h3>
            <p className="text-gray-700">Departure Time: {bus.time}</p>
            <p className="text-gray-700">Price: ${bus.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate('/booking')}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
