Feature: Add Employee

  Scenario: TC04 - Login and add a new employee

    # --- PART 1: LOGIN ---
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor('#login-title')

    # Wait for username + password input
    And waitFor('#login-username-input')
    And waitFor('#login-password-input')

    # Fill credentials
    Then input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')

    # Click Login button
    When click('#login-submit-btn')

    # Wait for Dashboard page
    And retry(40, 500).waitFor('#dashboard-title')

    # --- PART 2: OPEN EMPLOYEES PAGE ---
    When click("#navbar-employees")
    And retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")

    # Click Add Employee button
    And waitFor('#employee-add-btn')
    When click('#employee-add-btn')

    # Wait for form
    And retry(40, 500).waitFor('#employee-form-title')

    # --- PART 3: FILL EMPLOYEE FORM ---
    And waitFor('#employee-firstname-input')
    And input('#employee-firstname-input', 'Test123')

    And waitFor('#employee-lastname-input')
    And input('#employee-lastname-input', 'Karate')

    And waitFor('#employee-email-input')
    And input('#employee-email-input', 'test.karate@example.com')

    And waitFor('#employee-age-input')
    And input('#employee-age-input', '30')

    # --- SELECT DEPARTMENT ---
    And waitFor('#employee-department-select')
    When click('#employee-department-select')

    # Wait for list item (Entertainment)
    And retry(20, 300).waitFor("//li[contains(text(),'Entertainment')]")

    # Select Entertainment
    And click("//li[contains(text(),'Entertainment')]")

    # --- SAVE EMPLOYEE ---
    When click('#employee-save-btn')

    # --- PART 4: VERIFY EMPLOYEE CREATED ---
    Then waitForUrl('http://localhost:3000/employees')
    And retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")

    # Search for the new employee
    And waitFor('#employee-search-input')
    And input('#employee-search-input', 'test.karate@example.com')

    And waitFor('#employee-table-body')
    Then match text('#employee-table-body') contains 'test.karate@example.com'
