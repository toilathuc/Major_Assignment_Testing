Feature: 404 Page

  Scenario: TC13 - Invalid URL shows 404 and Back to Home works
    Given driver 'http://localhost:3000/abcxyz'

    # Wait for 404 title to render
    And retry(20, 300).waitFor('#notfound-title')
    Then match text('#notfound-title') contains '404'

    # Click the Go Home button
    When click('#notfound-go-home-btn')

    # Verify redirect to Home
    Then waitForUrl('http://localhost:3000/')
