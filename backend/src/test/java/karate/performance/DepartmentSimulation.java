package karate.performance;

import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;

import static com.intuit.karate.gatling.javaapi.KarateDsl.karateFeature;
import static io.gatling.javaapi.core.CoreDsl.rampUsers;
import static io.gatling.javaapi.core.CoreDsl.scenario;

public class DepartmentSimulation extends Simulation {

    public DepartmentSimulation() {
        ScenarioBuilder scn = scenario("Department Load Test")
                .exec(karateFeature("classpath:karate/performance/perf-get-departments.feature"));

        setUp(
                scn.injectOpen(rampUsers(80).during(20))
        );
    }
}
