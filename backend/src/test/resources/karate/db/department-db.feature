Feature: Department Database Testing

  Background:
    * def config = karate.callSingle('db-config.js')
    * def DbUtils = Java.type('com.example.employeemanagement.util.DbUtils')
    * def db = new DbUtils(config.db)

  Scenario: Count departments
    * def rows = db.readRows("SELECT * FROM departments")
    * match rows.length >= 1

  Scenario: Insert a new department
    * def inserted = db.execute("INSERT INTO departments(name) VALUES ('IT Support')")
    * match inserted == 1
