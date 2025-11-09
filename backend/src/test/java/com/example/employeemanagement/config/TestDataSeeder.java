package com.example.employeemanagement.config;

import com.example.employeemanagement.model.User;
import com.example.employeemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Test-only data seeder that creates deterministic users for the "test" profile.
 */
@Component
@Profile("test")
public class TestDataSeeder implements ApplicationRunner {

  @Autowired private UserRepository userRepository;

  @Autowired private PasswordEncoder passwordEncoder;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    // create a regular user
    createIfMissing("user", "secret");
    // create an admin user
    createIfMissing("admin", "secret");
  }

  private void createIfMissing(String username, String rawPassword) {
    Optional<User> existing = userRepository.findByUsername(username);
    if (existing.isPresent()) {
      return;
    }
    User u = new User();
    u.setUsername(username);
    u.setPassword(passwordEncoder.encode(rawPassword));
    userRepository.save(u);
  }
}

