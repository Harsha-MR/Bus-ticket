// import { Link, useNavigate } from 'react-router-dom';
// import { FaUser, FaBus, FaSignOutAlt } from 'react-icons/fa';
// import { useEffect, useState } from 'react';

// function Navbar() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     // Retrieve the user's name from local storage
//     const storedName = localStorage.getItem('userName');
//     if (storedName) {
//       // Extract the first name
//       const firstName = storedName.split(' ')[0];
//       setUserName(firstName);
//     }
//   }, []);

//   const handleLoginClick = () => {
//     navigate('/register');
//   };

//   const handleLogoutClick = () => {
//     // Perform any logout logic, e.g., clearing tokens or session data
//     localStorage.removeItem('authToken'); // Example: Clear auth token
//     //{console.log(authToken)}; 
//     localStorage.removeItem('userName'); // Remove user name
//     setUserName(null); // Reset user state
//     navigate('/register'); // Redirect to the login page
//   };

//   return (
//     <nav className="bg-primary text-white">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold flex items-center gap-2">
//             <FaBus /> getBus
//           </Link>
//           <div className="flex items-center gap-6">
//             <Link to="/help" className="hover:text-gray-200">Help</Link>
//             {/* <Link to="/buses" className="hover:text-gray-200">Explore Routes</Link>  */}
//             {userName ? (
//               <button
//                 className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
//               >
//                 <FaUser />
//                 {userName}
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
//               >
//                 <FaUser />
//                 Login
//               </button>
//             )}
//             <button
//               onClick={handleLogoutClick}
//               className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               <FaSignOutAlt />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBus, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Retrieve the user's name from local storage when the component mounts
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      const firstName = storedName.split(' ')[0];  // Extract first name only
      setUserName(firstName);
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/register'); // Redirect to the register (login) page
  };

  const handleLogoutClick = () => {
    // Perform logout logic by clearing session data
    localStorage.removeItem('authToken');  // Remove auth token
    localStorage.removeItem('userName');   // Remove user name
    setUserName(null);                      // Reset user state
    navigate('/register');                  // Redirect to login page
  };

  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaBus /> getBus
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/help" className="hover:text-gray-200">Help</Link>
            {userName ? (
              <>
                <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100">
                  <FaUser />
                  {userName}
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
              >
                <FaUser />
                {userName ? userName : 'Login'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
