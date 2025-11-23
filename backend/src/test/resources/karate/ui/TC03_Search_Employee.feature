Feature: Search Employees

  Background:
    * call read('classpath:karate/ui/common.feature')
    # Open Login Page
    Given driver 'http://localhost:3000/login'
    And retry(30, 500).waitFor('#login-title')

    # Login
    And waitFor('#login-username-input')
    And waitFor('#login-password-input')
    And input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')
    When click('#login-submit-btn')

    # Dashboard loaded
    And retry(40, 500).waitFor('#dashboard-title')


  # --------------------------------------------------
  Scenario: TC03 - Load Employees and filter list
    # Navigate to Employees via Navbar
    When click('#navbar-employees')
    Then retry(40, 500).waitFor('#employee-list-title')

    # Search field exists, type filter keyword
    And waitFor('#employee-search-input')

    And input('#employee-search-input', '@hotmail.com')

    # Ensure table reloads
    Then retry(20, 300).waitFor('#employee-table-body')
    And match text('#employee-table-body') != null


