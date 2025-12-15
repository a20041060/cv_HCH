package com.hch.cvbuilder.user;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users", indexes = {@Index(name = "idx_users_email", columnList = "email", unique = true)})
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true)
  private String email;
  @Column(nullable = false)
  private String passwordHash;
  @Column(nullable = false)
  private String name;
  private Instant createdAt;
  private Instant updatedAt;

  @PrePersist
  void onCreate() { createdAt = Instant.now(); updatedAt = createdAt; }
  @PreUpdate
  void onUpdate() { updatedAt = Instant.now(); }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPasswordHash() { return passwordHash; }
  public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public Instant getCreatedAt() { return createdAt; }
  public Instant getUpdatedAt() { return updatedAt; }
}
