package com.zeromile;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ZeroMileDeliverySystemBackendApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void contextLoads() {
    }

    @Test
    void loginWithValidCredentials() throws Exception {
        String loginRequest = "{\"username\":\"testuser\",\"password\":\"password123\"}";

        mockMvc.perform(post("/api/auth/login")
                .contentType("application/json")
                .content(loginRequest))
                .andExpect(status().isOk());
    }
}
