Feature: User Database Testing

  Background:
    * def config = karate.callSingle('db-config.js')
    * def DbUtils = Java.type('com.example.employeemanagement.util.DbUtils')
    * def db = new DbUtils(config.db)

  Scenario: Check sample users exist
    * def rows = db.readRows("SELECT * FROM users")
    * match rows.length >= 1

  Scenario: Insert user
    * def inserted = db.execute("INSERT INTO users(username,password) VALUES ('karate_user','123')")
    * match inserted == 1

  Scenario: Unique username constraint
    * def error = null
    * try
      * db.execute("INSERT INTO users(username,password) VALUES ('admin','123')")
    * catch e
      * error = e
    * match error != null
