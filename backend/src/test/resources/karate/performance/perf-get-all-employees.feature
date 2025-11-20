Feature: Performance - GET all employees

  Background:
    * def baseUrl = 'http://localhost:8080'

  Scenario: GET /api/employees
    Given url baseUrl + '/api/employees'
    When method GET
    Then status 200
