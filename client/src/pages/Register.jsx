import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Handle registration logic
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', formData);
        console.log('Registration successful:', response.data);

        // Store the user's full name in local storage
        localStorage.setItem('userName', formData.name);

        // Show success message
        setSuccessMessage('Registration successful! Redirecting to login...');
        setError('');

        // Wait for 2 seconds, then redirect to the login page
        setTimeout(() => {
          toggleMode(); // Switch to login mode
        }, 2000);
      } catch (error) {
        setError(error.response?.data?.message || 'Registration failed. Please try again.');
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    } else {
      // Handle login logic
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        console.log('Login successful:', response.data);

        // Store the user's full name in local storage
        localStorage.setItem('userName', formData.name);

        // Show success message
        setSuccessMessage('Login successful! Redirecting to homepage...');
        setError('');

        // Wait for 2 seconds, then redirect to the homepage
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create new account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Name field for registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Phone field for registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success message */}
          {successMessage && (
            <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg" role="alert">
              {successMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button onClick={toggleMode} className="text-primary hover:text-red-700">
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
