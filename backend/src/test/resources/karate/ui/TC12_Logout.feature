Feature: Logout

  Scenario: TC21 - Logout redirects to login and back does not return to dashboard
    Given driver 'http://localhost:3000/login'
    And retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')
    When click('#login-submit-btn')
    And retry(40, 500).waitFor('#dashboard-title')

    # Click logout from navbar
    When click('#nav-logout-btn')
    Then retry(40, 500).waitFor("//h2[contains(text(), 'Login')]")

    # Press back and ensure we remain on login (guard active)
    * def goBack = function(){ window.history.back() }
    * eval goBack()
    Then retry(20, 300).waitFor("//h2[contains(text(), 'Login')]")
