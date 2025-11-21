Feature: Performance - Authentication Flow

  Background:
    * def baseUrl = 'http://localhost:8080'
    * def ts = java.lang.System.currentTimeMillis()
    * def user = 'perf_user_' + ts
    * def pass = 'Password123'

  Scenario: Register and login user
    Given url baseUrl + '/register'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    Then status 200

    Given url baseUrl + '/authenticate'
    And request { username: '#(user)', password: '#(pass)' }
    When method POST
    Then status 200
