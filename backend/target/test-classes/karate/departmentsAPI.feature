Feature: Department APIs

  Background:
    * def port = java.lang.System.getProperty('karate.server.port')
    * def baseUrl = 'http://localhost:' + port
    * url baseUrl
    * def now = java.lang.System.currentTimeMillis()
    

Scenario: Create a new department successfully
  Given url baseUrl + '/api/departments'
  And request { name: 'Engineering' }
  When method POST
  Then status 201
  And match response.id == '#number'
  And match response.name == 'Engineering'
  * print response
 And match response.employees == '##[]'
  * def deptId = response.id
  * print 'Created department id =', deptId

Scenario: Create a new department successfully
  Given url baseUrl + '/api/departments'
  And request { name: 'Engineering' }
  When method POST
  Then status 201
  And match response.id == '#number'
  And match response.name == 'Engineering'
  * print response
* assert response.employees == null || response.employees.length == 0
  * def deptId = response.id
  * print 'Created department id =', deptId


Scenario: Create, read, update and delete department
      Given path 'api', 'departments'
    And request { name: 'Engineering' }
      When method POST
      Then status 201
      And match response.id != null
      * def deptId = response.id
      * print response


    #   # get all
      Given url baseUrl + '/api/departments'
      When method GET
      Then status 200
      And match response == '#[]' || response[0].id != null

      # get by id
      Given url baseUrl + '/api/departments/' + deptId
      When method GET
      Then status 200
      * print response
      And match response.id == deptId

      # update
      * def updated = { name: 'Engineering', location: 'Building B' }
      Given url baseUrl + '/api/departments/' + deptId
      And request updated
      When method PUT
      Then status 200
      * print response
      And match response.id == deptId 

      # delete
      Given url baseUrl + '/api/departments/' + deptId
      When method DELETE
      Then status 204

      # confirm deleted
      Given url baseUrl + '/api/departments/' + deptId
      When method GET
      Then status 404


Scenario: Check ID non exists
  Given url baseUrl + '/api/departments/99999'
  When method GET
  Then status 404
  * print response

Scenario: Update non-existent department returns 404
  * def missingId = now + 9999
  Given url baseUrl + '/api/departments/' + missingId
  And request { name: 'Ghost Department' }
  When method PUT
  Then status 404
  * print response

Scenario: Delete non-existent department returns 404
  * def missingId = now + 8888
  Given url baseUrl + '/api/departments/' + missingId
  When method DELETE
  Then status 404
  * print response

