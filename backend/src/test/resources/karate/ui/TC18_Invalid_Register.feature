Feature: Invalid Register Input

Background:
  * call read('classpath:karate/ui/common.feature')

Scenario: TC18a - Empty fields
  Given driver 'http://localhost:3000/register'
  And retry(20,500).waitFor('#register-submit-btn')
  When click('#register-submit-btn')
  Then retry(20,500).waitFor('#register-username-error')
  And match text('#register-username-error') contains 'Username required'
  And match text('#register-password-error') contains 'Password required'

Scenario: TC18b - Password too short
  Given driver 'http://localhost:3000/register'
  And retry(20,500).waitFor('#register-submit-btn')
  And input('#register-username-input', 'testuser')
  And input('#register-password-input', '123')
  When click('#register-submit-btn')
  Then retry(20,500).waitFor('#register-password-error')
  And match text('#register-password-error') contains 'Password too short'

Scenario: TC18c - Username already exists
  # First register the user to ensure it exists
  Given driver 'http://localhost:3000/register'
  And retry(20,500).waitFor('#register-submit-btn')
  And input('#register-username-input', 'karate_user_tc18')
  And input('#register-password-input', 'password123')
  And input('#register-confirm-password-input', 'password123')
  When click('#register-submit-btn')
  And delay(1000)

  # Now try to register again with the same username
  Given driver 'http://localhost:3000/register'
  And retry(20,500).waitFor('#register-submit-btn')
  And input('#register-username-input', 'karate_user_tc18')
  And input('#register-password-input', 'password123')
  And input('#register-confirm-password-input', 'password123')
  When click('#register-submit-btn')
  Then retry(20,500).waitFor('#register-error')
  And match text('#register-error') contains 'Username already exists'
