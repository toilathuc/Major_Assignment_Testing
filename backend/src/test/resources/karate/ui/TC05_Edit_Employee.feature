Feature: Edit Employee happy path

Scenario: TC05 - Edit first employee and save
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor('#login-title')

    # Login
    And input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

    # Navigate
    When click('#navbar-employees')
    And retry(40, 500).waitFor('#employee-list-title')
    And waitFor('#employee-table-body')

    # Get first employee ID
    * def firstId = script("document.querySelector('tbody tr').id.replace('employee-row-','')")

    # Open edit
    When click('#employee-edit-btn-' + firstId)
    And retry(40, 500).waitFor('#employee-form-title')

    # Department select - choose FIRST REAL ID
    And click('#employee-department-select')
    * def firstDepId = script("document.querySelectorAll('li[id^=employee-department-option-]')[1].id.replace('employee-department-option-', '')")
    And click('#employee-department-option-' + firstDepId)

    # Save
    When click('#employee-save-btn')

    # Verify redirect
    Then retry(40, 500).waitForUrl('http://localhost:3000/employees')
    And retry(40, 500).waitFor('#employee-list-title')
