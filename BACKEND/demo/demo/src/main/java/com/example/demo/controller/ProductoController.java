package com.example.demo.controller;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;

    // Inyectamos el repositorio por constructor
    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // GET - Listar todos los productos
    @GetMapping
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    // GET - Obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
    return productoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
        @PathVariable Long id,
        @Valid @RequestBody Producto datosActualizados) {

    return productoRepository.findById(id)
            .map(productoExistente -> {
                productoExistente.setNombre(datosActualizados.getNombre());
                productoExistente.setPrecio(datosActualizados.getPrecio());
                productoExistente.setStock(datosActualizados.getStock());

                productoRepository.save(productoExistente);
                return ResponseEntity.ok(productoExistente);
            })
            .orElse(ResponseEntity.notFound().build());
    }


    // DELETE
    @DeleteMapping("/{id}")
public ResponseEntity<Void> borrarProducto(@PathVariable Long id) {
    if (productoRepository.existsById(id)) {
        productoRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    } else {
        return ResponseEntity.notFound().build(); // 404
    }
    }

    // POST - Crear un nuevo producto
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@Valid @RequestBody Producto producto) {
        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.ok(guardado);
    }
}