Feature: Delete Department

Scenario: TC09 - Delete first department from the list
  Given driver 'http://localhost:3000/login'
  And retry(40, 500).waitFor('#login-title')

  And waitFor('#login-username-input')
  And waitFor('#login-password-input')
  Then input('#login-username-input', 'karate_user1')
  And input('#login-password-input', 'password123')

  When click('#login-submit-btn')
  And retry(40, 500).waitFor('#dashboard-title')

  # --- Navigate to Departments ---
  When click("a[href='/departments']")
  Then retry(40, 500).waitFor('#department-list-title')
  And waitFor('#department-table-body')

  # --- GET FIRST DEPARTMENT ID ---
  * def firstDeptId = script("document.querySelector('#department-table-body tr').id.replace('department-row-','')")
  * print 'First Dept ID:', firstDeptId

  # --- COUNT BEFORE DELETE ---
  * def before = script("document.querySelectorAll('#department-table-body tr').length")
  * print 'Before:', before

  # --- CLICK DELETE BUTTON ---
  When click('#department-delete-btn-' + firstDeptId)

