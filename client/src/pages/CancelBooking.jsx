import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

function CancelBooking() {
  const [bookingId, setBookingId] = useState('');
  const [reason, setReason] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmCancellation = () => {
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setShowConfirmation(false);
      // Reset form
      setBookingId('');
      setReason('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Cancel Your Booking</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Messages */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="text-green-500 w-5 h-5" />
            <p className="text-green-700">Your booking has been successfully cancelled.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <XCircle className="text-red-500 w-5 h-5" />
            <p className="text-red-700">There was an error cancelling your booking. Please try again.</p>
          </div>
        )}

        {/* Cancellation Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bookingId" className="block text-sm font-medium text-gray-700">
                Booking ID
              </label>
              <input
                type="text"
                id="bookingId"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your booking ID"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Cancellation
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Please provide a reason for cancellation"
                required
              />
            </div>

            <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 flex items-center gap-4">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Cancel Booking
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>Cancellation fees may apply</span>
              </div>
            </div>
          </form>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Cancellation</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel your booking? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={confirmCancellation}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CancelBooking;