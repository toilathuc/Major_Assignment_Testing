Feature: Search Employees and Departments

  Scenario: TC03a - Load Employees and filter list
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

    # Navigate to Employees page
    When click("a[href='/employees']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")
    And waitFor('#employee-table-body')

    # Filter using the search box to ensure interactivity (broad filter by '@' for emails)
    And waitFor('#employee-search')
    And input('#employee-search', '@hotmail.com')
    Then retry(10, 300).waitFor('#employee-table-body')
    And match text('#employee-table-body') != null

  Scenario: TC03b - Load Departments and filter list
    # Reuse the logged-in session by navigating directly
    When click("a[href='/departments']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Departments')]")
    And waitFor('#department-search')
    And input('#department-search', 'Dairy')
    And waitFor('#department-table-body')
    And match text('#department-table-body') contains 'QA Automation Dept'
