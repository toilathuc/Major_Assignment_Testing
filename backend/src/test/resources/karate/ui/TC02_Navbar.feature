Feature: Navbar navigation

  Background:
    # 0) Open Login page
    * driver 'http://localhost:3000/login'
    * retry(20, 500).waitFor('#login-title')

    # 1) Login
    * waitFor('#login-username-input')
    * waitFor('#login-password-input')
    * input('#login-username-input', 'karate_user1')
    * input('#login-password-input', 'password123')
    * click('#login-submit-btn')

    # 2) Verify dashboard
    * retry(40, 500).waitFor('#dashboard-title')
    * match text('#dashboard-title') contains 'Overview Dashboard'

  # -----------------------------------------------------
  Scenario: TC02a - Navigate to Employees page
    When click('#navbar-employees')
    Then retry(20, 500).waitFor('#employee-list-title')

  # -----------------------------------------------------
  Scenario: TC02b - Navigate to Departments page
    When click('#navbar-departments')
    Then retry(20, 500).waitFor('#department-list-title')

  # -----------------------------------------------------
  Scenario: TC02c - Navigate to Profile page
    When click('#navbar-profile')
    Then retry(20, 500).waitFor('#profile-title')

  # -----------------------------------------------------
  Scenario: TC02d - Navigate to Home page
    When click('#navbar-home')
    Then retry(20, 500).waitForUrl('/')

  # -----------------------------------------------------
  Scenario: TC02e - Navigate back to Dashboard
    When click('#navbar-dashboard')
    Then retry(20, 500).waitFor('#dashboard-title')

  # -----------------------------------------------------
  Scenario: TC02f - Logout from navbar
    When click('#navbar-logout')
    Then retry(20, 500).waitFor('#login-title')
