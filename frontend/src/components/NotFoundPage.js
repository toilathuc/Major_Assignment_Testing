import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      id="notfound-container"
      sx={{
        textAlign: 'center',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >

      <Typography
        id="notfound-title"
        variant="h2"
        color="error"
        gutterBottom
      >
        404
      </Typography>

      <Typography
        id="notfound-subtitle"
        variant="h5"
        gutterBottom
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>

      <Typography
        id="notfound-description"
        variant="body1"
        paragraph
      >
        It seems the page you are trying to access is not available or you have typed the wrong URL.
      </Typography>

      <Button
        id="notfound-go-home-btn"
        variant="contained"
        color="primary"
        onClick={handleGoHome}
      >
        Go Back to Home
      </Button>

    </Box>
  );
};

export default NotFoundPage;
