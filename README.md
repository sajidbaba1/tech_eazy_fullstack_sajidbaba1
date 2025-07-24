  - `controller/` - REST API endpoints
  - `dto/` - Data Transfer Objects
  - `entity/` - Domain models
  - `service/` - Business logic
  - `repository/` - Data access layer

### Frontend
- `src/`
  - `components/` - React components
  - `context/` - React context (theme, auth)
  - `services/` - API services
  - `redux/` - State management

## User Roles and Permissions

1. Admin
   - Access all features
   - Manage vendors and drivers
   - View analytics

2. Vendor
   - Upload parcel lists
   - Track own orders
   - Cancel/Reschedule deliveries

3. Driver
   - View assigned parcels
   - Update delivery status
   - Mark attendance

4. Customer
   - Track parcels
   - Reschedule delivery
   - Raise support tickets
# Zero Mile Delivery System

A full-stack web application for managing last-mile parcel delivery from a central warehouse.

## Features

- Multiple vendor parcel list management
- Real-time delivery tracking
- Role-based access control (Admin, Vendor, Driver, Customer)
- Parcel grouping by delivery area and size
- JWT-based authentication
- Responsive React frontend

## Tech Stack

### Backend
- Java Spring Boot
- JWT Authentication
- In-memory data storage
- REST API
- Exception Handling
- OOP concepts implementation

### Frontend
- React.js with Hooks
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- JWT token handling
- Form handling with validation

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```
The backend will start on port 8000

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```
The frontend will start on port 80

## API Documentation

The complete Postman collection is available in the `resources/` directory.

### Main Endpoints
- POST /api/auth/login - User authentication
- GET /api/parcels - Get all parcels
- POST /api/parcels - Create new parcel
- GET /api/parcels/{trackingId} - Get parcel by tracking ID
- POST /api/parcels/assign - Assign driver to parcel

## Project Structure

### Backend
- `src/main/java/com/zeromile/`
  - `config/` - Security and JWT configuration
