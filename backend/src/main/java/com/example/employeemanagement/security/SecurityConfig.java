package com.example.employeemanagement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/** This class represents the security configuration. */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  /**
   * Password encoder.
   *
   * @return The password encoder
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * Authentication manager bean.
   *
   * @param authenticationConfiguration The authentication configuration
   * @return The authentication manager
   * @throws Exception If an error occurs
   */
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  /**
   * Configure security.
   *
   * @param http The HTTP security
   * @return The security filter chain
   * @throws Exception If an error occurs
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // Disable authentication for all routes
    http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(requests -> requests.anyRequest().permitAll()); // Allow access to all routes without authentication (for now)
    http.headers(headers -> headers.frameOptions(options -> options.disable()));
    return http.build();
  }
}

