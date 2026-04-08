package com.example.demo;

import com.example.demo.service.ApiExternaService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ApiExternaServiceTest {

    @Test
    void testMockApiExterna() {
        // Creamos mock
        ApiExternaService mockService = mock(ApiExternaService.class);

        // Definimos comportamiento
        when(mockService.obtenerMensaje()).thenReturn("Respuesta simulada");

        // Ejecutamos
        String resultado = mockService.obtenerMensaje();

        // Verificamos
        assertEquals("Respuesta simulada", resultado);
    }
    @Test
    void testErrorApiExterna() {
    ApiExternaService mockService = mock(ApiExternaService.class);

    // Simulamos error
    when(mockService.obtenerMensaje()).thenThrow(new RuntimeException("Error 500"));

    Exception exception = assertThrows(RuntimeException.class, () -> {
        mockService.obtenerMensaje();
    });

    assertEquals("Error 500", exception.getMessage());
}
    @Test
    void testTimeoutApiExterna() {
    ApiExternaService mockService = mock(ApiExternaService.class);

    when(mockService.obtenerMensaje()).thenThrow(new RuntimeException("Timeout"));

    Exception exception = assertThrows(RuntimeException.class, () -> {
        mockService.obtenerMensaje();
    });

    assertEquals("Timeout", exception.getMessage());
}
}