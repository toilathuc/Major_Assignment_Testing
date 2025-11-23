-- 1️⃣ CREATE DATABASE
CREATE DATABASE IF NOT EXISTS employee_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE employee_management;

-- 2️⃣ CREATE TABLE: departments
CREATE TABLE departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 3️⃣ CREATE TABLE: employees
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department_id BIGINT NOT NULL,
    age INT,
    CONSTRAINT fk_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 4️⃣ CREATE TABLE: users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);









-- 5️⃣ INSERT SAMPLE DATA
-- Departments
INSERT INTO departments (name)
VALUES
    ('Human Resources'),
    ('Engineering'),
    ('Marketing'),
    ('Finance');

-- Employees
INSERT INTO employees (first_name, last_name, email, department_id, age)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 2, 28),
    ('Jane', 'Smith', 'jane.smith@example.com', 1, 32),
    ('Michael', 'Brown', 'michael.brown@example.com', 3, 40),
    ('Emily', 'Johnson', 'emily.johnson@example.com', 2, 25),
    ('William', 'Davis', 'william.davis@example.com', 4, 37);

-- Users
INSERT INTO users (username, password)
VALUES
    ('admin', 'admin123'),
    ('user1', 'password1'),
    ('user2', 'password2');

-- 6️⃣ TEST SELECTS
SELECT * FROM departments;
SELECT * FROM employees;
SELECT * FROM users;

-- ✅ Done! Your MySQL database now matches the JPA entities:
-- Department  <--> departments
-- Employee    <--> employees
-- User        <--> users
-- You can now start the Spring Boot backend and test /api/employees or /api/departments.
