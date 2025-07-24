# Zero Mile Delivery System

A full-stack delivery management system with role-based access control.

## Features

- Role-based authentication (Admin, Vendor, Driver, Customer)
- Real-time parcel tracking
- Driver assignment and management
- Performance monitoring and analytics
- Dark mode support
- Responsive design

## Tech Stack

### Backend
- Java Spring Boot
- Spring Security with JWT
- H2 Database
- JPA/Hibernate
- Maven

### Frontend
- React.js
- Redux for state management
- Tailwind CSS
- Axios for API calls

## Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 16 or higher
- Maven
- npm/yarn

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd ZeroMileDeliverySystemBackend
```

2. **Backend Setup**
```bash
# Build and run the Spring Boot application
mvn clean install
java -jar target/zeromile-backend-0.0.1-SNAPSHOT.jar
```
The backend will start on http://localhost:8000

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```
The frontend will start on http://localhost:80

## Default Users

The system comes with pre-configured users for testing:

| Username | Password    | Role     |
|----------|------------|----------|
| admin    | password123| ADMIN    |
| vendor   | password123| VENDOR   |
| driver   | password123| DRIVER   |
| testuser | password123| CUSTOMER |

## API Documentation

### Authentication

- POST `/api/auth/login`: Login with username and password
- POST `/api/auth/validate`: Validate JWT token

### Parcels

- GET `/api/parcels`: Get parcels (filtered by user role)
- POST `/api/parcels/create`: Create new parcel (VENDOR, ADMIN only)
- POST `/api/parcels/assign`: Assign driver to parcel (ADMIN only)
- GET `/api/parcels/track/{trackingNumber}`: Track parcel status (public)

### Security Notes

1. All API endpoints (except login and tracking) require JWT authentication
2. Token must be included in Authorization header: `Bearer <token>`
3. CORS is configured for localhost development

## Development Notes

### Environment Configuration

Backend configuration is in `src/main/resources/application.properties`:
- Server port: 8000
- H2 Database console: http://localhost:8000/h2-console
- JWT expiration: 1 hour

Frontend configuration is in `frontend/.env`:
- API base URL: http://localhost:8000/api
- Port: 80

### Building for Production

1. **Backend**
```bash
mvn clean package -Pprod
```

2. **Frontend**
```bash
cd frontend
npm run build
```

## Testing

1. Import the Postman collection from `src/main/resources/ZeroMileDelivery.postman_collection.json`
2. Create an environment with variables:
   - `jwt_token`
   - `tracking_number`
   - `parcel_id`
   - `driver_id`

## Contributing

1. Create a feature branch
2. Commit changes
3. Open a pull request

## License

This project is licensed under the MIT License.
