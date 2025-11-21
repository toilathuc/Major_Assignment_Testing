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
