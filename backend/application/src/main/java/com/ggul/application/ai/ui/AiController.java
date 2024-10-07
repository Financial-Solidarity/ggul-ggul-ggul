package com.ggul.application.ai.ui;

import com.ggul.application.ai.application.GenerationAdjectiveService;
import com.ggul.application.ai.ui.dto.OpenApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai")
@Slf4j
public class AiController {
    private final GenerationAdjectiveService generationAdjectiveService;

    @GetMapping("/equipment/{number}")
    public String getAdjective(@PathVariable(name = "number") Long adjectiveNumber){
        String openApiResponse = generationAdjectiveService.makeAdjective(adjectiveNumber);

        return openApiResponse;
    }


}
