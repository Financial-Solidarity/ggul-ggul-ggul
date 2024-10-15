package com.ggul.application.user.application;


import com.ggul.application.image.infra.s3.upload.S3Uploader;
import com.ggul.application.user.UserConstants;
import com.ggul.application.user.application.dto.UserInfoModifyRequest;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.user.exception.NicknameExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserInfoModifyService {
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    public void userInfoUpdate( UserInfoModifyRequest userInfoModifyRequest, MultipartFile profileImage, UUID userId) {
        validationCheck(userInfoModifyRequest);

        User user = userRepository.getReferenceById(userId);

        String imageUrl = null;
        if(profileImage != null) {
            try {
                imageUrl  = s3Uploader.upload(profileImage, UserConstants.PROFILE_DIR.getValue());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        user.update(userInfoModifyRequest, imageUrl);

    }

    private void validationCheck(UserInfoModifyRequest request) {
        if(request.getNickname() != null && !request.getNickname().isEmpty()) {
            if(userRepository.existsByNickname(request.getNickname())) {
                throw new NicknameExistException();
            }
        }
    }
}
