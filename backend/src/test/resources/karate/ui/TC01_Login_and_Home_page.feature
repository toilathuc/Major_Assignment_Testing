Feature: Login page

  Scenario: TC01 - Login and land on Dashboard

    # 1) Open Login page directly
    Given driver 'http://localhost:3000/login'

    # 2) Wait for Login page to load
    And retry(20, 500).waitFor('#login-title')

    # 3) Fill username & password
    And waitFor('#login-username-input')
    And waitFor('#login-password-input')

    Then input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')

    # 4) Click Login button
    When click('#login-submit-btn')

    # 5) Wait for redirect → Dashboard
    And retry(40, 500).waitFor('#dashboard-title')
    And match text('#dashboard-title') contains 'Overview Dashboard'
