Feature: Add Department

  Scenario: TC07 - Add a new Department and verify in list
    * def deptName = 'QA Automation Dept'

    # Login
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

    # Navigate to Departments
    When click("a[href='/departments']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Departments')]")

    # Open Add Department form
    And retry(20, 300).waitFor("a[href='/add-department']")
    When click("a[href='/add-department']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Add Department')]")

    # Fill and submit
    And waitFor("[name='name']")
    Then input("[name='name']", deptName)
    When click("button[type='submit']")

    # Verify redirected and department appears
    Then waitForUrl('http://localhost:3000/departments')
    And retry(40, 500).waitFor("//h2[contains(text(), 'Departments')]")
    And waitFor('tbody')
    And match text('tbody') contains deptName
