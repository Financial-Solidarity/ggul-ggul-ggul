package com.ggul.application.user.application;

import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class SignoutService {
    private final UserRepository userRepository;

    @Transactional
    public void signout(UUID userId) {
        User referenceById = userRepository.getReferenceById(userId);
        referenceById.delete();
    }
}
