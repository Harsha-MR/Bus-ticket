import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWheelchair, FaFemale, FaMale } from 'react-icons/fa';

function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('lower');

  // Mock bus data
  const bus = {
    id,
    operator: "Express Travels",
    type: "AC Sleeper",
    price: 899,
    lowerDeck: Array(20).fill().map((_, i) => ({
      id: `L${i + 1}`,
      isAvailable: Math.random() > 0.3,
      type: i % 3 === 0 ? 'female' : i % 5 === 0 ? 'handicap' : 'regular',
    })),
    upperDeck: Array(20).fill().map((_, i) => ({
      id: `U${i + 1}`,
      isAvailable: Math.random() > 0.3,
      type: i % 4 === 0 ? 'female' : 'regular',
    })),
  };

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      alert('You can select maximum 6 seats');
    }
  };

  const handleBooking = () => {
    navigate(`/booking/${id}`, { state: { selectedSeats } });
  };

  const getSeatColor = (seat) => {
    if (!seat.isAvailable) return 'bg-gray-300';
    if (selectedSeats.includes(seat.id)) return 'bg-primary text-white';
    if (seat.type === 'female') return 'bg-pink-100';
    if (seat.type === 'handicap') return 'bg-blue-100';
    return 'bg-gray-100';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{bus.operator}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedDeck('upper')}
              className={`px-4 py-2 rounded ${
                selectedDeck === 'upper' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              Upper Deck
            </button>
            <button
              onClick={() => setSelectedDeck('lower')}
              className={`px-4 py-2 rounded ${
                selectedDeck === 'lower' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              Lower Deck
            </button>
          </div>
        </div>

        <div className="flex gap-8 mb-8">
          <div className="w-3/4">
            <div className="grid grid-cols-5 gap-4">
              {(selectedDeck === 'lower' ? bus.lowerDeck : bus.upperDeck).map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
                  className={`p-4 rounded flex items-center justify-center ${getSeatColor(seat)} ${
                    seat.isAvailable ? 'hover:opacity-80' : 'cursor-not-allowed'
                  }`}
                  disabled={!seat.isAvailable}
                >
                  <div>
                    <div className="text-sm mb-1">{seat.id}</div>
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
            <p className="text-lg">Selected Seats: {selectedSeats.join(', ')}</p>
            <p className="text-2xl font-bold">
              Total: ₹{selectedSeats.length * bus.price}
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