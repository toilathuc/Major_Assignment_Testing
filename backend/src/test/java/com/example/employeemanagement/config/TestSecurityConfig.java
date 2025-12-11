package com.example.employeemanagement.config;

import com.example.employeemanagement.security.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * Test-only security configuration that enforces authentication for test scenarios.
 * Active when profile=test.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Profile("test")
@Order(1)
public class TestSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired private UserDetailsService userDetailsService;

  @Autowired private JwtRequestFilter jwtRequestFilter;

  @Autowired private PasswordEncoder passwordEncoder;

  @Autowired private AuthenticationManager authenticationManager;

  /*~~(Migrate manually based on https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter)~~>*/@Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
  }

  @Bean
  public AuthenticationEntryPoint unauthorizedEntryPoint() {
    return (request, response, authException) -> {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    };
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf
        .disable())
        .authorizeHttpRequests(requests -> requests
            // Allow OPTIONS (CORS preflight)
            .requestMatchers(HttpMethod.OPTIONS, "/**")
            .permitAll()
            // Allow authentication endpoints
            .requestMatchers("/authenticate", "/register")
            .permitAll()
            // Allow H2 console
            .requestMatchers("/h2-console/**")
            .permitAll()
            // Allow public endpoints for testing
            .requestMatchers("/", "/verify-username/**", "/reset-password")
            .permitAll()
            // Allow all other requests - test environment is permissive
            // Security tests will send JWT tokens and JwtRequestFilter will set Authentication
            // Controller code checks roles manually (e.g., deleteEmployee checks ROLE_ADMIN)
            .anyRequest()
            .permitAll())
        .exceptionHandling(handling -> handling
            .authenticationEntryPoint(unauthorizedEntryPoint()))
        .sessionManagement(management -> management
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    // Add JWT filter
    http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    // Enable CORS
    http.cors(withDefaults());

    // Allow H2 console frames
    http.headers(headers -> headers.frameOptions(options -> options.disable()));
  }
}
