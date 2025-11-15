Feature: 404 Page

  Scenario: TC22 - Invalid URL shows 404 and Back to Home works
    Given driver 'http://localhost:3000/abcxyz'
    And retry(20, 300).waitFor('#notfound-title')
    Then match text('#notfound-title') contains '404'
    When click('#notfound-back-home')
    Then waitForUrl('http://localhost:3000/')
