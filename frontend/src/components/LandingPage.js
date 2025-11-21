import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const animationStyle = {
    animation: 'dropDown 0.8s ease forwards',
    opacity: 0,
    '@keyframes dropDown': {
      '0%': { transform: 'translateY(-20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  };

  return (
    <Box
      id="landing-page-container"
      sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '2rem 0' }}
    >
      <Container maxWidth="lg">

        {/* ================== WELCOME BOX ================== */}
        <Box
          id="landing-welcome-box"
          sx={{
            ...animationStyle,
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: '#3f51b5',
            color: 'white',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            id="landing-title"
            variant="h3"
            sx={{
              fontWeight: 600,
              marginBottom: '1rem',
              fontSize: isSmallScreen ? '2rem' : 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            Welcome to Employee Management System
          </Typography>

          <Typography
            id="landing-subtitle"
            variant="h6"
            sx={{
              marginBottom: '2rem',
              fontSize: isSmallScreen ? '1rem' : 'clamp(1rem, 3vw, 1.5rem)',
            }}
          >
            A centralized solution for managing all your employee data efficiently and effectively.
          </Typography>

          <Button
            id="landing-btn-dashboard"
            component={Link}
            to="/dashboard"
            variant="contained"
            sx={{
              backgroundColor: '#ff9800',
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#e68900' },
            }}
          >
            Go to Dashboard
          </Button>
        </Box>

        {/* ================== FEATURE CARDS ================== */}
        <Grid container spacing={4} sx={{ marginTop: '2rem' }}>

          {/* Manage Employees */}
          <Grid item xs={12} md={4}>
            <Card id="landing-card-employees" sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography id="landing-card-title-employees" variant="h5" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
                  Manage Employees
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  Easily manage your employee records, track details, and maintain an up-to-date roster.
                </Typography>

                <Button
                  id="landing-btn-view-employees"
                  component={Link}
                  to="/employees"
                  variant="contained"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333f91' },
                  }}
                >
                  View Employees
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Track Departments */}
          <Grid item xs={12} md={4}>
            <Card id="landing-card-departments" sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography id="landing-card-title-departments" variant="h5" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
                  Track Departments
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  Organize your company’s structure with detailed information on each department.
                </Typography>

                <Button
                  id="landing-btn-view-departments"
                  component={Link}
                  to="/departments"
                  variant="contained"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333f91' },
                  }}
                >
                  View Departments
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Analyze Growth */}
          <Grid item xs={12} md={4}>
            <Card id="landing-card-growth" sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography id="landing-card-title-growth" variant="h5" sx={{ fontWeight: 600, marginBottom: '1rem', color: '#3f51b5' }}>
                  Analyze Growth
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  Use our comprehensive dashboard to analyze employee growth and organizational structure.
                </Typography>

                <Button
                  id="landing-btn-growth-dashboard"
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333f91' },
                  }}
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* ================== WHY CHOOSE SECTION ================== */}
        <Box
          id="landing-why-choose"
          sx={{
            ...animationStyle,
            marginTop: '4rem',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography id="landing-why-choose-title" variant="h5" sx={{ marginBottom: '1rem', fontWeight: 600, color: '#3f51b5' }}>
            Why Choose Our System?
          </Typography>
          <Typography id="landing-why-choose-text" variant="body1" sx={{ maxWidth: '800px', margin: '0 auto' }}>
            Our Employee Management System is designed to simplify HR processes, streamline department management,
            and provide valuable insights into your workforce.
          </Typography>
        </Box>

        {/* ================== LEARN MORE SECTION ================== */}
        <Box
          id="landing-learn-more"
          sx={{
            ...animationStyle,
            marginTop: '4rem',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography id="landing-learn-more-title" variant="h5" sx={{ marginBottom: '1rem', fontWeight: 600, color: '#3f51b5' }}>
            Learn More
          </Typography>
          <Typography id="landing-learn-more-text" variant="body1" sx={{ maxWidth: '800px', margin: '0 auto' }}>
            Visit our documentation to learn more about the features, functionalities, and how to get started.
          </Typography>

          <Button
            id="landing-btn-docs"
            href="https://github.com/hoangsonww/Employee-Management-Fullstack-App"
            target="_blank"
            variant="contained"
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              marginTop: '1rem',
              '&:hover': { backgroundColor: '#333f91' },
            }}
          >
            Documentation
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
