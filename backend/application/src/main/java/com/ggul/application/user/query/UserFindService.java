package com.ggul.application.user.query;

import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.user.query.dto.EmailDuplicateCheckRequest;
import com.ggul.application.user.query.dto.NicknameDuplicateCheckRequest;
import com.ggul.application.user.ui.dto.DuplicateValidationView;
import com.ggul.application.user.ui.dto.UserInfoView;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserFindService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public DuplicateValidationView emailDuplicateCheck(EmailDuplicateCheckRequest request) {
        Boolean isDuplicated = userRepository.existsByUsername(request.getEmail());
        return DuplicateValidationView.builder().isDuplicated(isDuplicated).build();
    }


    @Transactional(readOnly = true)
    public DuplicateValidationView nicknameDuplicateCheck(NicknameDuplicateCheckRequest request) {
            Boolean isDuplicated = userRepository.existsByNickname(request.getNickname());
            return DuplicateValidationView.builder().isDuplicated(isDuplicated).build();
    }

    @Transactional(readOnly = true)
    public UserInfoView findById(UUID userId) {
        User user = userRepository.findById(userId).get();
        return UserInfoView.builder().userId(userId).nickname(user.getNickname()).profileImg(user.getProfile()).username(user.getUsername()).build();
    }
}
