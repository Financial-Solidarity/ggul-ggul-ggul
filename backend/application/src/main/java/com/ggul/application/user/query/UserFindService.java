package com.ggul.application.user.query;

import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.user.query.dto.EmailDuplicateCheckRequest;
import com.ggul.application.user.ui.dto.DuplicateValidationView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserFindService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public DuplicateValidationView emailDuplicateCheck(EmailDuplicateCheckRequest request) {
        Boolean isDuplicated = userRepository.existsByUsername(request.getEmail());
        return DuplicateValidationView.builder().isDuplicated(isDuplicated).build();
    }
}
