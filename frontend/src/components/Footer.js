import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      id="footer-container"
      component="footer"
      sx={{
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '2rem 0',
        marginTop: '2rem',
        boxShadow: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* About Section */}
          <Grid item xs={12} md={4} id="footer-about-section">
            <Typography id="footer-about-title" variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem' }}>
              About Us
            </Typography>
            <Typography id="footer-about-content" variant="body2">
              We provide a comprehensive Employee Management System that helps you manage your employees and departments with ease.
              Our mission is to make HR processes seamless and efficient.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4} id="footer-links-section">
            <Typography id="footer-links-title" variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem' }}>
              Quick Links
            </Typography>
            <Box id="footer-links">
              <Link id="footer-link-home" href="/" color="inherit" underline="none"
                sx={{ display: 'block', marginBottom: '0.5rem', '&:hover': { color: '#f57c00' } }}>
                Home
              </Link>

              <Link id="footer-link-dashboard" href="/dashboard" color="inherit" underline="none"
                sx={{ display: 'block', marginBottom: '0.5rem', '&:hover': { color: '#f57c00' } }}>
                Dashboard
              </Link>

              <Link id="footer-link-employees" href="/employees" color="inherit" underline="none"
                sx={{ display: 'block', marginBottom: '0.5rem', '&:hover': { color: '#f57c00' } }}>
                Employees
              </Link>

              <Link id="footer-link-departments" href="/departments" color="inherit" underline="none"
                sx={{ display: 'block', marginBottom: '0.5rem', '&:hover': { color: '#f57c00' } }}>
                Departments
              </Link>

              <Link id="footer-link-profile" href="/profile" color="inherit" underline="none"
                sx={{ display: 'block', marginBottom: '0.5rem', '&:hover': { color: '#f57c00' } }}>
                Profile
              </Link>

              <Link id="footer-link-login" href="/login" color="inherit" underline="none"
                sx={{ display: 'block', marginBottom: '0.5rem', '&:hover': { color: '#f57c00' } }}>
                Login
              </Link>

              <Link id="footer-link-register" href="/register" color="inherit" underline="none"
                sx={{ display: 'block', '&:hover': { color: '#f57c00' } }}>
                Register
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4} id="footer-contact-section">
            <Typography id="footer-contact-title" variant="h6" sx={{ fontWeight: 600, marginBottom: '1rem' }}>
              Contact Us
            </Typography>

            <Typography id="footer-contact-maintainer" variant="body2">
              Project Maintainer:{' '}
              <Link
                id="footer-contact-github"
                href="https://github.com/Minhca2k5"
                color="inherit"
                sx={{ textDecoration: 'underline', '&:hover': { color: '#f57c00' } }}
              >
                Minhca2k5
              </Link>
            </Typography>

            <Typography id="footer-contact-email" variant="body2">
              Email:{' '}
              <Link
                id="footer-contact-email-link"
                href="mailto:mastercode2k5@gmail.com"
                color="inherit"
                sx={{ textDecoration: 'underline', '&:hover': { color: '#f57c00' } }}
              >
                mastercode2k5@gmail.com
              </Link>
            </Typography>

            <Typography id="footer-contact-phone" variant="body2">
              Phone: 0979650173
            </Typography>

            <Typography id="footer-contact-address" variant="body2" sx={{ marginTop: '0.5rem' }}>
              Address: Cau Giay, Ha Noi, Viet Nam
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          id="footer-bottom"
          sx={{
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            marginTop: '2rem',
            paddingTop: '1rem',
          }}
        >
          <Typography id="footer-bottom-text" variant="body2">
            © {new Date().getFullYear()} Employee Management System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
