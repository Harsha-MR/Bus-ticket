import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaBus, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Check if userName is passed via navigation state
    if (location.state?.userName) {
      setUserName(location.state.userName);
    } else {
      // Fallback to localStorage
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        const firstName = storedName.split(' ')[0];
        setUserName(firstName);
      }
    }
  }, [location.state]); // Trigger whenever navigation state changes

  const handleLoginClick = () => {
    // // Simulate login by setting a user name in localStorage
    // const simulatedUserName = ""; // Replace with actual login logic
    // localStorage.setItem('userName', simulatedUserName);

    // Extract the first name and update the state
    //const firstName = simulatedUserName.split(' ')[0];
    setUserName(firstName); // Dynamically update the state

    // Navigate to the register page or dashboard
    navigate('/register');
  };

  const handleLogoutClick = () => {
    // Perform any logout logic, e.g., clearing tokens or session data
    localStorage.removeItem('token'); // Example: Clear auth token
    localStorage.removeItem('userName'); // Remove user name
    localStorage.removeItem('userId'); // Remove user ID
    setUserName(null); // Reset user state
    navigate('/register'); // Redirect to the login page
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
            <Link to="/history" className="hover:text-gray-200">History</Link> {/* Add History link */}
            {/* <Link to="/buses" className="hover:text-gray-200">Explore Routes</Link>  */}
            {userName ? (
              <button
                onClick={handleLoginClick}
                className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
              >
                <FaUser />
                {userName}
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
              >
                <FaUser />
                Login
              </button>
            )}
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
