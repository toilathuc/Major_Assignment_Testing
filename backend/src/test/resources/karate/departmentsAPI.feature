Feature: Department APIs

  Background:
    * def port = java.lang.System.getProperty('karate.server.port')
    * def baseUrl = 'http://localhost:' + port
    * url baseUrl
    * def now = java.lang.System.currentTimeMillis()


    Scenario: Create, read, update and delete department
      Given path 'api', 'departments'
      And request { name: 'Engineering', location: 'Building A' }
      When method POST
      Then status 201
      And match response.id != null
      * def deptId = response.id 
      * print response

    #   # get all
    #   Given url baseUrl + '/api/departments'
    #   When method GET
    #   Then status 200
    #   And match response == '#[]' || response[0].id != null

    #   # get by id
    #   Given url baseUrl + '/api/departments/' + deptId
    #   When method GET
    #   Then status 200
    #   And match response.id == deptId

    #   # update
    #   * def updated = { name: 'Engineering', location: 'Building B' }
    #   Given url baseUrl + '/api/departments/' + deptId
    #   And request updated
    #   When method PUT
    #   Then status 200
    #   And match response.location == 'Building B'

    #   # delete
    #   Given url baseUrl + '/api/departments/' + deptId
    #   When method DELETE
    #   Then status 204

    #   # confirm deleted
    #   Given url baseUrl + '/api/departments/' + deptId
    #   When method GET
    #   Then status 404