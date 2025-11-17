 Feature: Register page

  Scenario: TC00 - Register a new account and redirect to Login
    # 1) Open home
    Given driver 'http://localhost:3000'
    And retry(10, 500).waitFor("a[href='/register']")

    # 2) Go to Register
    When click("a[href='/register']")
    And waitForUrl('http://localhost:3000/register')
    And waitFor("//h2[contains(text(), 'Register')]")

    # 3) Fill inputs and submit
    And waitFor('#username')
    And waitFor('#password')
    And waitFor('#confirmPassword')
    Then input('#username', 'karate_user12')
    And input('#password', 'password123')
    And input('#confirmPassword', 'password123')
    When click('#register-submit-btn')

    # 4) Verify redirected to Login
    Then waitForUrl('http://localhost:3000/login')
    And match text('h2') contains 'Login'