package com.hch.cvbuilder.auth;

import com.hch.cvbuilder.auth.dto.AuthResponse;
import com.hch.cvbuilder.auth.dto.LoginRequest;
import com.hch.cvbuilder.auth.dto.RegisterRequest;
import com.hch.cvbuilder.security.JwtService;
import com.hch.cvbuilder.user.User;
import com.hch.cvbuilder.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final UserRepository repo;
  private final PasswordEncoder encoder;
  private final JwtService jwtService;

  public AuthController(UserRepository repo, PasswordEncoder encoder, JwtService jwtService) {
    this.repo = repo; this.encoder = encoder; this.jwtService = jwtService;
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest body) {
    if (repo.findByEmail(body.getEmail()).isPresent()) return ResponseEntity.badRequest().build();
    User u = new User();
    u.setEmail(body.getEmail());
    u.setPasswordHash(encoder.encode(body.getPassword()));
    u.setName(body.getName());
    repo.save(u);
    String token = jwtService.generate(u.getEmail(), Map.of("uid", u.getId(), "name", u.getName()));
    return ResponseEntity.ok(new AuthResponse(token, u.getId(), u.getEmail(), u.getName()));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest body) {
    var u = repo.findByEmail(body.getEmail()).orElse(null);
    if (u == null) return ResponseEntity.status(401).build();
    if (!encoder.matches(body.getPassword(), u.getPasswordHash())) return ResponseEntity.status(401).build();
    String token = jwtService.generate(u.getEmail(), Map.of("uid", u.getId(), "name", u.getName()));
    return ResponseEntity.ok(new AuthResponse(token, u.getId(), u.getEmail(), u.getName()));
  }
}
