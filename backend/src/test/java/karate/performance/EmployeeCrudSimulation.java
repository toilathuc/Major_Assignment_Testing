package karate.performance;

import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;

import static com.intuit.karate.gatling.javaapi.KarateDsl.karateFeature;
import static io.gatling.javaapi.core.CoreDsl.rampUsers;
import static io.gatling.javaapi.core.CoreDsl.scenario;

public class EmployeeCrudSimulation extends Simulation {

    public EmployeeCrudSimulation() {
        ScenarioBuilder scn = scenario("Employee CRUD Load Test")
                .exec(karateFeature("classpath:karate/performance/perf-create-employee.feature"))
                .exec(karateFeature("classpath:karate/performance/perf-update-employee.feature"))
                .exec(karateFeature("classpath:karate/performance/perf-delete-employee.feature"));

        setUp(
                scn.injectOpen(rampUsers(50).during(20))
        );
    }
}
