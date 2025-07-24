-- Clean up existing data in correct order
DELETE FROM parcel;
DELETE FROM users;
DELETE FROM drivers;

-- Insert test users with password 'password123' for all users
INSERT INTO users (username, password, role)
VALUES ('testuser', '$2a$10$6ULMZcuOBPW3XlXb6frRXuqxnc7L5O9pNM.O987ZDFf7W8h7rC4qO', 'CUSTOMER');

INSERT INTO users (username, password, role)
VALUES ('admin', '$2a$10$6ULMZcuOBPW3XlXb6frRXuqxnc7L5O9pNM.O987ZDFf7W8h7rC4qO', 'ADMIN');

INSERT INTO users (username, password, role)
VALUES ('vendor', '$2a$10$6ULMZcuOBPW3XlXb6frRXuqxnc7L5O9pNM.O987ZDFf7W8h7rC4qO', 'VENDOR');

INSERT INTO users (username, password, role)
VALUES ('driver', '$2a$10$6ULMZcuOBPW3XlXb6frRXuqxnc7L5O9pNM.O987ZDFf7W8h7rC4qO', 'DRIVER');

-- Insert test drivers
INSERT INTO drivers (id, name, vehicle_type)
VALUES (1, 'John Smith', 'VAN');

INSERT INTO drivers (id, name, vehicle_type)
VALUES (2, 'Sarah Johnson', 'BIKE');

INSERT INTO drivers (id, name, vehicle_type)
VALUES (3, 'Mike Brown', 'TRUCK');
