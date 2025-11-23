@ignore
Feature: Common config for all UI tests

  Scenario:
    * configure driver = { type: 'chrome', addOptions: ['--remote-allow-origins=*'] }
    * driver 'about:blank'
    * maximize()