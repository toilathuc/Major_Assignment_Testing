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
    name: '',
    email: '',
    age: '',
    department: { id: '' },
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
    department: '',
  });

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
              name: `${employeeData.firstName || ''} ${employeeData.lastName || ''}`.trim(),
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
        [name]: value,
      });
    }
  };

  const validate = () => {
    let tempErrors = { name: '', email: '', age: '', department: '' };
    let isValid = true;

    if (!employee.name) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!employee.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      tempErrors.email = 'Invalid email';
      isValid = false;
    }

    if (!employee.age) {
      tempErrors.age = 'Age is required';
      isValid = false;
    } else {
      const ageNum = Number(employee.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        tempErrors.age = 'Invalid age';
        isValid = false;
      }
    }

    if (!employee.department.id) {
      tempErrors.department = 'Department required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Split name into first and last
    const nameParts = employee.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '.'; // Default last name if missing

    const employeePayload = {
      firstName,
      lastName,
      email: employee.email,
      age: Number(employee.age),
      department: { id: employee.department.id },
    };

    try {
      if (id) {
        await updateEmployee(id, employeePayload);
      } else {
        await addEmployee(employeePayload);
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
      noValidate
      sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' } }}
    >
      <h2 id="employee-form-title">{id ? 'Edit Employee' : 'Add Employee'}</h2>

      <TextField
        id="employee-name-input"
        label="Name"
        name="name"
        value={employee.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name && <span id="employee-name-error">{errors.name}</span>}
      />

      <TextField
        id="employee-email-input"
        label="Email"
        name="email"
        type="email"
        value={employee.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email && <span id="employee-email-error">{errors.email}</span>}
      />

      <TextField
        id="employee-age-input"
        label="Age"
        name="age"
        type="number"
        value={employee.age}
        onChange={handleChange}
        inputProps={{ min: 1, max: 150 }}
        error={!!errors.age}
        helperText={errors.age && <span id="employee-age-error">{errors.age}</span>}
      />

      <TextField
        id="employee-department-select"
        select
        label="Department"
        name="department.id"
        value={employee.department.id || ''}
        onChange={handleChange}
        error={!!errors.department}
        helperText={errors.department && <span id="employee-department-error">{errors.department}</span>}
      >
        <MenuItem id="employee-department-option-none" value="">
          Select Department
        </MenuItem>

        {departments.map(dep => (
          <MenuItem id={`employee-department-option-${dep.id}`} key={dep.id} value={dep.id}>
            {dep.name}
          </MenuItem>
        ))}
      </TextField>

      <Button id="employee-save-btn" type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
        Save
      </Button>
    </Box>
  );
};

export default EmployeeForm;
