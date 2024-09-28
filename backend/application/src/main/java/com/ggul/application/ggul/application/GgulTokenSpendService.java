package com.ggul.application.ggul.application;

import com.ggul.application.ggul.domain.GgulLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GgulTokenSpendService {
    private final GgulLogRepository ggulLogRepository;
}
