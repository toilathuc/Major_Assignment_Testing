Feature: Edit Department

  Scenario: TC08 - Edit first department name and save
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

    # Capture first department name and open its Edit page
    * def firstName = script("var c=document.querySelector('tbody tr td'); c? c.textContent.trim(): ''")
    When click("(//tbody//tr)[1]//a[starts-with(@href, '/edit-department')]")

    # Edit and save
    And retry(40, 500).waitFor("//h2[contains(text(), 'Edit Department')]")
    And waitFor("[name='name']")
    * def newName = firstName + ' Updated'
    Then input("[name='name']", newName)
    When click("button[type='submit']")

    # Verify back to list and updated name present
    Then waitForUrl('http://localhost:3000/departments')
    And retry(40, 500).waitFor("//h2[contains(text(), 'Departments')]")
    And waitFor('tbody')
    And match text('tbody') contains newName
