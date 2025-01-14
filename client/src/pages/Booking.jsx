import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Booking() {
  const { id } = useParams();
  const location = useLocation();
  const selectedSeats = location.state?.selectedSeats || [];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', { ...formData, busId: id, selectedSeats });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <h3 className="text-lg font-bold mb-2">Booking Summary</h3>
            <p>Selected Seats: {selectedSeats.join(', ')}</p>
            <p className="text-xl font-bold mt-2">Total Amount: ₹{selectedSeats.length * 899}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;