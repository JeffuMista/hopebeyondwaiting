# Hope Beyond Waiting

A comprehensive MERN stack application for managing cancer treatment center bookings and patient care coordination. This platform streamlines the process of scheduling appointments, managing patient information, and coordinating care across multiple treatment centers.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)
- [Repository](#repository)

## 🎯 Overview

**Hope Beyond Waiting** is a patient booking management system designed to improve access to cancer treatment services across different healthcare centers. The platform enables patients to browse available treatment centers, schedule appointments, and track their booking status, while providing administrators with tools to manage centers, availability slots, and patient care.

## ✨ Features

### For Patients

- **User Authentication**: Secure sign-up and sign-in using Clerk authentication
- **Center Discovery**: Browse available treatment centers by location (county)
- **Smart Booking**: Schedule appointments with available time slots at preferred centers
- **Urgency Levels**: Indicate booking urgency (low, medium, high) for priority management
- **Booking Management**: Track booking status (pending, approved, completed, rejected)
- **User Profile**: Manage personal information and medical records
- **Dashboard**: Centralized hub for viewing bookings and appointments

### For Administrators

- **Admin Dashboard**: Comprehensive overview of all bookings and centers
- **Center Management**: Create, update, and manage treatment centers
- **Slot Management**: Define and manage available time slots at each center
- **Capacity Management**: Set and monitor center capacity
- **Booking Approval**: Review and approve/reject patient bookings
- **Analytics**: View statistics on bookings and center utilization

### General Features

- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **RESTful API**: Comprehensive backend API for all operations
- **CORS Support**: Secure cross-origin resource sharing
- **Error Handling**: Robust error management and validation
- **Real-time Updates**: Dynamic UI updates with Axios

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.1.0)
- **Database**: MongoDB with Mongoose ODM (v8.20.0)
- **Authentication**: Clerk
- **CORS**: Express CORS middleware (v2.8.5)
- **Environment**: dotenv (v17.2.3)
- **Development**: Nodemon (v3.1.11)

### Frontend

- **Framework**: React (v19.1.1)
- **Build Tool**: Vite (v7.1.7)
- **Styling**: Tailwind CSS (v4.1.17)
- **Routing**: React Router DOM (v7.9.6)
- **Authentication**: Clerk React (v5.56.0)
- **HTTP Client**: Axios (v1.13.2)
- **Icons**: React Icons (v5.5.0), Heroicons (v2.2.0)
- **Linting**: ESLint (v9.36.0)

## 📁 Project Structure

```
hopebeyondwaiting/
├── backend/
│   ├── src/
│   │   ├── server.js                 # Express server entry point
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection configuration
│   │   ├── models/
│   │   │   ├── User.js               # User schema and model
│   │   │   ├── Booking.js            # Booking schema and model
│   │   │   └── Center.js             # Treatment center schema and model
│   │   └── routes/
│   │       ├── auth.js               # Authentication endpoints (Clerk)
│   │       ├── UserRoute.js          # User management endpoints
│   │       ├── BookingRoute.js       # Booking management endpoints
│   │       └── CenterRoute.js        # Center management endpoints
│   └── package.json                  # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                  # React entry point
│   │   ├── App.jsx                   # Main App component with routing
│   │   ├── index.css                 # Global styles
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Main navigation component
│   │   │   ├── ClerkNavbar.jsx       # Navbar with Clerk auth integration
│   │   │   ├── Body.jsx              # Main content area
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── User.jsx              # User profile component
│   │   │   ├── Booking.jsx           # Booking management component
│   │   │   ├── Goals.jsx             # Goals/mission component
│   │   │   ├── Social.jsx            # Social integration component
│   │   │   ├── Stats.jsx             # Statistics component
│   │   │   ├── Action.jsx            # Call-to-action component
│   │   │   ├── lib/
│   │   │   │   └── api.js            # API client configuration
│   │   │   └── pages/
│   │   │       ├── MainPage.jsx      # Home page
│   │   │       ├── Dashboard.jsx     # User dashboard
│   │   │       ├── CenterPage.jsx    # Center listing/detail page
│   │   │       ├── AdminPage.jsx     # Admin panel
│   │   │       └── UserPage.jsx      # User profile page
│   │   └── assets/                   # Static assets (images, etc.)
│   ├── public/                       # Public static files
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── package.json                  # Frontend dependencies
│   ├── index.html                    # HTML entry point
│   └── README.md                     # Frontend-specific documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0 or higher)
- **npm** (v6.0 or higher) or **yarn**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Clerk Account** (for authentication)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/JeffuMista/hopebeyondwaiting.git
   cd hopebeyondwaiting
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

#### Backend (.env file in `backend/` directory)

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hopebeyondwaiting

# Port Configuration
PORT=5000

# CORS Configuration
ALLOWED_ORIGIN=http://localhost:5173

# Clerk Configuration
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Other Configuration
NODE_ENV=development
```

