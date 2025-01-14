import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function BusList() {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  
  // Mock bus data
  const [buses] = useState([
    {
      id: 1,
      operator: "Express Travels",
      departure: "10:00 PM",
      arrival: "06:00 AM",
      duration: "8h",
      price: 899,
      type: "AC Sleeper",
      seats: 36,
      rating: 4.5,
    },
    {
      id: 2,
      operator: "Royal Buses",
      departure: "11:30 PM",
      arrival: "07:30 AM",
      duration: "8h",
      price: 999,
      type: "AC Sleeper",
      seats: 28,
      rating: 4.3,
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{from} → {to}</h2>
            <p className="text-gray-600">{date?.toLocaleDateString()}</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded">
            Modify Search
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {buses.map((bus) => (
          <div key={bus.id} className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{bus.operator}</h3>
                <p className="text-gray-600">{bus.type}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{bus.price}</p>
                <p className="text-gray-600">{bus.seats} seats available</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="font-bold">{bus.departure}</p>
                <p className="text-gray-600">Departure</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">{bus.duration}</p>
                <div className="w-32 h-0.5 bg-gray-300 my-2"></div>
              </div>
              <div className="text-right">
                <p className="font-bold">{bus.arrival}</p>
                <p className="text-gray-600">Arrival</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{bus.rating}</span>
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded hover:bg-red-700">
                View Seats
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusList;