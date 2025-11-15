Feature: Navbar navigation

  Background:
    # Login before each scenario to ensure driver is initialized and routes are accessible
    * driver 'http://localhost:3000/login'
    * retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
    * waitFor('#username')
    * waitFor('#password')
    * input('#username', 'karate_user1')
    * input('#password', 'password123')
    * click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')
    And match text('#dashboard-title') contains 'Overview Dashboard'
  # Employees
  Scenario: TC02a - Navigate to Employees page
    When click("a[href='/employees']")
    Then retry(20, 300).waitFor("//h2[contains(text(), 'Employees')]")

  # Departments
  Scenario: TC02b - Navigate to Departments page
    When click("a[href='/departments']")
    Then retry(20, 300).waitFor("//h2[contains(text(), 'Departments')]")

    # Profile
  Scenario: TC02c - Navigate to Profile page
    When click("a[href='/profile']")
    Then retry(20, 300).waitFor('#profile-title')

    # Home (title or Home button)
  Scenario: TC02d - Navigate to Home page
    When click("a[href='/']")
    Then waitForUrl('http://localhost:3000/')
    #Dashboard
  Scenario: TC02e - Dashboard
    When click("a[href='/dashboard']")
    And retry(20, 300).waitFor('#dashboard-title')
    # Logout from navbar
  Scenario: TC02f - Logout from navbar
    When click('#nav-logout-btn')
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
