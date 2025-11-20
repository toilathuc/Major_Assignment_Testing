Feature: Register page

  Scenario: TC00 - Register new user
    # Step 1: Open home and navigate to register
    Given driver frontendUrl
    And delay(2000)
    When click("a[href='/register']")
    And delay(2000)
    
    # Step 2: Wait for form to appear
    And waitFor('#username')
    * print 'Form loaded!'
    
    # Step 3: Fill form with simple data
    * def username = 'test_' + java.lang.System.currentTimeMillis()
    And input('#username', username)
    And delay(500)
    And input('#password', 'password123')
    And delay(500)
    And input('#confirmPassword', 'password123')
    And delay(500)
    * screenshot()
    
    # Step 4: Click submit button
    When click('#register-submit-btn')
    And delay(2000)
    
    # Step 5: Check if redirected to login
    * print 'Final URL:', driver.url
    * screenshot()