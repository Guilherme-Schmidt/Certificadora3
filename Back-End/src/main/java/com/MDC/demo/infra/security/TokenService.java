package com.MDC.demo.infra.security;

import com.MDC.demo.model.Usuarios;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuarios usuarios) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(usuarios.getEmail())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);
            System.out.println("Token gerado: " + token); // Log do token
            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error while generating token", e);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            var verifier = JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build();
            var decodedJWT = verifier.verify(token);
            System.out.println("Token válido, subject: " + decodedJWT.getSubject());
            return decodedJWT.getSubject();
        } catch (JWTVerificationException e) {
            System.out.println("Erro na validação do token: " + e.getMessage());
            return null;
        }
    }


    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
