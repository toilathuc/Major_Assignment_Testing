Feature: Load Profile page

  Scenario: TC11 - Login and load Profile page
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor("//h1[contains(text(), 'Overview Dashboard')]")

    # Navigate to Profile
    When driver 'http://localhost:3000/profile'
    And retry(40, 500).waitFor('#profile-title')
    Then match text('#profile-title') contains 'Welcome,'
    And match text('#profile-username') contains 'Username:'
