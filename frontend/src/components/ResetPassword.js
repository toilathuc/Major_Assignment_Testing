import React, { useState, useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get username from URL (?username=xxx)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const usernameFromQuery = queryParams.get('username');
    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }
  }, [location]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setLoading(false);
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword }),
      });

      setLoading(false);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error resetting password.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Box
      id="reset-page-container"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Card
        id="reset-card"
        sx={{ width: '100%', maxWidth: 400, boxShadow: 3, borderRadius: 4, padding: 2, backgroundColor: '#fff' }}
      >
        <CardContent>
          <Typography
            id="reset-title"
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{ marginBottom: '1rem' }}
          >
            Reset Password
          </Typography>

          <form id="reset-form" onSubmit={handleSubmit}>

            {/* USERNAME */}
            <TextField
              id="reset-username-input"
              fullWidth
              label="Username"
              value={username}
              disabled
              sx={{ marginBottom: '1rem' }}
            />

            {/* NEW PASSWORD */}
            <TextField
              id="reset-newpass-input"
              fullWidth
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="reset-toggle-newpass-btn"
                      aria-label="toggle new password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* CONFIRM NEW PASSWORD */}
            <TextField
              id="reset-confirmpass-input"
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="reset-toggle-confirmpass-btn"
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

            {/* LOADING SPINNER OR SUBMIT BUTTON */}
            {loading ? (
              <Box id="reset-loading" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress id="reset-loading-spinner" />
              </Box>
            ) : (
              <Button
                id="reset-submit-btn"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Reset Password
              </Button>
            )}

            {/* ERROR MSG */}
            {error && (
              <Typography
                id="reset-error-msg"
                color="error"
                textAlign="center"
                sx={{ marginTop: '1rem' }}
              >
                {error}
              </Typography>
            )}

            {/* SUCCESS MSG */}
            {success && (
              <Typography
                id="reset-success-msg"
                color="primary"
                textAlign="center"
                sx={{ marginTop: '1rem' }}
              >
                Password reset successful! Redirecting to login...
              </Typography>
            )}

          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
