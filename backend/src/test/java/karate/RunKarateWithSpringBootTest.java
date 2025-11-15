package karate;

import  com.intuit.karate.Results;
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

//	@Karate.Test
//	Karate testAuthBasic() {
//		return Karate.run("classpath:karate/auth_basic.feature")
//				.systemProperty("baseUrl", "http://localhost:" + port)
//				.relativeTo(getClass());
//	}

	// @Karate.Test
	// Karate testEmployees() {
	// return Karate.run("classpath:karate/employees.feature")
	// .systemProperty("baseUrl", "http://localhost:" + port)
	// .relativeTo(getClass());
	// }
//	@Karate.Test
//	Karate testDepartments() {
//		return Karate.run("classpath:karate/departmentsAPI.feature")
//				.systemProperty("baseUrl", "http://localhost:" + port)
//				.relativeTo(getClass());
//	}
//
//	@Karate.Test
//	Karate testEmployees() {
//		return Karate.run("classpath:karate/employees.feature")
//				.systemProperty("baseUrl", "http://localhost:" + port)
//				.relativeTo(getClass());
//	}
//
//	@Karate.Test
//	Karate testHomeRedirect() {
//		return Karate.run("classpath:karate/home.feature")
//				.systemProperty("baseUrl", "http://localhost:" + port)
//				.relativeTo(getClass());
//	}
//	@Karate.Test
//	Karate TestSecurity() {
//		return Karate.run("classpath:karate/security.feature")
//				.systemProperty("baseUrl", "http://localhost:" + port)
//				.relativeTo(getClass());
//	}
    // UI test suite: TC00 - TC17
    @Karate.Test Karate run_TC00() { return Karate.run("classpath:karate/ui/TC00_Register_page.feature"); }
    @Karate.Test Karate run_TC01() { return Karate.run("classpath:karate/ui/TC01_Login_and_Home_page.feature"); }
    @Karate.Test Karate run_TC02() { return Karate.run("classpath:karate/ui/TC02_Navbar.feature"); }
    @Karate.Test Karate run_TC03() { return Karate.run("classpath:karate/ui/TC03_Search_Employee_and_Department.feature"); }
    @Karate.Test Karate run_TC04() { return Karate.run("classpath:karate/ui/TC04_Add_Employee.feature"); }
    @Karate.Test Karate run_TC05() { return Karate.run("classpath:karate/ui/TC05_Edit_Employee.feature"); }
    @Karate.Test Karate run_TC06() { return Karate.run("classpath:karate/ui/TC06_Delete_Employee.feature"); }
    @Karate.Test Karate run_TC07() { return Karate.run("classpath:karate/ui/TC07_Add_Department.feature"); }
    @Karate.Test Karate run_TC08() { return Karate.run("classpath:karate/ui/TC08_Edit_Department.feature"); }
    @Karate.Test Karate run_TC09() { return Karate.run("classpath:karate/ui/TC09_Delete_Department.feature"); }
    @Karate.Test Karate run_TC10() { return Karate.run("classpath:karate/ui/TC10_Load_Dashboard.feature"); }
    @Karate.Test Karate run_TC11() { return Karate.run("classpath:karate/ui/TC11_Load_Profile_page.feature"); }
    @Karate.Test Karate run_TC12() { return Karate.run("classpath:karate/ui/TC12_Logout.feature"); }
    @Karate.Test Karate run_TC13() { return Karate.run("classpath:karate/ui/TC13_404_page.feature"); }
    @Karate.Test Karate run_TC14() { return Karate.run("classpath:karate/ui/TC14_Responsive_mobile.feature"); }
    @Karate.Test Karate run_TC15() { return Karate.run("classpath:karate/ui/TC15_Responsive_tablet.feature"); }
    @Karate.Test Karate run_TC16() { return Karate.run("classpath:karate/ui/TC16_Responsive_desktop.feature"); }
    @Karate.Test Karate run_TC17() { return Karate.run("classpath:karate/ui/TC17_Home.feature"); }



}
