Feature: Add Department

  Scenario: TC07 - Add a new Department and verify in list

    * def deptName = 'Dept ' + java.util.UUID.randomUUID().toString().substring(0, 6)

    # LOGIN
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor('#login-title')
    And input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

    # GO TO DEPARTMENTS
    When click('#navbar-departments')
    Then retry(40, 500).waitFor('#department-list-title')

    # ADD NEW DEPT
    When click("a[href='/add-department']")
    And retry(40, 500).waitFor('#department-form-title')
    And input('#department-name-input', deptName)
    When click('#department-save-btn')


