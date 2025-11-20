Feature: Employee Database Testing

  Background:
    * def config = karate.callSingle('db-config.js')
    * def DbUtils = Java.type('com.example.employeemanagement.util.DbUtils')
    * def db = new DbUtils(config.db)

  Scenario: Check employees exist
    * def rows = db.readRows("SELECT * FROM employees")
    * match rows.length >= 1

  Scenario: Validate FK join
    * def result =
    """
    SELECT d.name AS dept
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    WHERE e.email = 'john.doe@example.com'
    """
    * def row = db.readRow(result)
    * match row.dept == 'Engineering'

  Scenario: Unique email constraint
    * def error = null
    * try
      * db.execute("INSERT INTO employees(first_name,last_name,email,department_id,age) VALUES ('Dup','Test','john.doe@example.com',1,20)")
    * catch e
      * error = e
    * match error != null
