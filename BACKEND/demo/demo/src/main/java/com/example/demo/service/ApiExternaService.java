package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class ApiExternaService {

    public String obtenerMensaje() {
        // Simulación de llamada a API externa
        return "Respuesta real de API externa";
    }
}