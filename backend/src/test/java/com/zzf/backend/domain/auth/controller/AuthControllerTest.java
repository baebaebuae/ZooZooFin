package com.zzf.backend.domain.auth.controller;

import com.google.gson.Gson;
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

import static com.epages.restdocs.apispec.ResourceDocumentation.resource;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjkxMzQxOGFmLTZiMmUtMTFlZi05MjlmLTI4YzVkMjFlYWJmMyIsImV4cCI6MTgxMzMzMDU4Nn0.ZgnLrGNNi9xt-jlJAgyNOAn6-_yw4m5C9SOUkk5zyPY";

//    @Test
//    public void logout_success() throws Exception {
//        // given
//
//        // when
//        ResultActions actions = mockMvc.perform(post("/api/v1/auth/logout")
//                .contentType(MediaType.APPLICATION_JSON)
//                .header("Authorization", "Bearer " + jwtToken));
//
//        // then
//        actions
//                .andExpect(status().isOk());
//
//    }
}