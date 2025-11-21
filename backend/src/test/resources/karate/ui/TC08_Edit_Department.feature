Feature: Edit Department

Scenario: TC08 - Edit first department and save

  # --- LOGIN ---
  Given driver 'http://localhost:3000/login'
  And retry(40, 500).waitFor('#login-title')

  And input('#login-username-input', 'karate_user1')
  And input('#login-password-input', 'password123')
  When click('#login-submit-btn')
  And retry(40, 500).waitFor('#dashboard-title')

  # --- OPEN DEPARTMENTS ---
  When click('#navbar-departments')
  And retry(40, 500).waitFor('#department-list-title')
  And waitFor('#department-table-body')

  # --- GET FIRST DEPARTMENT ID ---
  * def depId = script("document.querySelector('#department-table-body tr').id.replace('department-row-','')")

  # --- OPEN EDIT PAGE ---
  When click('#department-edit-btn-' + depId)
  And retry(40, 500).waitFor('#department-form-title')
  And waitFor('#department-name-input')

  # --- UPDATE NAME ---
  * def original = script("document.querySelector('#department-name-input').value")
  * def newName = original + ' Updated'

  * clear('#department-name-input')
  Then input('#department-name-input', newName)

  # --- SAVE ---
  When click('#department-save-btn')

  # --- VERIFY REDIRECT ---
  Then retry(40, 500).waitForUrl('http://localhost:3000/departments')
  And retry(40, 500).waitFor('#department-list-title')

  # --- VERIFY UPDATED NAME EXISTS ---
  And waitFor('#department-table-body')
  Then match text('#department-table-body') contains newName
