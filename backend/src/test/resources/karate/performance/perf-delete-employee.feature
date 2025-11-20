Feature: Performance - delete employee

  Background:
    * def baseUrl = 'http://localhost:8080'

  Scenario: Delete employee
    Given url baseUrl + '/api/employees'
    When method GET
    Then status 200
    * def id = response[0].id

    Given url baseUrl + '/api/employees/' + id
    When method DELETE
    Then status 204
