Feature: Add Employee
  Scenario: TC04 - Login and add a new employee

  # --- PART 1: LOGIN ---
    Given driver 'http://localhost:3000/login'
    And waitFor("//h2[contains(text(), 'Login')]")
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

  # --- PART 2: ADD EMPLOYEE ---
    When click("a[href='/employees']")
    And retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")

  # 1. Click the "Add Employee" button
    And retry(20, 500).waitFor("a[href='/add-employee']")
    When click("a[href='/add-employee']")

  # 2. Wait for the Add/Edit Employee form to appear
    And retry(40, 500).waitFor("//h2[contains(text(), 'Add Employee') or contains(text(), 'Edit Employee')]")

# 3. Fill in new employee details
    And waitFor("[name='firstName']")
    And waitFor("[name='lastName']")
    And waitFor("[name='email']")
    And waitFor("[name='age']")
    Then input("[name='firstName']", 'Test')
    And input("[name='lastName']", 'Karate')
    And input("[name='email']", 'test.karate@example.com')
    And input("[name='age']", '30')

  # --- MATERIAL-UI SELECT HANDLING ---

    # 1. Open the Department select using a stable id
    And waitFor('#department')
    And click('#department')
    # 2. Wait for the options menu (<li> list) to appear
    #    Use 'Retail' as the example option
    And retry(20, 300).waitFor("//li[text()='Retail']")

    # 3. Click the 'Retail' option
    And click("//li[text()='Retail']")
  # --- END SELECT HANDLING ---

  # 4. Click the "Save" button
    When click('#employee-save-btn')

  # --- PART 3: VERIFY RESULT ---

  # 1. Wait for redirect back to Employees list
    Then waitForUrl('http://localhost:3000/employees')
    And retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")

  # 2. Filter by the new email to avoid pagination and verify
    And waitFor('#employee-search')
    And input('#employee-search', 'test.karate@example.com')
    And waitFor('#employee-table-body')
    And match text('#employee-table-body') contains 'test.karate@example.com'