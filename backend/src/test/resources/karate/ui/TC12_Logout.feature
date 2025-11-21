Feature: Logout

Scenario: TC12 - Logout redirects correctly

  # --- LOGIN ---
  Given driver 'http://localhost:3000/login'
  And retry(40, 500).waitFor('#login-title')

  When input('#login-username-input', 'karate_user1')
  And input('#login-password-input', 'password123')
  And click('#login-submit-btn')

  Then retry(40, 500).waitFor('#dashboard-title')

  # --- LOGOUT ---
  When click('#navbar-logout')
  Then retry(40, 500).waitFor('#login-title')

  # --- VERIFY BY RELOAD (MOST RELIABLE) ---
  * driver.reload()

  Then retry(20, 300).waitFor('#login-title')
