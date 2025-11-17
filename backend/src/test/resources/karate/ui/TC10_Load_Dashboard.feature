Feature: Load Dashboard

  Scenario: TC10 - Load Dashboard and verify key widgets
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor("h2:contains('Login')")
    When input('#username', 'karate_user1')
    And input('#password', 'password123')
    And click('#login-submit-btn')
    Then retry(40, 500).waitFor('#dashboard-title')
    And match text('#dashboard-title') contains 'Overview Dashboard'
    And match text('#metric-total-employees') != ''
    And match text('#metric-total-departments') != ''
    And waitFor('#chart-total-overview')
    And waitFor('#chart-age-range')
