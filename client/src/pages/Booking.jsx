import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

function Booking() {
  const { state } = useLocation();
  const { selectedSeats, bus } = state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').regex(/\@gmail\.com$/, 'Email must end with .gmail.com'),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    age: z.preprocess((val) => Number(val), z.number().max(99, 'Age must be less than 100')),
    gender: z.enum(['male', 'female', 'other']),
  });

  useEffect(() => {
    try {
      validationSchema.parse(formData);
      setErrors({});
      setIsFormValid(true);
    } catch (e) {
      const validationErrors = {};
      if (e.errors) {
        e.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
      }
      setErrors(validationErrors);
      setIsFormValid(false);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    if (isFormValid) {
      const seatNumbers = selectedSeats.map((seatId) => {
        const seat = bus.segments[0].seats.find((s) => s._id === seatId);
        return parseInt(seat?.number.replace(/[^0-9]/g, ''), 10);
      });

      navigate('/payment', {
        state: {
          selectedSeats: seatNumbers,
          bus,
          userData: formData,
        },
      });
    } else {
      alert('Please fill out all the required fields correctly.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>

        <form className="space-y-4">
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
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
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
            <p>
              Selected Seats: {' '}
              {selectedSeats?.length > 0
                ? selectedSeats.map((seatId) => {
                    const seat = bus.segments[0].seats.find((s) => s._id === seatId);
                    return seat?.number;
                  }).join(', ')
                : 'No seats selected'}
            </p>
            <p className="text-xl font-bold mt-2">
              Total Amount: ₹{selectedSeats?.length * (parseInt(bus?.price) || 0)}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-bold ${
              isFormValid
                ? 'bg-primary text-white hover:bg-red-700'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;


// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function Booking() {
//   const { state } = useLocation();
//   const { selectedSeats, bus } = state || {};
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     age: '',
//     gender: 'male',
//   });

//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     // Check if the form is valid
//     const { name, email, phone, age, gender } = formData;
//     setIsFormValid(name && email && phone && age && gender);
//   }, [formData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePayment = () => {
//     if (isFormValid) {
//       // Get seat numbers from selected seats
//       const seatNumbers = selectedSeats.map((seatId) => {
//         const seat = bus.segments[0].seats.find(s => s._id === seatId);
//         // Extract only the number from seat number (e.g., "L15" -> 15)
//         return parseInt(seat?.number.replace(/[^0-9]/g, ''), 10);
//       });

//       // Navigate to payment page with all necessary data
//       navigate('/payment', {
//         state: {
//           selectedSeats: seatNumbers, // Send parsed seat numbers
//           bus,
//           userData: formData // Pass user data to payment page
//         },
//       });
//     } else {
//       alert('Please fill out all the required fields');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>
        
//         <form className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 mb-2">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">Gender</label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="border-t pt-4 mt-6">
//             <h3 className="text-lg font-bold mb-2">Booking Summary</h3>
//             <p>
//               Selected Seats: {' '}
//               {selectedSeats?.length > 0 ? selectedSeats.map((seatId) => {
//                 const seat = bus.segments[0].seats.find(s => s._id === seatId);
//                 return seat?.number;
//               }).join(', ') : 'No seats selected'}
//             </p>
//             <p className="text-xl font-bold mt-2">
//               Total Amount: ₹{selectedSeats?.length * (parseInt(bus?.price) || 0)}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handlePayment}
//             disabled={!isFormValid}
//             className={`w-full py-3 rounded-lg font-bold ${
//               isFormValid ? 'bg-primary text-white hover:bg-red-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
//             }`}
//           >
//             Proceed to Payment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Booking;