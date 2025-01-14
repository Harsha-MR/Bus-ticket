import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BusList from './pages/BusList';
import BusDetails from './pages/BusDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buses" element={<BusList />} />
            <Route path="/bus/:id" element={<BusDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;