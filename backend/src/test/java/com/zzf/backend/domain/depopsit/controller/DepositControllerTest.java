package com.zzf.backend.domain.depopsit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.member.repository.MemberRepository;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.animal.repository.AnimalTypeRepository;
import com.zzf.backend.domain.deposit.dto.DepositRequest;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.zzf.backend.global.status.SuccessCode.CREATE_SUCCESS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DepositControllerTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalTypeRepository animalTypeRepository;

    @Autowired
    private DepositRepository depositRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjkxMzQxOGFmLTZiMmUtMTFlZi05MjlmLTI4YzVkMjFlYWJmMyIsImV4cCI6MTgxMzMzMDU4Nn0.ZgnLrGNNi9xt-jlJAgyNOAn6-_yw4m5C9SOUkk5zyPY";

    @Test
    public void 예금_조회_성공() throws Exception {
        //given

        //when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/deposit")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + jwtToken));

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3));
    }

    @Test
    public void 예금_등록_성공() throws Exception {
        // given
        DepositRequest depositRequest = new DepositRequest();

        depositRequest.setDepositTypeId(1L);
        depositRequest.setDepositAmount(1000000L);
        String content = gson.toJson(depositRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/deposit", depositRequest)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .header("Authorization", "Bearer " + jwtToken));

        // then
        actions.andExpect(status().isOk())  // (status().isCreated()) 라고 하면 오류나옴 나 return ResponseDto.success(SuccessCode.CREATE_SUCCESS); 했는데 왜?????
                .andExpect(jsonPath("$.httpStatus").value(CREATE_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(CREATE_SUCCESS.getMessage()));

        // 나중에 Repository랑 Service 생기면
        List<Deposit> depositList = depositRepository.findAll();
        assertThat(depositList.size()).isEqualTo(1); // DB에 저장되었는지 확인
        assertThat(depositList.get(0).getDepositType().getDepositTypeId()).isEqualTo(1L);
        assertThat(depositList.get(0).getDepositAmount()).isEqualTo(1000000L);
    }

    // Helper method to convert object to JSON string
    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
