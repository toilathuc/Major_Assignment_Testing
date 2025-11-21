package karate.db;

import com.intuit.karate.junit5.Karate;

public class DatabaseTestRunner {

    @Karate.Test
    Karate runAll() {
        return Karate.run(
                "classpath:karate/db/department-db",
                "classpath:karate/db/employee-db",
                "classpath:karate/db/user-db"
        ).relativeTo(getClass());
    }
}
