Feature: Performance - GET departments

  Background:
    * def baseUrl = 'http://localhost:8080'

  Scenario: GET /api/departments
    Given url baseUrl + '/api/departments'
    When method GET
    Then status 200
