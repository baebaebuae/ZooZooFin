package com.zzf.backend.domain.animal.controller;

import com.google.gson.Gson;
import com.zzf.backend.domain.animal.dto.AnimalCreateRequest;
import com.zzf.backend.domain.ending.dto.EndingRequest;
import com.zzf.backend.global.status.SuccessCode;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static com.zzf.backend.global.status.SuccessCode.*;
import static com.zzf.backend.global.status.ErrorCode.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AnimalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjkxMzQxOGFmLTZiMmUtMTFlZi05MjlmLTI4YzVkMjFlYWJmMyIsImV4cCI6MTgxMzMzMDU4Nn0.ZgnLrGNNi9xt-jlJAgyNOAn6-_yw4m5C9SOUkk5zyPY";

    @Test
    public void animal_type_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(ANIMAL_TYPES_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ANIMAL_TYPES_SUCCESS.getMessage()));

    }

    @Test
    public void create_animal_success() throws Exception {
        // given
        long testTypeId = 1L;
        String testAnimalName = "testAnimalName";

        AnimalCreateRequest animalCreateRequest = AnimalCreateRequest.builder()
                .animalTypeId(testTypeId)
                .animalName(testAnimalName)
                .build();
        String content = gson.toJson(animalCreateRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/animal")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(ANIMAL_CREATE_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ANIMAL_CREATE_SUCCESS.getMessage()));
    }

    @Test
    public void get_portfolio_success() throws Exception {
        // given
        EndingRequest endingRequest = EndingRequest.builder()
                .endingType("A001")
                .build();
        String content = gson.toJson(endingRequest);

        ResultActions givenActions = mockMvc.perform(
                post("/api/v1/ending")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal/1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(PORTFOLIO_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(PORTFOLIO_SUCCESS.getMessage()));
    }

    @Test
    public void portfolio_not_found_fail() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal/1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(PORTFOLIO_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(PORTFOLIO_NOT_FOUND_EXCEPTION.getMessage()));
    }
}