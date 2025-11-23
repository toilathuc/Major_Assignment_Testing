Feature: Employee Database Testing

  Background:
    * def config = karate.callSingle('db-config.js')
    * def DbUtils = Java.type('com.example.employeemanagement.util.DbUtils')
    * def db = new DbUtils(config.db)

  Scenario: Check employees exist
    * def rows = db.readRows("SELECT * FROM employees")
    * assert rows.length >= 1

  Scenario: Validate FK join
    * text query =
    """
    SELECT d.name AS dept
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    WHERE e.email = 'darrick.ortiz@hotmail.com'
    """
    * def row = db.readRow(query)
    * match row.dept == 'Fine Art'

  Scenario: Unique email constraint
    * def error = (function(){ try{ db.execute("INSERT INTO employees(first_name,last_name,email,department_id,age) VALUES ('Dup','Test','darrick.ortiz@hotmail.com',1,20)"); return null; } catch(e){ return e; } })()
    * match error != null
