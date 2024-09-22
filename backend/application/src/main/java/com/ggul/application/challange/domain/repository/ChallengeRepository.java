package com.ggul.application.challange.domain.repository;


import com.ggul.application.challange.domain.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChallengeRepository extends JpaRepository<Challenge, UUID> {
}
