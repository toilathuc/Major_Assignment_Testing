package karate.db;

import com.intuit.karate.junit5.Karate;

public class DatabaseTestRunner {

    @Karate.Test
    Karate runAll() {
        return Karate.run(
                "classpath:karate/db/department-db.feature",
                "classpath:karate/db/employee-db.feature",
                "classpath:karate/db/user-db.feature"
        ).relativeTo(getClass());
    }
}
