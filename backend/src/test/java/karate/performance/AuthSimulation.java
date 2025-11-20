package karate.performance;

import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;

import static com.intuit.karate.gatling.javaapi.KarateDsl.karateFeature;
import static io.gatling.javaapi.core.CoreDsl.rampUsers;
import static io.gatling.javaapi.core.CoreDsl.scenario;

public class AuthSimulation extends Simulation {

    public AuthSimulation() {
        ScenarioBuilder scn = scenario("Auth Load Test")
                .exec(karateFeature("classpath:karate/performance/perf-auth.feature"));

        setUp(
                scn.injectOpen(rampUsers(100).during(20))
        );
    }
}
