Feature: Login page
  Scenario: TC01 - Login with existing user

  # Step 1: Navigate to login page
    Given driver frontendUrl
    And delay(2000)
    When click("a[href='/login']")
    And delay(3000)
    * print 'After click login URL:', driver.url
    * print 'Page title:', driver.title
    * screenshot()
    
  # Step 2: Wait for login form with retry
    And retry(30, 500).waitFor('#username')
    * print 'Login form loaded!'
    
  # Step 3: Fill login credentials (use fake data user)
    And input('#username', 'karate_user1')
    And delay(500)
    And input('#password', 'password123')
    And delay(500)
    * screenshot()
    
  # Step 4: Submit login form
    When click('#login-submit-btn')
    And delay(3000)
    
  # Step 5: Verify redirect to dashboard
    * print 'After login URL:', driver.url
    And waitFor('#dashboard-title')
    * print 'Dashboard loaded!'
    * screenshot()