Feature: Invalid Login

Background:
  * call read('classpath:karate/ui/common.feature')

Scenario: TC17 - Empty username/password
  Given driver 'http://localhost:3000/login'
  And retry(20,500).waitFor('#login-submit-btn')
  When click('#login-submit-btn')
  Then retry(20,500).waitFor('#login-error')
  And match text('#login-error') contains 'Username and password required'
