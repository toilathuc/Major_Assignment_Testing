package karate;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import com.intuit.karate.junit5.Karate;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import com.example.employeemanagement.EmployeeManagementApplication;

@SpringBootTest(classes = EmployeeManagementApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class RunKarateWithSpringBootTest {

	@LocalServerPort
	private int port;

	@BeforeEach
	public void setup() {
		// expose port to Karate via system property
		System.setProperty("karate.server.port", Integer.toString(port));
		// Also set baseUrl directly
		System.setProperty("karate.baseUrl", "http://localhost:" + port);
		System.setProperty("spring.profiles.active", "test");

	}

	@Karate.Test
	Karate testAuthBasic() {
		return Karate.run("classpath:karate/auth_basic.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}

	// @Karate.Test
	// Karate testEmployees() {
	// return Karate.run("classpath:karate/employees.feature")
	// .systemProperty("baseUrl", "http://localhost:" + port)
	// .relativeTo(getClass());
	// }
	@Karate.Test
	Karate testDepartments() {
		return Karate.run("classpath:karate/departmentsAPI.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}

	@Karate.Test
	Karate testEmployees() {
		return Karate.run("classpath:karate/employees.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}

	@Karate.Test
	Karate testHomeRedirect() {
		return Karate.run("classpath:karate/home.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}
	@Karate.Test
	Karate TestSecurity() {
		return Karate.run("classpath:karate/security.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}
}
