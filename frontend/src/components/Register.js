import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      setLoading(false);

      if (response.ok) {
        alert('User registered successfully. Please login to continue.');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Error registering user. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Box
      id="register-page-container"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Card
        id="register-card"
        sx={{ width: '100%', maxWidth: 400, boxShadow: 3, borderRadius: 4, padding: 2, backgroundColor: '#fff' }}
      >
        <CardContent>
          <Typography
            id="register-title"
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{ marginBottom: '1rem' }}
          >
            Register
          </Typography>

          <form id="register-form" onSubmit={handleSubmit}>

            {/* USERNAME */}
            <TextField
              id="register-username-input"
              fullWidth
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />

            {/* PASSWORD */}
            <TextField
              id="register-password-input"
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="register-toggle-password-btn"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* CONFIRM PASSWORD */}
            <TextField
              id="register-confirm-password-input"
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="register-toggle-confirm-password-btn"
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* LOADING OR BUTTON */}
            {loading ? (
              <Box id="register-loading" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress id="register-loading-spinner" />
              </Box>
            ) : (
              <Button
                id="register-submit-btn"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </Button>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <Typography
                id="register-error-msg"
                color="error"
                textAlign="center"
                sx={{ marginTop: '1rem' }}
              >
                {error}
              </Typography>
            )}

            {/* LINK TO LOGIN */}
            <Typography textAlign="center" sx={{ marginTop: '1rem' }}>
              Already have an account?{' '}
              <Button
                id="register-login-link"
                color="primary"
                component="a"
                href="/login"
              >
                Login
              </Button>
            </Typography>

          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
