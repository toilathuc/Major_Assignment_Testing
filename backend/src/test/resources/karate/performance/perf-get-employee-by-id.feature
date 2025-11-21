Feature: Performance - GET employee by ID

  Background:
    * def baseUrl = 'http://localhost:8080'

  Scenario: Get employee by ID
    Given url baseUrl + '/api/employees'
    When method GET
    Then status 200
    * def id = response[0].id

    Given url baseUrl + '/api/employees/' + id
    When method GET
    Then status 200
