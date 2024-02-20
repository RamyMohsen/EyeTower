-- Drop the existing database (for update purpose)
DROP DATABASE IF EXISTS EyeTower;

-- Create the "EyeTower" database
CREATE DATABASE IF NOT EXISTS EyeTower;

-- Switch to the "EyeTower" database
USE EyeTower;

-- Create the "Account" table
CREATE TABLE IF NOT EXISTS account (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL , 
    type ENUM('admin', 'user') NOT NULL ,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Person (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL ,
    gender ENUM('Male', 'Female') NOT NULL ,
    age INT NOT NULL
    photo_url VARCHAR(255) Not NULL, 
    severity ENUM(1, 2, 3, 4, 5) NOT NULL 
);

CREATE TABLE IF NOT EXISTS Cameras (
    cam_id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(512) NOT NULL ,
    location_severity ENUM(1, 2, 3, 4, 5) NOT NULL 
);

CREATE TABLE IF NOT EXISTS Alert (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL ,
    description VARCHAR(512) NOT NULL ,
    severity INT NOT NULL 
);


INSERT INTO account (email, pass, type, name) VALUES
('admin1@example.com', 'password1', 'admin', 'admin1'),
('admin2@example.com', 'password2', 'admin', 'admin2'),
('admin3@example.com', 'password3', 'admin', 'admin3'),
('user1@example.com', 'password1', 'user', 'user1'),
('user2@example.com', 'password2', 'user', 'user2'),
('user3@example.com', 'password3', 'user', 'user3'),
('user4@example.com', 'password4', 'user', 'user4'),

-- Insert data into the "Person" table
INSERT INTO Person (person_id, name, gender, age, photo_url, severity) VALUES
('Company1', 'Description for Company1', 'Address1', 'Location1', '123456789', 1, NULL),
('Company2', 'Description for Company2', 'Address2', 'Location2', '987654321', 2, NULL),
('Company3', 'Description for Company3', 'Address3', 'Location3', '456789123', 3, NULL),
('Company4', 'Description for Company4', 'Address4', 'Location4', '789123456', 4, NULL);

-- Insert data into the "Cameras" table
INSERT INTO Cameras (location, location_severity) VALUES
('Building1', 1),
('Building2', 2),
('Building3', 3),
('Building4', 4),
('Building5', 5),


