// src/pages/Payment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentStatus('Processing...');

    // Simulate successful payment after a delay
    setTimeout(() => {
      setPaymentStatus('Payment Successful!');
      // Redirect to the confirmation page
      navigate('/confirmation');
    }, 2000); // Simulating payment processing delay (2 seconds)
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Amount: $50</p>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
