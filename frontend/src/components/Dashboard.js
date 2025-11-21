import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getAllEmployees } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Card, CardContent, Grid, Typography, Box, CircularProgress } from '@mui/material';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [employeeGrowth, setEmployeeGrowth] = useState([]);
  const [ageRangeData, setAgeRangeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [genderData] = useState({ male: 175, female: 120 });
  const [jobSatisfactionData] = useState({ satisfied: 215, neutral: 50, dissatisfied: 30 });
  const [remoteWorkData] = useState({ onsite: 145, remote: 70, hybrid: 80 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const employees = await getAllEmployees();
      const departments = await getAllDepartments();

      setEmployeeCount(employees.length);
      setDepartmentCount(departments.length);

      const totalAge = employees.reduce((sum, emp) => sum + emp.age, 0);
      const avgAge = employees.length ? totalAge / employees.length : 0;
      setAverageAge(avgAge.toFixed(1));

      const ageRanges = {
        '20-29': 0,
        '30-39': 0,
        '40-49': 0,
        '50-59': 0,
        '60+': 0,
      };

      employees.forEach(emp => {
        if (emp.age >= 20 && emp.age <= 29) ageRanges['20-29']++;
        else if (emp.age >= 30 && emp.age <= 39) ageRanges['30-39']++;
        else if (emp.age >= 40 && emp.age <= 49) ageRanges['40-49']++;
        else if (emp.age >= 50 && emp.age <= 59) ageRanges['50-59']++;
        else if (emp.age >= 60) ageRanges['60+']++;
      });

      setAgeRangeData(ageRanges);

      setEmployeeGrowth([
        { month: 'January', count: 50 },
        { month: 'February', count: 70 },
        { month: 'March', count: 100 },
        { month: 'April', count: 130 },
        { month: 'May', count: 160 },
        { month: 'June', count: 200 },
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);

  const animationStyle = {
    animation: 'dropDown 0.8s ease forwards',
    opacity: 0,
    '@keyframes dropDown': {
      '0%': { transform: 'translateY(-20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  };

  const totalOverviewData = {
    labels: ['Employees', 'Departments'],
    datasets: [
      {
        label: 'Total Count',
        data: [employeeCount, departmentCount],
        backgroundColor: ['#3f51b5', '#ff9800'],
      },
    ],
  };

  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [genderData.male, genderData.female],
        backgroundColor: ['#42A5F5', '#FF7043'],
      },
    ],
  };

  const jobSatisfactionChartData = {
    labels: ['Satisfied', 'Neutral', 'Dissatisfied'],
    datasets: [
      {
        label: 'Job Satisfaction Levels',
        data: [jobSatisfactionData.satisfied, jobSatisfactionData.neutral, jobSatisfactionData.dissatisfied],
        backgroundColor: ['#81C784', '#FFEB3B', '#FF7043'],
      },
    ],
  };

  const remoteWorkChartData = {
    labels: ['Onsite', 'Remote', 'Hybrid'],
    datasets: [
      {
        label: 'Remote Work Preference',
        data: [remoteWorkData.onsite, remoteWorkData.remote, remoteWorkData.hybrid],
        backgroundColor: ['#4FC3F7', '#FFB74D', '#9575CD'],
      },
    ],
  };

  const ageRangeChartData = {
    labels: Object.keys(ageRangeData),
    datasets: [
      {
        label: 'Employees per Age Range',
        data: Object.values(ageRangeData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const employeeGrowthData = employeeGrowth.length
    ? {
        labels: employeeGrowth.map(d => d.month),
        datasets: [
          {
            label: 'Employee Growth Over Time',
            data: employeeGrowth.map(d => d.count),
            backgroundColor: '#36A2EB',
          },
        ],
      }
    : null;

  const lineChartData = employeeGrowth.length
    ? {
        labels: employeeGrowth.map(d => d.month),
        datasets: [
          {
            label: 'Employee Growth Trend',
            data: employeeGrowth.map(d => d.count),
            borderColor: '#FF6384',
          },
        ],
      }
    : null;

  const pieChartData = {
    labels: Object.keys(ageRangeData),
    datasets: [
      {
        label: 'Age Range Distribution',
        data: Object.values(ageRangeData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  if (loading) {
    return (
      <Box
        id="dashboard-loading-overlay"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex: 1000,
        }}
      >
        <CircularProgress id="dashboard-loading-spinner" />
      </Box>
    );
  }

  return (
    <Box id="dashboard-container" sx={{ marginTop: '2rem' }}>
      <Typography id="dashboard-title" variant="h4" textAlign="center" sx={{ marginBottom: '2rem', fontWeight: 600 }}>
        Overview Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card id="card-total-employees" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Total Employees</Typography>
              <Typography id="value-total-employees" variant="h4">{employeeCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="card-average-age" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Average Age</Typography>
              <Typography id="value-average-age" variant="h4">{averageAge}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="card-total-departments" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Total Departments</Typography>
              <Typography id="value-total-departments" variant="h4">{departmentCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-total-overview" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Total Overview</Typography>
              <Bar data={totalOverviewData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-age-range" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Employee Count by Age Range</Typography>
              <Bar data={ageRangeChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-growth" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Employee Growth Over Time</Typography>
              {employeeGrowthData ? <Bar data={employeeGrowthData} /> : <Typography>No data</Typography>}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-average-age" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Average Age of Employees</Typography>
              <Bar data={ageRangeChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-age-distribution" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Age Range Distribution</Typography>
              <Pie data={pieChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-growth-trend" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Employee Growth Trend</Typography>
              {lineChartData ? <Line data={lineChartData} /> : <Typography>No data</Typography>}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-gender" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Gender Distribution</Typography>
              <Bar data={genderChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-satisfaction" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Job Satisfaction Levels</Typography>
              <Pie data={jobSatisfactionChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card id="chart-remote-work" sx={{ ...animationStyle, boxShadow: 3 }}>
            <CardContent>
              <Typography>Remote Work Preference</Typography>
              <Pie data={remoteWorkChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
