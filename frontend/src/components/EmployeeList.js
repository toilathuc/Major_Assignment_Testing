import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';
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

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Check login on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
    else setShowSnackbar(true);
  }, [navigate]);

  // Fetch employees only if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getAllEmployees();
          setEmployees(data);
        } catch (err) {
          console.error('Error fetching employees:', err);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDelete = async id => {
    setDeletingEmployeeId(id);
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
    setDeletingEmployeeId(null);
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const filteredEmployees = employees.filter(e =>
    e.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= LOADING OVERLAY =================
  if (loading) {
    return (
      <Box
        id="employee-list-loading"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <CircularProgress id="employee-list-spinner" />
      </Box>
    );
  }

  return (
    <Box id="employee-list-container">

      {/* ============ SNACKBAR for LOGIN REQUIRED ============ */}
      <Snackbar
        id="employee-list-snackbar"
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 9 }}
      >
        <Alert severity="warning" sx={{ width: '100%' }} onClose={handleCloseSnackbar}>
          You must be logged in to access the employee list.{' '}
          <span
            id="employee-login-link"
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

      {/* ============ PAGE TITLE ============ */}
      <h2 id="employee-list-title">Employees</h2>

      {/* ============ ADD EMPLOYEE BUTTON ============ */}
      <Button
        id="employee-add-btn"
        variant="contained"
        component={Link}
        to="/add-employee"
        sx={{ marginBottom: '1rem' }}
      >
        Add Employee
      </Button>

      {/* ============ SEARCH INPUT ============ */}
      <TextField
        id="employee-search-input"
        label="Search for an employee..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem', width: '100%' }}
      />

      {/* ============ TABLE ============ */}
      <TableContainer id="employee-table-container" component={Paper}>
        <Table id="employee-table">
          <TableHead id="employee-table-head">
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody id="employee-table-body">
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(e => (
                <TableRow id={`employee-row-${e.id}`} key={e.id}>
                  <TableCell id={`employee-firstname-${e.id}`}>{e.firstName}</TableCell>
                  <TableCell id={`employee-lastname-${e.id}`}>{e.lastName}</TableCell>
                  <TableCell id={`employee-email-${e.id}`}>{e.email}</TableCell>

                  <TableCell>
                    <Button
                      id={`employee-edit-btn-${e.id}`}
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/edit-employee/${e.id}`}
                      sx={{ marginRight: '0.5rem', marginBottom: '0.25rem' }}
                    >
                      Edit
                    </Button>

                    <Button
                      id={`employee-delete-btn-${e.id}`}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(e.id)}
                      disabled={deletingEmployeeId === e.id}
                      sx={{ marginBottom: '0.25rem' }}
                      startIcon={
                        deletingEmployeeId === e.id ? (
                          <CircularProgress
                            id={`employee-delete-spinner-${e.id}`}
                            size={20}
                          />
                        ) : null
                      }
                    >
                      {deletingEmployeeId === e.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* ============ PAGINATION ============ */}
      <TablePagination
        id="employee-pagination"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};

export default EmployeeList;
