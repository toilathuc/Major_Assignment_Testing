Feature: Login page
  Scenario: TC01 - Login and land on Dashboard

  # 1) Open Login page directly
    Given driver 'http://localhost:3000/login'

  # 2) Wait for Login title to render
    And waitFor("//h2[contains(text(), 'Login')]")

  # 3) Wait for inputs and fill by ID
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')

  # 4) Click Login button
    When click('#login-submit-btn')

  # 5) Verify redirect: wait for Dashboard title
    And retry(40, 500).waitFor('#dashboard-title')
    And match text('#dashboard-title') contains 'Overview Dashboard'