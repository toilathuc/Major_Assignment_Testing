import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployeeById, updateEmployee } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import { TextField, Button, MenuItem, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const CenteredSpinner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    department: { id: '' },
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const departmentsData = await getAllDepartments();
        setDepartments(departmentsData);

        if (id) {
          const employeeData = await getEmployeeById(id);

          if (employeeData) {
            setEmployee({
              firstName: employeeData.firstName || '',
              lastName: employeeData.lastName || '',
              email: employeeData.email || '',
              age: employeeData.age || '',
              department: {
                id: employeeData.department ? employeeData.department.id : '',
              },
            });
          }
        }
      } catch (error) {
        console.error('Error loading employee form:', error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'department.id') {
      setEmployee({ ...employee, department: { id: value } });
    } else {
      setEmployee({
        ...employee,
        [name]: name === 'age' ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await updateEmployee(id, employee);
      } else {
        await addEmployee(employee);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    }

    setIsLoading(false);
  };

  // Loading overlay
  if (isLoading) {
    return (
      <CenteredSpinner id="employee-form-loading">
        <CircularProgress id="employee-form-spinner" />
      </CenteredSpinner>
    );
  }

  return (
    <Box
      id="employee-form-container"
      component="form"
      onSubmit={handleSubmit}
      sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' } }}
    >
      <h2 id="employee-form-title">{id ? 'Edit Employee' : 'Add Employee'}</h2>

      <TextField
        id="employee-firstname-input"
        label="First Name"
        name="firstName"
        value={employee.firstName}
        onChange={handleChange}
        required
      />

      <TextField
        id="employee-lastname-input"
        label="Last Name"
        name="lastName"
        value={employee.lastName}
        onChange={handleChange}
        required
      />

      <TextField
        id="employee-email-input"
        label="Email"
        name="email"
        type="email"
        value={employee.email}
        onChange={handleChange}
        required
      />

      <TextField
        id="employee-age-input"
        label="Age"
        name="age"
        type="number"
        value={employee.age}
        onChange={handleChange}
        required
        inputProps={{ min: 1, max: 150 }}
      />

      <TextField
        id="employee-department-select"
        select
        label="Department"
        name="department.id"
        value={employee.department.id || ''}
        onChange={handleChange}
        required
      >
        <MenuItem id="employee-department-option-none" value="">
          Select Department
        </MenuItem>

        {departments.map(dep => (
          <MenuItem
            id={`employee-department-option-${dep.id}`}
            key={dep.id}
            value={dep.id}
          >
            {dep.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        id="employee-save-btn"
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: '1rem' }}
      >
        Save
      </Button>
    </Box>
  );
};

export default EmployeeForm;
