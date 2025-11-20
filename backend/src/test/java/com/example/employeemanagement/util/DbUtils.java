package com.example.employeemanagement.util;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.util.List;
import java.util.Map;

public class DbUtils {

    private final JdbcTemplate jdbc;

    public DbUtils(Map<String, Object> config) {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName((String) config.get("driverClassName"));
        ds.setUrl((String) config.get("url"));
        ds.setUsername((String) config.get("username"));
        ds.setPassword((String) config.get("password"));

        this.jdbc = new JdbcTemplate(ds);
    }

    public List<Map<String, Object>> readRows(String sql) {
        return jdbc.queryForList(sql);
    }

    public Map<String, Object> readRow(String sql) {
        return jdbc.queryForMap(sql);
    }

    public int execute(String sql) {
        return jdbc.update(sql);
    }
}
