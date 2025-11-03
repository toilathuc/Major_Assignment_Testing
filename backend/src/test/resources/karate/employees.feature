Feature: Employee APIs

  Background:
    * def port = Java.type('java.lang.System').getProperty('karate.server.port')
    * def baseUrl = 'http://localhost:' + port
    * url baseUrl + '/api/employees'
    * def ts = java.lang.System.currentTimeMillis()
    * def email = 'john.doe_' + ts + '@example.com'
    * def employee = { firstName: 'John', lastName: 'Doe', email: email, age: 28 }
Scenario: Check exits of any employee
    Given url baseUrl + '/api/employees/'
    When method GET
    Then status 200
    * print response
    * def emID = response[0].id
    * print emID
    
    Given url baseUrl + '/api/employees/' + emID
    When method GET
    Then status 200

Scenario: 
    Given url baseUrl + '/api/employees/999999'
    When method GET 
    Then status 404

Scenario: Update information of a specific employee
    Given url baseUrl + '/api/employees/'
    When method GET
    Then status 200
    * print response

    * def emID = response[0].id
    * print emID

    Given url baseUrl + '/api/employees/' + emID
    When method GET
    Then status 200
    * print response

  * def update = { firstName: 'Thuc', lastName: 'Le Huy', email: 'thuc@yahoo.com', age: 21 }
  Given url baseUrl + '/api/departments'
  When method GET
  Then status 200
  * eval
  """
  var depId = response[0].id;
  karate.set('depId', depId);
  update.department = { id: depId };
  """

  Given url baseUrl + '/api/employees/'+ emID
  And request update
    When method PUT
    * print response
    Then status 200

    
    # * def update = {"firstName": "Thuc", "lastName": "Le Huy "}
    # Given url baseUrl + '/api/employees/'+ emID
    # When method PUT
    # * print response
    # Then status 400




  Scenario: Create, read, update and delete employee
  Given url baseUrl + '/api/departments'
  When method GET
  Then status 200
  * eval
  """
  var depId = response[0].id;
  karate.set('depId', depId);
  employee.department = { id: depId };
  """

    Given request employee
  When method POST
  * print response
  Then status 201
    And match response.id != null
    * def id = response.id

    # get all
    Given url baseUrl + '/api/employees'
    When method GET
    Then status 200
    And match response == '#[]' || response[0].id != null

    # get by id
    Given url baseUrl + '/api/employees/' + id
    When method GET
    Then status 200
    And match response.id == id

    # update
    * def updated = employee
    * set updated.firstName = 'Updated'
    Given url baseUrl + '/api/employees/' + id
    And request updated
    When method PUT
    Then status 200
    And match response.firstName == 'Updated'

    # delete
    Given url baseUrl + '/api/employees/' + id
    When method DELETE
    Then status 204

    # confirm deleted
    Given url baseUrl + '/api/employees/' + id
    When method GET
    Then status 404

