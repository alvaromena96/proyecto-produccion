package com.example.demo;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
public class PrimerTest {
 @Test
    void testBasico() {
        int resultado = 2 + 2;
        assertEquals(4, resultado);
    }
}