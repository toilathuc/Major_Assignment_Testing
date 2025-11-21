Feature: Auth Tests

  Background:
    * def port = Java.type('java.lang.System').getProperty('karate.server.port')
    * def baseUrl = 'http://localhost:' + port
    * def now = java.lang.System.currentTimeMillis()
    * url baseUrl
    * def user = 'test_' + java.lang.System.currentTimeMillis()
    * def pass = 'Test@123'
    


  Scenario: Register user
    Given path 'register'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    Then status 200

  Scenario: Register existed user
    Given path 'register'
    And request {username: '#(user)', password: '#(pass)' } 
    When method POST
    Then status 200
    
    Given path 'register'
    And request {username: '#(user)', password: '#(pass)' } 
    When method POST
    Then status 409
    * print response
    And match response contains 'Username already exists'



  Scenario: Login user
    Given path 'register'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    Then status 200
    
    Given path 'authenticate'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    Then status 200
    And match response.token != null

  Scenario: Login fails
    Given path 'register'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    Then status 200
    
    Given path 'authenticate'
    And request { username: '#(user)', password: 'Wrong' }
    When method POST
    Then status 401

  Scenario: register again after registration
    Given path 'register'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    Then status 200

    Given path 'register'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    * print response
    Then status 409
    And match response contains 'Username already exists'

  Scenario: verify username exists -> 200
  Given path 'register'
  And request { username: '#(user)', password: '#(pass)' }
  When method POST
  Then status 200

  Given path 'verify-username', user
  When method GET
  Then status 200
  And match response contains 'Username exists'

Scenario: verify username not found
  Given path 'verify-username', 'no_such_user_' + now
  When method GET
  Then status 404
  And match response contains 'Username not found'
Scenario: reset password successfully
  Given path 'register'
  And request { username: '#(user)', password: '#(pass)' }
  When method POST
  Then status 200

  Given path 'reset-password'
  And request { username: '#(user)', newPassword: 'New@123' }
  When method POST
  Then status 200
  And match response contains 'Password reset successfully'

 
  Given path 'authenticate'
  And request { username: '#(user)', password: 'New@123' }
  When method POST
  Then status 200
  And match response.token != null
  And match response.token == "#regex ^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_.+/=]*$"

Scenario: reset password user not found
  Given path 'reset-password'
  And request { username: '#("no_such_user_" + now)', newPassword: 'Whatever@1' }
  When method POST
  Then status 404
  And match response contains 'Username not found'


    


  # Scenario: Register user returns 500 when server error occurs
  #   Given path 'register'
  #   And request { username: 'error_user', password: 'Test@123' }
  #   When method POST
  #   Then status 500
  #   And match response.message == 'Unable to register user'
  #   * print 'Response when error occurs:', response
  

      # value = {
      #     @ApiResponse(responseCode = "200", description = "User registered successfully"),
      #     @ApiResponse(responseCode = "409", description = "Username already exists"),
      #     @ApiResponse(responseCode = "500", description = "Unable to register user")
      # })
