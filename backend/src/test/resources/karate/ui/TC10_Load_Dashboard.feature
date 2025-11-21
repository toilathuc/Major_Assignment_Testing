Feature: Load Dashboard

  Scenario: TC10 - Load Dashboard and verify key widgets

    # --- LOGIN ---
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor('#login-title')

    When input('#login-username-input', 'karate_user1')
    And input('#login-password-input', 'password123')
    And click('#login-submit-btn')

    # --- WAIT FOR DASHBOARD ---
    Then retry(40, 500).waitFor('#dashboard-title')
    And match text('#dashboard-title') contains 'Overview Dashboard'

    # --- VERIFY METRICS ---
    And waitFor('#value-total-employees')
    And waitFor('#value-total-departments')

    And match text('#value-total-employees') != ''
    And match text('#value-total-departments') != ''

    # --- VERIFY CHARTS RENDER ---
    And waitFor('#chart-total-overview')
    And waitFor('#chart-age-range')
