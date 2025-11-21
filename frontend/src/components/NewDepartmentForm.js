import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';

const NewDepartmentForm = () => {
  const [department, setDepartment] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newDepartment = {
      id: Math.floor(Math.random() * 10000),
      name: department.name,
      employees: [],
    };

    try {
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment),
      });

      if (!response.ok) {
        throw new Error('Failed to create department');
      }

      navigate('/departments');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create department. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      id="new-department-form"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' },
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      <Typography id="new-department-title" variant="h5" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
        Create New Department
      </Typography>

      <TextField
        id="new-department-name-input"
        label="Department Name"
        name="name"
        value={department.name}
        onChange={handleChange}
        required
        fullWidth
      />

      {error && (
        <Typography id="new-department-error" sx={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      <Button
        id="new-department-submit-btn"
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: '1rem', width: '100%' }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress id="new-department-loading" size={24} /> : 'Save'}
      </Button>
    </Box>
  );
};

export default NewDepartmentForm;
