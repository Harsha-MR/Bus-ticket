// src/components/Header.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate('/login');
//   };

//   return (
//     <header className="bg-blue-500 text-white p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
//           Bus Ticket Booking System
//         </h1>
//         <nav className="space-x-4">
//           <button className="text-lg" onClick={() => navigate('/')}>Home</button>
//           <button className="text-lg" onClick={() => navigate('/search-results')}>Search</button>
//           <button className="text-lg" onClick={() => navigate('/booking')}>Book Now</button>
//           <button
//             className="text-lg bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-12 rounded-full" />
          <h1 className="text-2xl font-semibold">Bus Ticket Booking</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => navigate('/')}
                className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/search-results')}
                className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Search
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/booking')}
                className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Book Now
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;



