import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBus } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/register');
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
            <Link to="/manage-booking" className="hover:text-gray-200">Manage Booking</Link>
            <button 
              onClick={handleLoginClick}
              className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
            >
              <FaUser />
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;