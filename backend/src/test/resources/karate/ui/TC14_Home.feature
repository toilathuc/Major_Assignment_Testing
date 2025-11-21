Feature: Home feature buttons

  Scenario: TC14 - Landing page buttons navigate correctly
    Given driver 'http://localhost:3000/'

    # --- Test Employees button ---
    When click("a[href='/employees']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Employees')]")

    # Back to Home
    When driver 'http://localhost:3000/'

    # --- Test Departments button ---
    When click("a[href='/departments']")
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Departments')]")

    # Back to Home
    When driver 'http://localhost:3000/'




