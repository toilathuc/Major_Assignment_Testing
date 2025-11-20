package karate.performance;

import io.gatling.app.Gatling;
import io.gatling.core.config.GatlingPropertiesBuilder;
import org.junit.jupiter.api.Test;

public class PerformanceRunner {

    @Test
    void runAllSimulations() {

        runSim("karate.performance.AuthSimulation");
        runSim("karate.performance.EmployeeReadSimulation");
        runSim("karate.performance.EmployeeCrudSimulation");
        runSim("karate.performance.DepartmentSimulation");
    }

    void runSim(String simulationClass) {
        GatlingPropertiesBuilder props = new GatlingPropertiesBuilder();
        props.simulationClass(simulationClass);
        Gatling.fromMap(props.build());
    }
}
