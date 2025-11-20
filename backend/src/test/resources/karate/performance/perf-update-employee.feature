Feature: Performance - update employee

  Background:
    * def baseUrl = 'http://localhost:8080'
    * def ts = java.lang.System.currentTimeMillis()
    * def email = 'load_' + ts + '@example.com'

  Scenario: Update employee
    Given url baseUrl + '/api/employees'
    When method GET
    Then status 200
    * def id = response[0].id
    Given url baseUrl + '/api/departments'
    When method GET
    Then status 200
    * def depId = response[0].id
    * def updated =
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
    Given url baseUrl + '/api/employees/' + id
    And request updated
    When method PUT
    Then status 200

