Feature: Load Profile page

  Scenario: TC11 - Login and load Profile page
    # --- LOGIN ---
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor('#login-title')

    When input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')
    And click('#login-submit-btn')

    # --- VERIFY DASHBOARD LOADED ---
    Then retry(40, 500).waitFor('#dashboard-title')
    And match text('#dashboard-title') contains 'Overview Dashboard'

    # --- NAVIGATE TO PROFILE ---
    When driver 'http://localhost:3000/profile'
    And retry(40, 500).waitFor('#profile-title')

    # --- VERIFY PROFILE CONTENT ---
    Then match text('#profile-title') contains 'Welcome'
    And match text('#profile-username') contains 'Username:'
