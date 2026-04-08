package com.example.demo;

import org.junit.jupiter.api.Test;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(HolaController.class)
public class HolaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testHolaEndpoint() throws Exception {
        mockMvc.perform(get("/hola"))
                .andExpect(status().isOk())
                .andExpect(content().string("¡Hola desde Spring Boot!"));
    }
}