package com.hch.cvbuilder.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
  private final Key key;
  private final long expirationMillis;

  public JwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.expirationMinutes}") long expirationMinutes) {
    if (secret == null || secret.isBlank()) throw new IllegalStateException("JWT_SECRET not configured");
    this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    this.expirationMillis = expirationMinutes * 60_000L;
  }

  public String generate(String subject, Map<String, Object> claims) {
    Instant now = Instant.now();
    return Jwts.builder()
      .setSubject(subject)
      .addClaims(claims)
      .setIssuedAt(Date.from(now))
      .setExpiration(Date.from(now.plusMillis(expirationMillis)))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();
  }

  public String validateAndGetSubject(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
  }
}
