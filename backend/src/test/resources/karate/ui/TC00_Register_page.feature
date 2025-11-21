Feature: Register page

  Scenario: TC00 - Navigate to register and check form
    # Step 1: Open home page
    Given driver frontendUrl
    And delay(2000)
    * print 'Home page title:', driver.title
    
    # Step 2: Click register link
    When click("a[href='/register']")
    And delay(3000)
    * print 'Register page URL:', driver.url
    
    # Step 3: Wait for form with longer delay
    And delay(2000)
    * screenshot()
    
    # Step 4: Try to find form elements
    * def usernameExists = exists('#username')
    * print 'Username field exists:', usernameExists
    * def passwordExists = exists('#password')
    * print 'Password field exists:', passwordExists
    * def submitExists = exists('#register-submit-btn')
    * print 'Submit button exists:', submitExists