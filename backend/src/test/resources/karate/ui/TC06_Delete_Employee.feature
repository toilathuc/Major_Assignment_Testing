Feature: Delete Employee

  Scenario: TC06 - Delete first employee from the list

    # --- LOGIN ---
    Given driver 'http://localhost:3000/login'
    And retry(20, 500).waitFor('#login-title')

    And waitFor('#login-username-input')
    And waitFor('#login-password-input')

    Then input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')

    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

    # --- OPEN EMPLOYEE LIST ---
    When click("a[href='/employees']")
    Then retry(40, 500).waitFor('#employee-list-title')
    And waitFor('#employee-table-body')

    # --- GET FIRST EMPLOYEE ID ---
    * def firstId = script("document.querySelector('#employee-table-body tr').id.replace('employee-row-','')")
    * print 'First ID:', firstId

    # --- CAPTURE ROW COUNT BEFORE DELETE ---
    * def before = script("document.querySelectorAll('#employee-table-body tr').length")
    * print 'Before:', before

    # --- CLICK DELETE BUTTON ---
    When click('#employee-delete-btn-' + firstId)


