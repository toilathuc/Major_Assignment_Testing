Feature: Home feature buttons

  Scenario: TC17 - Landing page buttons navigate correctly
    Given driver 'http://localhost:3000/'

    # View Employees button
    When click("a[href='/employees']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")

    # Back to Home
    When driver 'http://localhost:3000/'

    # View Departments button
    When click("a[href='/departments']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Departments')]")

    # Back to Home
    When driver 'http://localhost:3000/'

    # Go to Dashboard button (should redirect to login if not authenticated)
    When click("a[href='/dashboard']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
