package com.ggul.application.application.domain;

import com.ggul.application.application.application.dto.ApplicationListElement;
import com.ggul.application.application.application.dto.ApplicationSearchDto;
import org.springframework.data.domain.Slice;

public interface ApplicationCustomRepository {

    Slice<ApplicationListElement> findBySearchParameter(ApplicationSearchDto dto);
}
