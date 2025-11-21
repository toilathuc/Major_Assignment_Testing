import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerifyUsername = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:8080/verify-username/${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      setLoading(false);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/reset-password?username=${username}`);
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Username not found.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Box
      id="verify-page-container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Card
        id="verify-card"
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
            id="verify-title"
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{ marginBottom: '1rem' }}
          >
            Verify Username
          </Typography>

          <form id="verify-form" onSubmit={handleSubmit}>
            <TextField
              id="verify-username-input"
              fullWidth
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />

            {loading ? (
              <Box id="verify-loading" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress id="verify-loading-spinner" />
              </Box>
            ) : (
              <Button
                id="verify-submit-btn"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Verify Username
              </Button>
            )}

            {error && (
              <Typography
                id="verify-error-msg"
                color="error"
                textAlign="center"
                sx={{ marginTop: '1rem' }}
              >
                {error}
              </Typography>
            )}

            {success && (
              <Typography
                id="verify-success-msg"
                color="primary"
                textAlign="center"
                sx={{ marginTop: '1rem' }}
              >
                Username verified! Redirecting to reset password...
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyUsername;
