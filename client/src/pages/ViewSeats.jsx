import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const ViewSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('ALL');

  const prices = ['ALL', '600', '700'];

  const generateSeats = (start, count) => {
    return Array.from({ length: count }, (_, index) => ({
      id: start + index,
      number: start + index,
      isAvailable: Math.random() > 0.3,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      price: Math.random() > 0.5 ? 600 : 700
    }));
  };

  const lowerDeckSeats = generateSeats(1, 18);
  const upperDeckSeats = generateSeats(19, 18);

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const SeatLayout = ({ seats, deckTitle }) => (
    <div className="mb-8">
      <h3 className="text-gray-600 mb-4">{deckTitle}</h3>
      <div className="grid grid-cols-6 gap-2 bg-white p-4 rounded-lg border">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          const showSeat = selectedPrice === 'ALL' || seat.price.toString() === selectedPrice;

          return (
            <div
              key={seat.id}
              className={`
                ${!showSeat ? 'hidden' : ''}
                ${seat.isAvailable 
                  ? 'cursor-pointer hover:bg-blue-100' 
                  : 'cursor-not-allowed opacity-50'
                }
                ${isSelected ? 'bg-green-500 text-white' : ''}
                ${!isSelected && seat.gender === 'female' ? 'bg-pink-100' : ''}
                ${!isSelected && seat.gender === 'male' ? 'bg-blue-50' : ''}
                border rounded p-2 text-center text-sm transition-colors
              `}
              onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
            >
              {seat.number}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Sri Durgamba Travels - R No C</h2>
            <div className="flex items-center gap-4 text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>21:57</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>Yeshwantpur</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-600 font-semibold">4.1</div>
            <div className="text-sm text-gray-600">12 Seats available</div>
            <div className="text-sm text-gray-600">2 Single</div>
          </div>
        </div>

        {/* Price Filter */}
        <div className="flex items-center gap-2 border-t pt-4">
          <span className="text-gray-600">Seat Price:</span>
          {prices.map(price => (
            <button
              key={price}
              className={`px-4 py-1 rounded ${
                selectedPrice === price
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedPrice(price)}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* Seat Legend */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-gray-600 mb-2">SEAT LEGEND</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-pink-100 border rounded"></div>
            <span className="text-sm">Female</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-50 border rounded"></div>
            <span className="text-sm">Male</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 border rounded"></div>
            <span className="text-sm">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Seat Selection Message */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 text-blue-700">
        Click on an Available seat to proceed with your transaction.
      </div>

      {/* Seat Layout */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <SeatLayout seats={lowerDeckSeats} deckTitle="Lower Deck" />
        <SeatLayout seats={upperDeckSeats} deckTitle="Upper Deck" />
      </div>
    </div>
  );
};

export default ViewSeats;
