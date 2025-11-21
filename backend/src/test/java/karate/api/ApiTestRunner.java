package karate.api;

import com.intuit.karate.junit5.Karate;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import com.example.employeemanagement.EmployeeManagementApplication;

@SpringBootTest(classes = EmployeeManagementApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ApiTestRunner {

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
		return Karate.run("classpath:karate/api/auth_basic.feature")
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
		return Karate.run("classpath:karate/api/departmentsAPI.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}

	@Karate.Test
	Karate testEmployees() {
		return Karate.run("classpath:karate/api/employees.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}

	@Karate.Test
	Karate testHomeRedirect() {
		return Karate.run("classpath:karate/api/home.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}
	@Karate.Test
	Karate TestSecurity() {
		return Karate.run("classpath:karate/api/security.feature")
				.systemProperty("baseUrl", "http://localhost:" + port)
				.relativeTo(getClass());
	}


}
