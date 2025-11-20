Feature: Security setup (callonce)

  Background:
    * def port = Java.type('java.lang.System').getProperty('karate.server.port')
    * def baseUrl = 'http://localhost:' + port

  Scenario: setup tokens
    # create a unique user and authenticate both user and admin; exported variables will be merged into caller
    * def ts = Java.type('java.lang.System').currentTimeMillis()
    * def username = 'karate_user_' + ts
    * eval user = { username: username, password: 'Password123' }

    Given url baseUrl + '/register'
    And request user
    When method POST
    Then status 200

    Given url baseUrl + '/authenticate'
    And request user
    When method POST
    Then status 200
    * def userToken = 'Bearer ' + response.token

    # admin (seeded by TestDataSeeder for profile=test)
    * eval admin = { username: 'admin', password: 'secret' }
    Given url baseUrl + '/authenticate'
    And request admin
    When method POST
    Then status 200
    * def adminToken = 'Bearer ' + response.token


