package com.ggul.application.application.ui;

import com.ggul.application.application.application.ApplicationService;
import com.ggul.application.application.application.dto.ApplicationHistoryInfo;
import com.ggul.application.application.application.dto.ApplicationSearchDto;
import com.ggul.application.application.domain.Status;
import com.ggul.application.application.ui.response.ApplicationApplyResultResponse;
import com.ggul.application.application.ui.response.ApplicationHistoryResponse;
import com.ggul.application.common.util.ListUtils;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public ResponseEntity<?> getApplications(@AuthenticationPrincipal UserLoginContext context,
                                             @RequestParam(required = false) String order,
                                             @RequestParam(required = false, defaultValue = "false") Boolean asc,
                                             @RequestParam(required = false) Boolean success,
                                             @RequestParam(required = false) String status,
                                             @RequestParam(required = false) Boolean own,
                                             Pageable pageable){
        return ResponseEntity.ok().body(applicationService.getApplications(ApplicationSearchDto.builder()
                .userId(context.getUserId())
                .order(order)
                .asc(asc)
                .success(success)
                .status(status != null ? Status.valueOf(status) : null)
                .own(own)
                .pageable(pageable)
                .build()));
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<?> getApplication(@PathVariable Long applicationId) {
        return ResponseEntity.ok().body(applicationService.getApplication(applicationId));
    }

    @PostMapping("/{applicationId}/apply")
    public ResponseEntity<?> applyApplication(@AuthenticationPrincipal UserLoginContext context,
                                              @PathVariable Long applicationId) {
        return ResponseEntity.ok().body(ApplicationApplyResultResponse.from(applicationService.applyApplication(context.getUserId(), applicationId)));
    }

    @GetMapping("/histories")
    public ResponseEntity<?> getApplicationHistories(@AuthenticationPrincipal UserLoginContext context, Pageable pageable) {
        Slice<ApplicationHistoryInfo> historyInfos = applicationService.getApplicationHistories(context.getUserId(), pageable);
        List<ApplicationHistoryResponse> historyResponses = ListUtils.applyFunctionToElements(historyInfos.getContent(), ApplicationHistoryResponse::from);
        return ResponseEntity.ok().body(new SliceImpl<>(historyResponses, historyInfos.getPageable(), historyInfos.hasNext()));
    }

}
