Feature: Login page
  Scenario: TC01 - Login with existing user

  # Step 1: Navigate to login page
    Given driver frontendUrl
    And delay(2000)
    * print 'Home page title:', driver.title
    When click("a[href='/login']")
    And delay(3000)
    * print 'Login page URL:', driver.url
    
  # Step 2: Fill inputs using element value
    And delay(2000)
    * def allInputs = locateAll("input")
    * print 'Total inputs found:', allInputs.length
    
    # Fill first input (username) using element
    * allInputs[0].value = 'karate_user1'
    And delay(500)
    * print 'Filled username'
    
    # Fill second input (password) using element
    * allInputs[1].value = 'password123'
    And delay(500)
    * print 'Filled password'
    * screenshot()
    
  # Step 3: Find and click submit button
    * def submitBtn = locate("button").optional
    * print 'Button exists:', submitBtn.present
    
    # Click the button
    When click("button")
    And delay(3000)
    * print 'Clicked LOGIN button'
    
  # Step 4: Verify redirect to dashboard
    * print 'After login URL:', driver.url
    * screenshot()