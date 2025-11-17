Feature: Responsive desktop

  Scenario: TC16 - Navbar shows full menu on desktop
    * configure driver = { type: 'chromedriver', addOptions: ['--window-size=1440,900'] }
    Given driver 'http://localhost:3000/'
    # Drawer toggle should not be visible on desktop
    Then retry(5, 300).assert exists('#nav-drawer-toggle') == false
    And waitFor("a[href='/dashboard']")
    And waitFor("a[href='/employees']")
    And waitFor("a[href='/departments']")
