package com.ggul.application.common.infra.nonstop;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Nonstop {

    @GetMapping("/health-check")
    public String nonStop(){
        return "OK";
    }

}
