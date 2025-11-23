Feature: Validate Department input errors

Background:
  * call read('classpath:karate/ui/common.feature')

Scenario: TC16a - Empty fields
  Given driver 'http://localhost:3000/departments'
  And retry(20,500).waitFor('#department-add-btn')
  When click('#department-add-btn')
  When click('#department-save-btn')
  Then retry(20,300).waitFor('#department-name-error')
  And match text('#department-name-error') contains 'Name is required'

Scenario: TC16b - Invalid length
  Given driver 'http://localhost:3000/departments'
  And retry(20,500).waitFor('#department-add-btn')
  When click('#department-add-btn')
  And input('#department-name-input', 'A')
  And input('#department-desc-input', 'Desc...')
  When click('#department-save-btn')
  Then retry(20,500).waitForText('#department-name-error', 'Name is too short')
  
  And clear('#department-name-input')
  And input('#department-name-input', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  When click('#department-save-btn')
  Then retry(20,500).waitForText('#department-name-error', 'Name is too long')
