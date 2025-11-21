package karate.ui;

import com.intuit.karate.junit5.Karate;

public class UiTestRunner {
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
    @Karate.Test Karate run_TC14() { return Karate.run("classpath:karate/ui/TC14_Home.feature"); }
}
