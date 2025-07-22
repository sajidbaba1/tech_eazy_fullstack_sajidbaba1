Zero Mile Delivery System
Overview
A full-stack application for parcel delivery management, with a Spring Boot backend and a React frontend, using JWT authentication and Redux for state management.
Setup
Backend

Install Java 21 and MySQL.
Configure MySQL database zeromile in backend/src/main/resources/application.properties.
Update jwt.secret with a secure 32+ character key.
Navigate to the backend directory (ensure pom.xml is present):cd backend


Build and run:mvn clean install
java -jar target/zeromile-backend-0.0.1-SNAPSHOT.jar


Access APIs at http://localhost:8080/api.

Frontend

Install Node.js and npm (version 16 or higher).
Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Start the frontend:npm start


Access the frontend at http://localhost:3000.

APIs

POST /api/auth/register: Register a user.
POST /api/auth/login: Login and receive JWT.
POST /api/parcels: Create a parcel (requires valid customerName, deliveryAddress, contactNumber, parcelSize, deliveryArea).
GET /api/parcels: List all parcels.
GET /api/parcels/{trackingId}: Get parcel by tracking ID.
GET /api/parcels/group-by-area: Group parcels by delivery area.
POST /api/parcels/{parcelId}/assign-driver/{driverId}: Assign a driver to a parcel.
GET /api/parcels/report/daily: Get daily delivery report.

Dependencies

Backend: Spring Boot 3.2.0, Spring Security 6.2.x, JJWT 0.12.6, MySQL Connector 8.0.33, SLF4J, Logback, Spring Boot Starter Validation.
Frontend: React 18.2.0, axios 1.6.0, react-redux 8.0.5, redux 4.2.1, redux-thunk 2.4.2, react-router-dom 6.14.0, react-scripts 5.0.1.

Improvements

ParcelService: Uses constructor injection, logging, and a toParcelDTO helper method.
ParcelDTO: Added with @NotNull validation for required fields.
ParcelController: Added @Valid for input validation on createParcel.
SecurityConfig: Fixed UnsatisfiedDependencyException, added CORS for http://localhost:3000, and permitted unauthenticated access to /.
UserDetailsServiceImpl: Fixed import conflict for User by using fully qualified name for Spring Security’s User.
ZeromileBackendApplication: Added test user seeding.
Login.js and parcelActions.js: Added JWT debug logging and error handling for 403 errors.
JwtAuthenticationFilter: Added detailed logging for JWT validation.
store.js: Fixed redux-thunk import error by using named thunk export.
pom.xml: Added to backend to fix Maven build failure.

Debugging

Backend:
Run Maven from the directory containing pom.xml (e.g., backend or project root).
Enable debug logging in application.properties:logging.level.org.springframework=DEBUG
logging.level.com.zeromile=DEBUG


If Maven fails, verify pom.xml exists and run mvn clean install -X for debug output.
For 403 errors, check JwtAuthenticationFilter logs for Invalid JWT token or No Bearer token found. Verify user role (VENDOR, ADMIN, SUPERVISOR) in the database.


Frontend:
Check browser DevTools (Network/Console tabs) for failed requests or errors.
For redux-thunk errors, ensure the named thunk import is used (import { thunk } from 'redux-thunk').
For 403 errors, verify JWT in localStorage (DevTools > Application > Local Storage) and ensure login stores a valid token.
If frontend fails to start, run npm install react-scripts --save-dev or clear npm cache (npm cache clean --force).



Postman Collection
See backend/postman_collection.json for API testing.
Troubleshooting

Maven build failure: Ensure pom.xml is in the backend directory (or project root) and run mvn clean install from there. Check directory structure with dir.
Frontend won’t start: Run npm install react-scripts --save-dev or clear npm cache (npm cache clean --force).
403 errors: Verify JWT in Authorization: Bearer <token> header, check user role in the database (SELECT * FROM user), and ensure CORS allows http://localhost:3000.
Redux errors: Ensure correct imports for redux-thunk and verify Redux store configuration.
