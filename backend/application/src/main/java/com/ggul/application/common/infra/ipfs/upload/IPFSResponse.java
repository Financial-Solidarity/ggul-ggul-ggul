package com.ggul.application.common.infra.ipfs.upload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IPFSResponse {
    @JsonProperty("Name")
    private String name;
    @JsonProperty("Hash")
    private String hash;
    @JsonProperty("Size")
    private String size;
}
