import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BusList from './pages/BusList';
import BusDetails from './pages/BusDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import ViewSeats from './pages/ViewSeats';
import PaymentPage from './pages/PaymentPage';
import AppPromotion from './components/AppPromotion';
import BookBusTickets from './components/BookBusTickets';
import FAQSection from './components/FAQSection';
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
            {/* <Route path="/view-seats" element={<ViewSeats />} /> */}
            <Route path="/view-seats" element={<BusDetails />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </main>
        <AppPromotion />
        <BookBusTickets />
        <FAQSection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;