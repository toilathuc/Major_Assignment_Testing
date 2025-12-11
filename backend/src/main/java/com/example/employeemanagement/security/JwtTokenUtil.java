package com.example.employeemanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

/** This class represents the JWT token utility. */
@Component
public class JwtTokenUtil {

  /** The secret key. */
  private static final String SECRET = "secretKey";

  private SecretKey getSignInKey() {
    // Use the raw bytes of the secret string to avoid Base64 decoding issues with the short/invalid string.
    // This ensures a valid key is generated, even if it differs from the legacy Base64-decoded key (which might have failed or been ambiguous).
    return new SecretKeySpec(SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
  }

  /**
   * Extract username.
   *
   * @param token The token
   * @return The username
   */
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * Extract expiration.
   *
   * @param token The token
   * @return The expiration date
   */
  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  /**
   * Extract claim.
   *
   * @param token The token
   * @param claimsResolver The claims resolver
   * @return The claim
   * @param <T> The type of the claim
   */
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  /**
   * Extract all claims.
   *
   * @param token The token
   * @return The claims
   */
  private Claims extractAllClaims(String token) {
    return Jwts.parser()
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  /**
   * Determine if the token is expired.
   *
   * @param token The token
   * @return True if the token is expired, false otherwise
   */
  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  /**
   * Generate JWT token.
   *
   * @param username The username
   * @return The JWT token
   */
  public String generateToken(String username) {
    return Jwts.builder()
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7)) // 1 week validity
        .signWith(getSignInKey())
        .compact();
  }

  /**
   * Validate token.
   *
   * @param token The token
   * @param username The username
   * @return True if the token is valid, false otherwise
   */
  public Boolean validateToken(String token, String username) {
    final String extractedUsername = extractUsername(token);
    return (extractedUsername.equals(username) && !isTokenExpired(token));
  }
}
