# Feature: Employee APIs

#   Background:
#     * def port = Java.type('java.lang.System').getProperty('karate.server.port')
#     * def baseUrl = 'http://localhost:' + port
#     * url baseUrl + '/api/employees'
#     * def ts = java.lang.System.currentTimeMillis()
#     * def employee = { firstName: 'Test', lastName: 'User', email: 'test_' + ts + '@example.com', department: 'QA', age: 30 }

#   Scenario: Create, read, update and delete employee
#     Given request employee
#     When method POST
#     Then status 201
#     And match response.id != null
#     * def id = response.id

#     # get all
#     Given url baseUrl + '/api/employees'
#     When method GET
#     Then status 200
#     And match response == '#[]' || response[0].id != null

#     # get by id
#     Given url baseUrl + '/api/employees/' + id
#     When method GET
#     Then status 200
#     And match response.id == id

#     # update
#     * def updated = employee
#     * set updated.firstName = 'Updated'
#     Given url baseUrl + '/api/employees/' + id
#     And request updated
#     When method PUT
#     Then status 200
#     And match response.firstName == 'Updated'

#     # delete
#     Given url baseUrl + '/api/employees/' + id
#     When method DELETE
#     Then status 204

#     # confirm deleted
#     Given url baseUrl + '/api/employees/' + id
#     When method GET
#     Then status 404
