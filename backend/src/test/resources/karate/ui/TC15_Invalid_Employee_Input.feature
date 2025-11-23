Feature: Validate Employee input errors

Background:
  * call read('classpath:karate/ui/common.feature')

Scenario: TC15a - Add Employee with empty fields
  # Register a new user to ensure login works
  Given driver 'http://localhost:3000/register'
  And input('#register-username-input', 'karate_user_tc15')
  And input('#register-password-input', 'password123')
  And input('#register-confirm-password-input', 'password123')
  When click('#register-submit-btn')
  # Wait for potential redirect or just go to login
  And delay(1000)
  
  Given driver 'http://localhost:3000/login'
  And retry(30, 500).waitFor('#login-title')
  And input('#login-username-input', 'karate_user_tc15')
  And input('#login-password-input', 'password123')
  When click('#login-submit-btn')
  And retry(30,500).waitFor('#dashboard-title')
  When click('#navbar-employees')
  And retry(30,500).waitFor('#employee-add-btn')
  When click('#employee-add-btn')
  And retry(30,500).waitFor('#employee-form-title')
  When click('#employee-save-btn')
  Then retry(20,300).waitFor('#employee-name-error')
  And match text('#employee-name-error') contains 'Name is required'
  And match text('#employee-email-error') contains 'Email is required'
  And match text('#employee-age-error') contains 'Age is required'

Scenario: TC15b - Invalid email
  Given driver 'http://localhost:3000/employees'
  And retry(20,500).waitFor('#employee-add-btn')
  When click('#employee-add-btn')
  And input('#employee-name-input', 'Test User')
  And input('#employee-email-input', 'invalid.email')
  And input('#employee-age-input', '25')
  When click('#employee-save-btn')
  Then retry(20,500).waitFor('#employee-email-error')
  And match text('#employee-email-error') contains 'Invalid email'

Scenario: TC15c - Invalid age
  Given driver 'http://localhost:3000/employees'
  And retry(20,500).waitFor('#employee-add-btn')
  When click('#employee-add-btn')
  And input('#employee-name-input', 'Test Human')
  And input('#employee-email-input', 'test@example.com')
  And input('#employee-age-input', '-5')
  When click('#employee-save-btn')
  Then retry(20,500).waitFor('#employee-age-error')
  And match text('#employee-age-error') contains 'Invalid age'
  And input('#employee-age-input', '999')
  When click('#employee-save-btn')
  Then retry(20,500).waitFor('#employee-age-error')
  And match text('#employee-age-error') contains 'Invalid age'

Scenario: TC15d - Missing department
  Given driver 'http://localhost:3000/employees'
  And retry(20,500).waitFor('#employee-add-btn')
  When click('#employee-add-btn')
  And input('#employee-name-input', 'Test User')
  And input('#employee-email-input', 'abc@xyz.com')
  And input('#employee-age-input', '30')
  When click('#employee-save-btn')
  Then retry(20,500).waitFor('#employee-department-error')
  And match text('#employee-department-error') contains 'Department required'
