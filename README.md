Here’s a clean, professional, and **well-structured `README.md` file** for your **Zero Mile Delivery System** project, perfect for GitHub:

---

# 🚚 Zero Mile Delivery System

A full-stack parcel delivery management system built with **Spring Boot** and **React**, secured using **JWT Authentication**, and managed with **Redux**.

---

## 🌐 Overview

**Zero Mile Delivery System** is designed to simplify parcel tracking, assignment, and reporting. It includes:

* ✅ Secure login and registration system using JWT
* 📦 Parcel creation, tracking, and grouping by area
* 🚗 Driver assignment to parcels
* 📊 Daily delivery reports
* 🧩 Backend: Java 21 + Spring Boot 3 + MySQL
* 🎨 Frontend: React 18 + Redux + React Router

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

1. **Install Dependencies**

   * Java 21+
   * MySQL 8+

2. **Configure Database**

   * Create a MySQL database named: `zeromile`
   * Open `backend/src/main/resources/application.properties`
   * Update the DB credentials and set a strong `jwt.secret` (32+ characters)

3. **Build and Run Backend**

   ```bash
   cd backend
   mvn clean install
   java -jar target/zeromile-backend-0.0.1-SNAPSHOT.jar
   ```

4. **Access Backend APIs**

   ```
   http://localhost:8080/api
   ```

---

### 💻 Frontend Setup

1. **Install Node.js** (v16 or higher)

2. **Run Frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Access Application**

   ```
   http://localhost:3000
   ```

---

## 🔐 Authentication & Authorization

* **Register:** `POST /api/auth/register`
* **Login:** `POST /api/auth/login` → Returns JWT token
* Roles: `ADMIN`, `VENDOR`, `SUPERVISOR` (stored in DB)

---

## 📡 API Endpoints

| Method | Endpoint                                           | Description                     |
| ------ | -------------------------------------------------- | ------------------------------- |
| POST   | `/api/auth/register`                               | Register a new user             |
| POST   | `/api/auth/login`                                  | Authenticate user & receive JWT |
| POST   | `/api/parcels`                                     | Create a parcel                 |
| GET    | `/api/parcels`                                     | Get all parcels                 |
| GET    | `/api/parcels/{trackingId}`                        | Track parcel by ID              |
| GET    | `/api/parcels/group-by-area`                       | Get parcels grouped by area     |
| POST   | `/api/parcels/{parcelId}/assign-driver/{driverId}` | Assign a driver                 |
| GET    | `/api/parcels/report/daily`                        | Generate daily delivery report  |

---

## 🧩 Tech Stack & Dependencies

### Backend

* Spring Boot 3.2.0
* Spring Security 6.2.x
* MySQL Connector 8.0.33
* JJWT 0.12.6
* SLF4J, Logback
* Spring Validation

### Frontend

* React 18.2.0
* axios 1.6.0
* react-redux 8.0.5
* redux 4.2.1
* redux-thunk 2.4.2
* react-router-dom 6.14.0
* react-scripts 5.0.1

---

## ✨ Key Improvements

* 🔁 `ParcelService`: Clean constructor injection and DTO mapper
* ✅ `ParcelDTO`: Field validations using `@NotNull`
* 🔍 `ParcelController`: Added `@Valid` validation for inputs
* 🔒 `SecurityConfig`: Added CORS, fixed dependency injection issues
* 👤 `UserDetailsServiceImpl`: Resolved class import conflicts
* 🧪 `ZeromileBackendApplication`: Seeds test user on app startup
* 🛠️ JWT & Redux: Improved error handling, logging, and token validation

---

## 🪛 Debugging Tips

### Backend

* Enable debug logs:

  ```properties
  logging.level.org.springframework=DEBUG
  logging.level.com.zeromile=DEBUG
  ```
* Run Maven with debug:

  ```bash
  mvn clean install -X
  ```

### Frontend

* For CORS or 403 errors:

  * Check `JwtAuthenticationFilter` logs
  * Validate JWT token in `Authorization` header
  * Ensure user role exists in DB

* For Redux or token issues:

  * Check JWT token in browser `localStorage`
  * Validate redux-thunk import:

    ```js
    import { thunk } from 'redux-thunk';
    ```

* If React fails:

  ```bash
  npm install react-scripts --save-dev
  npm cache clean --force
  ```

---

## 🧪 API Testing (Postman)

* ✅ Use the provided [Postman Collection](./backend/postman_collection.json) to test APIs.
* Ensure correct token in Authorization header:

  ```
  Bearer <your_jwt_token>
  ```

---

## 🧯 Troubleshooting

| Issue                    | Fix                                                                      |
| ------------------------ | ------------------------------------------------------------------------ |
| **Maven Build Fails**    | Ensure you're inside the `backend` directory and `pom.xml` is present    |
| **Frontend Won’t Start** | Try: `npm install react-scripts --save-dev` or `npm cache clean --force` |
| **403 Forbidden Errors** | Check JWT token, user role in DB, and CORS settings                      |
| **Redux/Thunk Errors**   | Ensure `redux-thunk` is correctly imported and configured                |

---

## 🤝 Contribution

PRs and feedback are welcome! Please open issues if you find any bugs or have suggestions.

---

## 📄 License

MIT License © 2025 \[Your Name or Org]

---

Let me know if you want:

* Badges (build, license, version)
* Logo or screenshots
* Deploy instructions for Heroku, Vercel, or Docker setup

Want me to generate a `README.md` file to download or push to GitHub?
