import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDepartment, getDepartmentById, updateDepartment } from '../services/departmentService';
import { TextField, Button, CircularProgress, Box } from '@mui/material';

const DepartmentForm = () => {
  const [department, setDepartment] = useState({
    id: '',
    name: '',
    description: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');

  // ===== LOAD DATA IF EDIT MODE =====
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const res = await getDepartmentById(id);
          setDepartment({
            id: res.id,
            name: res.name,
            description: res.description || '',
          });
        } catch (error) {
          console.error('Error loading department:', error);
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ===== HANDLE CHANGE =====
  const handleChange = e => {
    const { name, value } = e.target;
    setDepartment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== SAVE =====
  const handleSubmit = async e => {
    e.preventDefault();
    setNameError('');

    if (!department.name) {
      setNameError('Name is required');
      return;
    }
    if (department.name.length < 3) {
      setNameError('Name is too short');
      return;
    }
    if (department.name.length > 25) {
      setNameError('Name is too long');
      return;
    }

    setIsLoading(true);

    try {
      if (id) {
        await updateDepartment(id, department);
      } else {
        await addDepartment(department);
      }
      navigate('/departments');
    } catch (err) {
      console.error('Error saving department:', err);
    }

    setIsLoading(false);
  };

  // ===== LOADING OVERLAY =====
  if (isLoading) {
    return (
      <Box
        id="department-form-loading"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress id="department-form-spinner" />
      </Box>
    );
  }

  return (
    <Box
      id="department-form-container"
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' },
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h2 id="department-form-title">{id ? 'Edit Department' : 'Add Department'}</h2>

      <TextField
        id="department-name-input"
        label="Department Name"
        name="name"
        value={department.name}
        onChange={handleChange}
        error={!!nameError}
        helperText={nameError && <span id="department-name-error">{nameError}</span>}
      />

      <TextField id="department-desc-input" label="Description" name="description" value={department.description} onChange={handleChange} multiline rows={3} />

      <Button id="department-save-btn" type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
        Save
      </Button>
    </Box>
  );
};

export default DepartmentForm;
