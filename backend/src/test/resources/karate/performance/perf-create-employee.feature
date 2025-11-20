Feature: Performance - create employee

  Background:
    * def baseUrl = 'http://localhost:8080'
    * def ts = java.lang.System.currentTimeMillis()
    * def email = 'load_' + ts + '@example.com'

  Scenario: Create employee
    Given url baseUrl + '/api/departments'
    When method GET
    Then status 200
    * def deptId = response[0].id
    * def emp =
        """
        {
          firstName: 'Perf',
          lastName: 'Test',
          email: '#(email)',
          age: 18,
          department: {
            id: #(deptId)
          }
        }
        """
    Given url baseUrl + '/api/employees'
    And request emp
    When method POST
    Then status 201
