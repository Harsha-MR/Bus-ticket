import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/bookings/history', {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error('Error fetching booking history:', error);
        setError('Failed to load booking history');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!bookings || bookings.length === 0) return <div>No bookings found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Booking History</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          booking && (
            <div key={booking?._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold mb-2">
                    Bus: {booking?.busId?.name || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    Seats: {booking?.seatNumbers?.join(', ') || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    From: {booking?.from || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    To: {booking?.to || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    Booked on: {booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full ${
                  booking?.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking?.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking?.status || 'N/A'}
                </div>
              </div>
              {booking?.status === 'confirmed' && (
                <button
                  onClick={() => navigate(`/cancel-booking/${booking._id}`)}
                  className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;

