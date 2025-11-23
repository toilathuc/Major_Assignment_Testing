Feature: User Database Testing

  Background:
    * def config = karate.callSingle('db-config.js')
    * def DbUtils = Java.type('com.example.employeemanagement.util.DbUtils')
    * def db = new DbUtils(config.db)
    * def uuid = java.util.UUID.randomUUID().toString().substring(0, 8)

  Scenario: Check sample users exist
    * def rows = db.readRows("SELECT * FROM users")
    * assert rows.length >= 1

  Scenario: Insert user with random username
    * def username = 'karate_' + uuid
    * def inserted = db.execute("INSERT INTO users(username,password) VALUES ('" + username + "','123')")
    * match inserted == 1

  Scenario: Unique username constraint
    * def error = (function(){ try { db.execute("INSERT INTO users(username,password) VALUES ('admin','123')"); return null; } catch(e){ return e; } })()
    * match error != null
