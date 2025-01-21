import React, { useState } from 'react';
import { Calendar, MapPin, Clock, IndianRupee, Search, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get bookings data from location state
  const bookings = location.state?.bookings || [];

  const filteredBookings = bookings
    .filter(booking => 
      (filterStatus === 'all' || booking.status === filterStatus) &&
      (booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.destination.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (bookingId) => {
    navigate(`/booking/${bookingId}`, { state: { booking: bookings.find(b => b.id === bookingId) } });
  };

  const handleCancelBooking = (bookingId) => {
    navigate(`/cancel-booking`, { 
      state: { 
        bookingId,
        booking: bookings.find(b => b.id === bookingId)
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">My Booking History</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by booking ID, source, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Bookings</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between md:justify-start md:gap-8">
                    <h3 className="text-lg font-semibold text-gray-900">{booking.busName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)} capitalize`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-400 h-5 w-5" />
                      <span className="text-gray-600">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-400 h-5 w-5" />
                      <span className="text-gray-600">{booking.departureTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-400 h-5 w-5" />
                      <span className="text-gray-600">{booking.source} → {booking.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="text-gray-400 h-5 w-5" />
                      <span className="text-gray-600">₹{booking.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    className="px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                    onClick={() => handleViewDetails(booking.id)}
                  >
                    View Details
                  </button>
                  {booking.status === 'upcoming' && (
                    <button 
                      className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm || filterStatus !== 'all' 
                  ? 'No bookings found matching your search criteria'
                  : 'No booking history available'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BookingHistory;