#### Frontend (.env file in `frontend/` directory)

Create a `.env` file in the frontend directory with the following variables:

```env
# Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

#### Development Mode

**Terminal 1 - Backend Server:**

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**

```bash
cd frontend
npm run dev
```

The frontend will be available on `http://localhost:5173` (or the port shown in your terminal)

#### Production Build

**Build Frontend:**

```bash
cd frontend
npm run build
```

**Start Backend (Production):**

```bash
cd backend
npm start
```

- Production (frontend UI) - "https://hopebeyondwaiting.vercel.app/"

## 📡 API Documentation

### Base URL

- Development: `http://localhost:5000/api`
- Production: `https://hopebeyondwaiting.onrender.com/api`

### Authentication Routes (`/api/auth`)

- **POST** `/register` - Register a new user with Clerk
- **POST** `/login` - Login with Clerk
- **GET** `/user` - Get current authenticated user

### User Routes (`/api/users`)

- **GET** `/` - Get all users (Admin only)
- **GET** `/:id` - Get user by ID
- **POST** `/` - Create new user
- **PUT** `/:id` - Update user information
- **DELETE** `/:id` - Delete user (Admin only)

### Center Routes (`/api/centers`)

- **GET** `/` - Get all treatment centers
- **GET** `/:id` - Get specific center details
- **POST** `/` - Create new center (Admin only)
- **PUT** `/:id` - Update center information (Admin only)
- **DELETE** `/:id` - Delete center (Admin only)
- **POST** `/:id/slots` - Add time slots to center
- **PUT** `/:id/slots/:slotId` - Update slot availability

### Booking Routes (`/api/bookings`)

- **GET** `/` - Get all bookings (Admin) or user's bookings
- **GET** `/:id` - Get booking details
- **POST** `/` - Create new booking
- **PUT** `/:id` - Update booking status
- **DELETE** `/:id` - Cancel booking
- **GET** `/user/:userId` - Get all bookings for specific user

## 📊 Database Schema

### User Model

```javascript
{
  UserId: String (indexed),
  name: String (required),
  phone: Number (required),
  nationalId: Number (required),
  role: String (enum: ["user", "admin"], default: "patient"),
  timestamps: Boolean
}
```

### Center Model

```javascript
{
  name: String (required),
  county: String (required),
  address: String (required),
  capacity: Number (required),
  slots: [{
    start: Date,
    end: Date,
    capacity: Number,
    booked: Number (default: 0)
  }],
  timestamps: Boolean
}
```

### Booking Model

```javascript
{
  user: ObjectId (ref: "User", required),
  center: ObjectId (ref: "Center", required),
  slot: {
    start: Date,
    end: Date
  },
  status: String (enum: ["pending", "approved", "completed", "rejected"], default: "pending"),
  urgencyLevel: String (enum: ["low", "medium", "high"], default: "medium"),
  notes: String,
  timestamps: Boolean
}
```

## 🧩 Frontend Components

- **ClerkNavbar**: Navigation bar with Clerk authentication integration
- **MainPage**: Landing page with overview of services
- **Dashboard**: Main user dashboard for viewing bookings and stats
- **CenterPage**: Browse and manage treatment centers
- **AdminPage**: Administrative interface for managing system
- **UserPage**: User profile and settings management
- **Booking**: Component for creating and managing bookings
- **User**: User information display component
- **Goals**: Mission and goals section
- **Stats**: Statistics and metrics display
- **Footer**: Application footer

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate documentation.

## 📜 License

This project is licensed under the ISC License. See the individual `package.json` files for more details.

## 🔗 Repository

- **GitHub**: [https://github.com/JeffuMista/hopebeyondwaiting](https://github.com/JeffuMista/hopebeyondwaiting)
- **Owner**: JeffuMista
- **Default Branch**: main

---

## 📞 Support

For issues, questions, or suggestions, please:

1. Check the [GitHub Issues](https://github.com/JeffuMista/hopebeyondwaiting/issues)
2. Create a new issue if your question hasn't been addressed
3. Include detailed information about your issue or feature request

---

**Last Updated**: November 2025
**Version**: 1.0.0
