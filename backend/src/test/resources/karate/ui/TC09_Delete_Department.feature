Feature: Delete Department

  Scenario: TC09 - Delete first department from the list
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
    And waitFor('tbody')

    # Capture initial row count
    * def before = script("document.querySelectorAll('tbody tr').length")

    # Click first Delete button in the table
    When click("(//tbody//tr)[1]//button[contains(normalize-space(.), 'Delete')]")

    # Wait until row count decreases
    Then retry(40, 300).assert script("document.querySelectorAll('tbody tr').length") < before
