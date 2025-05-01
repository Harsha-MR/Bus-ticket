# getBus - Bus Ticket Booking System

A comprehensive bus ticket booking system built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization with JWT
- Bus search and booking system
- Seat selection with visual representation
- Real-time seat availability tracking
- Booking history and management
- Email notifications for bookings
- Payment integration
- Mobile-responsive design
- Dark/Light theme support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## File Structure

```
Bus-ticket/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Buses
- `GET /api/buses` - Get all buses
- `GET /api/buses/:id` - Get bus details
- `POST /api/buses` - Add new bus (Admin)
- `PUT /api/buses/:id` - Update bus details (Admin)
- `DELETE /api/buses/:id` - Delete bus (Admin)

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### Seats
- `GET /api/buses/:id/seats` - Get seat availability
- `PUT /api/buses/:id/seats` - Update seat status

### Payments
- `POST /api/payments/create` - Create payment intent
- `POST /api/payments/verify` - Verify payment status

## Setup Instructions

### Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a .env file in the server directory with:
JWT_SECRET="YOUR JWT SECRET KEY HERE"
MONGO_URL="YOUR MONGODB CONNECTION STRING HERE"
EMAIL_USER="YOUR EMAIL USER ID HERE"
EMAIL_PASS="YOUR EMAIL PASSWORD HERE"
