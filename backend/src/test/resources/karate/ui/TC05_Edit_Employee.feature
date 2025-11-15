Feature: Edit Employee happy path

  Scenario: TC05 - Edit first employee and save
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

    # Navigate to Employees and open first Edit
    When click("a[href='/employees']")
    And retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")
    And waitFor('#employee-table-body')
    # Click first Edit link in the table
    When click("(//a[starts-with(@href, '/edit-employee')])[1]")

    # Edit fields using stable IDs and save
    And retry(40, 500).waitFor("//h2[contains(text(), 'Add Employee') or contains(text(), 'Edit Employee')]")
    And waitFor('#age')
    Then input('#age', '35')
    And waitFor('#department')
    And click('#department')
    And retry(20, 300).waitFor("//li[text()='Retail']")
    And click("//li[text()='Retail']")
    When click('#employee-save-btn')

    # Verify redirected back to Employees list
    Then waitForUrl('http://localhost:3000/employees')
    And retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")
