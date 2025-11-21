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
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('EMSusername', username);

        alert('Login successful. Welcome!');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials or server inactive. Try again later.');
    }
  };

  return (
    <Box
      id="login-page-container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Card
        id="login-card"
        sx={{
          width: '100%',
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 4,
          padding: 2,
          backgroundColor: '#fff'
        }}
      >
        <CardContent>
          <Typography
            id="login-title"
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{ marginBottom: '1rem' }}
          >
            Login
          </Typography>

          <form id="login-form" onSubmit={handleSubmit}>

            {/* USERNAME INPUT */}
            <TextField
              id="login-username-input"
              fullWidth
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />

            {/* PASSWORD INPUT */}
            <TextField
              id="login-password-input"
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
                      id="login-toggle-password-btn"
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

            {/* LOADING SPINNER OR LOGIN BUTTON */}
            {loading ? (
              <Box id="login-loading" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress id="login-loading-spinner" />
              </Box>
            ) : (
              <Button
                id="login-submit-btn"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <Typography
                id="login-error-msg"
                color="error"
                textAlign="center"
                sx={{ marginTop: '1rem' }}
              >
                {error}
              </Typography>
            )}

            {/* REGISTER LINK */}
            <Typography textAlign="center" sx={{ marginTop: '1rem' }}>
              Don’t have an account?{' '}
              <Button
                id="login-register-link"
                color="primary"
                component="a"
                href="/register"
              >
                Register
              </Button>
            </Typography>

            {/* RESET PASSWORD LINK */}
            <Typography textAlign="center" sx={{ marginTop: '0.5rem' }}>
              Forgot your password?{' '}
              <Button
                id="login-reset-password-link"
                color="primary"
                component="a"
                href="/verify-username"
              >
                Reset Password
              </Button>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
