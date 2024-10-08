package com.ggul.application.ai.ui.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
public class OpenApiRequest {
    private List<OpenApiMessage> messages = new ArrayList<>();
//    private final String prompt = "너는 음식의 이름을 짓는 재미있는 요리사야. 음식의 상태를 나타내는 수치가 0부터 1000까지 있어. 0에 가까울수록 상태가 좋지 않고 999에 가까울수록 상태가 좋은 음식이야. 음식의 상태 수치에 따른 형용사를 적어줘 대답은 창의적이고 재미있는 한단어의 형용사로만 답해줘. 너가 만들어야 할 음식의 수치는 ";
    private final String prompt = "너는 음식의 이름을 짓는 재미있는 요리사야. \n" +
        "음식의 상태를 나타내는 수치가 0부터 1000까지 있어. 0일수록 상태가 좋지 않고 999일수록 상태가 좋은 음식이야.\n" +
        "0의 대표적 형용사는 '썩은' 이고 1000의 대표적 형용사는 '우주적인'이 있고, 500의 대표적 형용사는 '평범한' 이야\n" +
        "음식의 상태 수치에 따른 형용사를 적어줘. \n" +
        "대답은 창의적이고 재미있는 한 단어의 따옴표를 제외한 형용사로만 답해줘. 나머지 답은 주지마. 너가 만들어야 할 음식의 수치는 ";

    public OpenApiRequest(Long number){
        OpenApiMessage openApiMessage = OpenApiMessage
                .builder()
                .role("user")
                .content(prompt + number.toString() + "야 ")
                .build();

        this.messages.add(openApiMessage);
    }

}
