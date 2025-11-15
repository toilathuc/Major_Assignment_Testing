Feature: Responsive tablet

  Scenario: TC15 - Navbar shows drawer on tablet width
    * configure driver = { type: 'chromedriver', addOptions: ['--window-size=800,1024'] }
    Given driver 'http://localhost:3000/'
    And retry(20, 300).waitFor('#nav-drawer-toggle')
    When click('#nav-drawer-toggle')
    And retry(20, 300).waitFor('#drawer-login')
    Then match text('#drawer-login') contains 'Login'
