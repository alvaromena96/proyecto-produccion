package com.example.demo;

import com.example.demo.service.CalculadoraService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculadoraServiceTest {

    private final CalculadoraService service = new CalculadoraService();

    @Test
    void testSumar() {
        int resultado = service.sumar(2, 3);
        assertEquals(5, resultado);
    }

    @Test
    void testDividirCorrecto() {
        int resultado = service.dividir(10, 2);
        assertEquals(5, resultado);
    }

    @Test
    void testDividirEntreCero() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            service.dividir(10, 0);
        });

        assertEquals("No se puede dividir entre cero", exception.getMessage());
    }
}