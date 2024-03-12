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
    password VARCHAR(255) NOT NULL , 
    type ENUM('admin', 'user') NOT NULL ,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Person (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    gender ENUM('Male', 'Female') NOT NULL ,
    age INT NOT NULL,
    photo_url VARCHAR(255) Not NULL, 
    severity INT NOT NULL 
);

CREATE TABLE IF NOT EXISTS Cameras (
    cam_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(512) NOT NULL ,
    location_severity INT NOT NULL 
);

CREATE TABLE IF NOT EXISTS Alert (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp INT NOT NULL ,
    description VARCHAR(512) NOT NULL ,
    severity INT NOT NULL 
);


INSERT INTO account (email, password, type, name) VALUES
('admin1@example.com', 'password1', 'admin', 'admin1'),
('admin2@example.com', 'password2', 'admin', 'admin2'),
('user1@example.com', 'password1', 'user', 'user1'),
('user2@example.com', 'password2', 'user', 'user2'),
('user3@example.com', 'password3', 'user', 'user3');


INSERT INTO Alert (timestamp, description,  severity) VALUES
(1708740225000, 'Alert1',1),
(1641618400000, 'Alert2',5),
(1709295767000, 'Alert3', 10);