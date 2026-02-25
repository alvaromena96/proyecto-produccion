# Imagen base con Java
FROM eclipse-temurin:17-jdk-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos todo el proyecto
COPY . .

# Damos permisos al wrapper de Maven
RUN chmod +x mvnw

# Construimos el proyecto
RUN ./mvnw clean package -DskipTests

# Exponemos el puerto 8080
EXPOSE 8080

# Comando para arrancar la aplicación
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]