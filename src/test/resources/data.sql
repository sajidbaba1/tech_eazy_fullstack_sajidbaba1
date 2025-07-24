-- Clean up any existing data
DELETE FROM parcel;
DELETE FROM users;
DELETE FROM drivers;

-- Insert test users
INSERT INTO users (username, password, role)
VALUES ('testuser', '{bcrypt}$2a$10$6ULMZcuOBPW3XlXb6frRXuqxnc7L5O9pNM.O987ZDFf7W8h7rC4qO', 'CUSTOMER');

INSERT INTO users (username, password, role)
VALUES ('testadmin', '{bcrypt}$2a$10$6ULMZcuOBPW3XlXb6frRXuqxnc7L5O9pNM.O987ZDFf7W8h7rC4qO', 'ADMIN');

-- Insert test drivers
INSERT INTO drivers (id, name, vehicle_type)
VALUES (1, 'Test Driver', 'VAN');
