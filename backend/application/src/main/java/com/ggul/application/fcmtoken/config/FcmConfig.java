package com.ggul.application.fcmtoken.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.List;

@Slf4j
@Configuration
public class FcmConfig {

    private final String secretKeyDir = "firebase-secret-key.json";
    private final String firebaseScope = "https://www.googleapis.com/auth/cloud-platform";

    @Bean
    public InitializingBean firebaseConfig() {
        return () -> {
            try {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(
                                GoogleCredentials.fromStream(new ClassPathResource(secretKeyDir).getInputStream())
                                        .createScoped(List.of(firebaseScope)))
                        .build();
                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                    log.info("Firebase application has been initialized");
                }
            } catch (IOException e) {
                log.error(e.getMessage());
                throw new RuntimeException(e);
            }
        };
    }

}
