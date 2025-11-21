import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDepartments, deleteDepartment } from '../services/departmentService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const DepartmentList = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setShowSnackbar(true);
    }
  }, [navigate]);

  // Fetch departments data if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getAllDepartments();
          setDepartments(data);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDelete = async id => {
    setDeletingDepartmentId(id);
    try {
      await deleteDepartment(id);
      setDepartments(prev =>
        prev.filter(dep => dep.id !== id)
      );
    } catch (error) {
      console.error('Error deleting department:', error);
    }
    setDeletingDepartmentId(null);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDepartments = departments.filter(dep =>
    dep.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Loading overlay
  if (loading) {
    return (
      <Box
        id="department-list-loading"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <CircularProgress id="department-list-spinner" />
      </Box>
    );
  }

  return (
    <Box id="department-list-container">
      {/* Login required Snackbar */}
      <Snackbar
        id="department-list-snackbar"
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 9 }}
      >
        <Alert severity="warning" sx={{ width: '100%' }} onClose={handleCloseSnackbar}>
          You must be logged in to access the department list.{' '}
          <span
            id="department-login-link"
            onClick={handleLoginRedirect}
            style={{
              color: '#3f51b5',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Login
          </span>
        </Alert>
      </Snackbar>

      {/* Page title */}
      <h2 id="department-list-title">Departments</h2>

      {/* Add Department */}
      <Button
        id="department-add-btn"
        variant="contained"
        component={Link}
        to="/add-department"
        sx={{ marginBottom: '1rem' }}
      >
        Add Department
      </Button>

      {/* Search field */}
      <TextField
        id="department-search-input"
        label="Search for a department"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem', width: '100%' }}
      />

      {/* Table */}
      <TableContainer id="department-table-container" component={Paper}>
        <Table id="department-table">
          <TableHead>
            <TableRow id="department-table-head">
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody id="department-table-body">
            {filteredDepartments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(dep => (
                <TableRow id={`department-row-${dep.id}`} key={dep.id}>
                  <TableCell id={`department-name-${dep.id}`}>{dep.name}</TableCell>

                  <TableCell>
                    <Button
                      id={`department-edit-btn-${dep.id}`}
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/edit-department/${dep.id}`}
                      sx={{ marginRight: '0.5rem' }}
                    >
                      Edit
                    </Button>

                    <Button
                      id={`department-delete-btn-${dep.id}`}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(dep.id)}
                      disabled={deletingDepartmentId === dep.id}
                      startIcon={
                        deletingDepartmentId === dep.id ? (
                          <CircularProgress id={`department-delete-spinner-${dep.id}`} size={20} />
                        ) : null
                      }
                    >
                      {deletingDepartmentId === dep.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        id="department-pagination"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDepartments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DepartmentList;
