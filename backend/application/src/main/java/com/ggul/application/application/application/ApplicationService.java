package com.ggul.application.application.application;

import com.ggul.application.application.application.dto.*;
import com.ggul.application.application.domain.*;
import com.ggul.application.application.exception.ApplicationClosedException;
import com.ggul.application.application.exception.ApplicationNotFoundException;
import com.ggul.application.application.exception.ApplicationWinningHistoryExistsException;
import com.ggul.application.common.util.ListUtils;
import com.ggul.application.image.infra.s3.exception.ImageUploadFailException;
import com.ggul.application.image.infra.s3.upload.S3Uploader;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.domain.Wallet;
import com.ggul.application.wallet.domain.WalletRepository;
import com.ggul.application.wallet.exception.WalletNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ApplicationService {
    private final ApplicationApplyService applicationApplyService;
    private final ApplicationRegisterService applicationRegisterService;
    private final S3Uploader s3Uploader;
    private final ApplicationRepository applicationRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;
    private final ApplicationHistoryRepository applicationHistoryRepository;

    /**
     * 응모 등록
     * @param dto 응모 등록 정보
     */
    @Transactional
    public void registerApplication(ApplicationRegisterDto dto) {
        ApplicationRegisterResult result =  applicationRegisterService.registerApplication(dto.getMaxWinnerCount(), dto.getProbability(), dto.getPrice());
        String url = null;
        try{
            url = s3Uploader.upload(dto.getImage(), "application");
        } catch (IOException e) {
            throw new ImageUploadFailException();
        }
        applicationRepository.save(Application.builder()
                .id(result.getApplicationNo())
                .title(dto.getTitle())
                .imageUrl(url)
                .probability(dto.getProbability())
                .price(dto.getPrice())
                .maxWinnerCount(dto.getMaxWinnerCount())
                .build());
    }

    /**
     * 응모 실행
     * @param userId 응모할 User Id
     * @param applicationId 응모할 Application Id
     * @return 응모 결과
     */
    @Transactional
    public ApplicationApplyResult applyApplication(UUID userId, Long applicationId) {
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(WalletNotFoundException::new);
        Application application = applicationRepository.findById(applicationId).orElseThrow(ApplicationNotFoundException::new);

        if(application.getStatus() == Status.CLOSE)
            throw new ApplicationClosedException();

        if(applicationHistoryRepository.existsByApplicationAndUserAndIsSuccess(application, userRepository.getReferenceById(userId), Boolean.TRUE))
           throw new ApplicationWinningHistoryExistsException();

        ApplicationApplyResult result = applicationApplyService.applyApplication(wallet.getAddress(), application);

        ApplicationHistory history = applicationHistoryRepository.save(ApplicationHistory.builder()
                .user(userRepository.getReferenceById(userId))
                .application(application)
                .transactionHash(result.getTransactionHash())
                .isSuccess(result.getIsSuccess())
                .nonce(result.getNonce())
                .build());

        if(result.getIsSuccess() && result.getRemainingWinnerCount() == 0)
            application.changeStatus(Status.CLOSE);
        return result;
    }

    /**
     * 응모 상세 조회
     * @param applicationId 조회할 Application Id
     * @return 응모 상세 정보
     */
    @Transactional
    public ApplicationInfo getApplication(Long applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(ApplicationNotFoundException::new);
        return ApplicationInfo.from(application);
    }

    /**
     * 응모 목록 조회
     * @param dto 응모 검색 Parameter
     * @return 검색된 응모 목록
     */
    @Transactional
    public Slice<ApplicationListElement> getApplications(ApplicationSearchDto dto) {
        return applicationRepository.findBySearchParameter(dto);
    }

    /**
     * 응모 내역 조회
     * @param userId 조회할 User Id
     * @param pageable pageable Instance
     * @return 응모 내역 목록
     */
    @Transactional
    public Slice<ApplicationHistoryInfo> getApplicationHistories(UUID userId, Pageable pageable) {
        Slice<ApplicationHistory> histories = applicationHistoryRepository.findByUserId(userId, pageable);
        return new SliceImpl<>(ListUtils.applyFunctionToElements(histories.getContent(), ApplicationHistoryInfo::from),
                histories.getPageable(),
                histories.hasNext());
    }

}
