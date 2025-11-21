Feature: Register page

  Scenario: TC00 - Register a new account and redirect to Login

    # 1) Open Home page (LandingPage)
    Given driver 'http://localhost:3000'
    And retry(20, 500).waitFor("a[href='/register'], #login-register-link")

    # 2) Navigate to Register
    When click("a[href='/register'], #login-register-link")
    And retry(20, 500).waitForUrl('/register')
    And waitFor('#register-title')

    # 3) Fill registration form
    And waitFor('#register-username-input')
    And waitFor('#register-password-input')
    And waitFor('#register-confirm-password-input')

    Then input('#register-username-input', 'karate_user1')
    And input('#register-password-input', 'password123')
    And input('#register-confirm-password-input', 'password123')

    # 4) Submit
    When click('#register-submit-btn')

    # 5) Redirects to Login page
    Then retry(20, 500).waitForUrl('/login')
    And waitFor('#login-title')
    And match text('#login-title') contains 'Login'
