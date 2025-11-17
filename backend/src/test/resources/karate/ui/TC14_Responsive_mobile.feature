Feature: Responsive mobile

  Scenario: TC14 - Navbar shows drawer on mobile
    * configure driver = { type: 'chromedriver', addOptions: ['--window-size=360,740'] }
    Given driver 'http://localhost:3000/'
    And retry(20, 300).waitFor('#nav-drawer-toggle')

    # Open drawer and verify Login item (logged-out state)
    When click('#nav-drawer-toggle')
    And retry(20, 300).waitFor('#drawer-login')
    Then match text('#drawer-login') contains 'Login'
