package com.ggul.application.common.infra.ipfs.upload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class IPFSResponse {
    @JsonProperty("Name")
    private String name;
    @JsonProperty("Hash")
    private String hash;
    @JsonProperty("Size")
    private String size;
}
