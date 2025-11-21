package karate.performance;

import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;

import static com.intuit.karate.gatling.javaapi.KarateDsl.karateFeature;
import static io.gatling.javaapi.core.CoreDsl.rampUsers;
import static io.gatling.javaapi.core.CoreDsl.scenario;

public class EmployeeReadSimulation extends Simulation {

    public EmployeeReadSimulation() {
        ScenarioBuilder scn = scenario("Employee Read Load Test")
                .exec(karateFeature("classpath:karate/performance/perf-get-all-employees.feature"))
                .exec(karateFeature("classpath:karate/performance/perf-get-employee-by-id.feature"));

        setUp(
                scn.injectOpen(rampUsers(200).during(30))
        );
    }
}
