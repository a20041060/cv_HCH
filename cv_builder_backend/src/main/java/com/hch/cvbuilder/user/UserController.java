package com.hch.cvbuilder.user;

import com.hch.cvbuilder.security.UserDetailsImpl;
import com.hch.cvbuilder.user.dto.ProfileResponse;
import com.hch.cvbuilder.user.dto.ProfileUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
  private final UserRepository repo;
  public UserController(UserRepository repo) { this.repo = repo; }

  @GetMapping("/me")
  public ResponseEntity<ProfileResponse> me(@AuthenticationPrincipal UserDetailsImpl principal) {
    var u = repo.findById(principal.getId()).orElse(null);
    if (u == null) return ResponseEntity.notFound().build();
    return ResponseEntity.ok(new ProfileResponse(u.getId(), u.getEmail(), u.getName()));
  }

  @PutMapping("/me")
  public ResponseEntity<ProfileResponse> update(@AuthenticationPrincipal UserDetailsImpl principal, @Valid @RequestBody ProfileUpdateRequest body) {
    var u = repo.findById(principal.getId()).orElse(null);
    if (u == null) return ResponseEntity.notFound().build();
    u.setName(body.getName());
    repo.save(u);
    return ResponseEntity.ok(new ProfileResponse(u.getId(), u.getEmail(), u.getName()));
  }
}
