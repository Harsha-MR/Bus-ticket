import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';
import axios from 'axios';

const ViewSeats = ({ busId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('ALL');
  const [seatData, setSeatData] = useState({ lowerDeck: [], upperDeck: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeatAvailability = async () => {
      try {
        const response = await axios.get(`/api/bookings/seat-availability/${busId}`);
        const { segments } = response.data;
        
        // Process seat data
        const processedSeats = segments.map(segment => ({
          ...segment,
          seats: segment.seats.map(seat => ({
            ...seat,
            isAvailable: !seat.isBooked
          }))
        }));

        // Split into lower and upper deck
        setSeatData({
          lowerDeck: processedSeats.filter(seat => seat.number <= 18),
          upperDeck: processedSeats.filter(seat => seat.number > 18)
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seat availability:', error);
        setLoading(false);
      }
    };

    fetchSeatAvailability();
  }, [busId]);

  const handleSeatClick = async (seat) => {
    if (!seat.isAvailable) return;
    
    try {
      // Make API call to book the seat
      const response = await axios.post('/api/bookings/book-seat', {
        busId,
        seatNumber: seat.number
      });

      if (response.data.success) {
        // Update local state to reflect the booking
        setSeatData(prevData => ({
          lowerDeck: prevData.lowerDeck.map(s => 
            s.number === seat.number ? { ...s, isAvailable: false } : s
          ),
          upperDeck: prevData.upperDeck.map(s => 
            s.number === seat.number ? { ...s, isAvailable: false } : s
          )
        }));

        // Add booking to local storage history
        const existingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
        const newBooking = {
          id: response.data.bookingId,
          seatNumber: seat.number,
          busId,
          date: new Date().toISOString(),
          status: 'confirmed'
        };
        localStorage.setItem('bookingHistory', JSON.stringify([...existingHistory, newBooking]));

        setSelectedSeats([...selectedSeats, seat.number]);
      }
    } catch (error) {
      console.error('Error booking seat:', error);
      alert('Failed to book seat. Please try again.');
    }
  };

  const SeatLayout = ({ seats, deckTitle }) => (
    <div className="mb-8">
      <h3 className="text-gray-600 mb-4">{deckTitle}</h3>
      <div className="grid grid-cols-6 gap-2 bg-white p-4 rounded-lg border">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.number);
          const showSeat = selectedPrice === 'ALL' || seat.price.toString() === selectedPrice;

          return (
            <div
              key={seat.number}
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
              onClick={() => handleSeatClick(seat)}
            >
              {seat.number}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <SeatLayout seats={seatData.lowerDeck} deckTitle="Lower Deck" />
        <SeatLayout seats={seatData.upperDeck} deckTitle="Upper Deck" />
      </div>
    </div>
  );
};

export default ViewSeats;
