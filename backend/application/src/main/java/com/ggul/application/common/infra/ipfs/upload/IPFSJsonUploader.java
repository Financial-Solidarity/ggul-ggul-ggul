package com.ggul.application.common.infra.ipfs.upload;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggul.application.common.infra.ipfs.config.IPFSConfig;
import com.ggul.application.common.infra.ipfs.exception.IPFSUploadFailureException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class IPFSJsonUploader {

    private final RestClient restClient;
    private final IPFSConfig ipfsConfig;
    private final ObjectMapper objectMapper;
    private String requestUrl;

    @PostConstruct
    private void initialize() {
        requestUrl = String.format("%s:%d/api/v0/add", ipfsConfig.getHost(), ipfsConfig.getApiPort());
    }

    /**
     * Object를 Json직렬화하여 IPFS에 저장
     * @param fileName 파일명
     * @param object 저장할 Object
     * @return IPFS 저장 정보
     */
    public IPFSResponse upload(String fileName, Object object) {
        IPFSResponse response = null;
        try{
            response = restClient.post()
                    .uri(requestUrl)
                    .contentType(MediaType.parseMediaType("multipart/form-data; charset=utf-8"))
                    .body(generateBody(fileName,objectMapper.writeValueAsString(object)))
                    .retrieve()
                    .body(IPFSResponse.class);
        } catch(JsonProcessingException e){
           throw new IPFSUploadFailureException(e);
        }
        return response;
    }

    private MultiValueMap<String, Object> generateBody(String fileName, String data){
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        HttpEntity<ByteArrayResource> filePart = new HttpEntity<>(
                new ByteArrayResource(data.getBytes()) {
                    @Override
                    public String getFilename() {
                        return fileName;
                    }
                }
        );
        body.add("file", filePart);
        return body;
    }
}
