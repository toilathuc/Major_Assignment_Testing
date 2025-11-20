Feature: Home Redirect

  Background:
    * def port = java.lang.System.getProperty('karate.server.port')
    * def baseUrl = 'http://localhost:' + port
    * url baseUrl
    * configure followRedirects = false

  Scenario: Root path redirects to Swagger UI
    Given path ''
    When method GET
    Then status 302
    And match header Location == baseUrl + '/swagger-ui.html'

