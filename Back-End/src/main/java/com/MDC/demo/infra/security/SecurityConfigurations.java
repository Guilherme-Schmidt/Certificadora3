package com.MDC.demo.infra.security;

import com.MDC.demo.model.AuthenticationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations implements WebMvcConfigurer {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/usuarios/auth/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/usuarios/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/usuarios/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/usuarios/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/atividades").hasAnyRole("ADMIN", "VOLUNTARIO")
                        .requestMatchers(HttpMethod.GET, "/atividades").hasAnyRole("ADMIN", "VOLUNTARIO", "APOIADOR")
                        .requestMatchers(HttpMethod.PUT, "/atividades/{id}").hasAnyRole("ADMIN", "VOLUNTARIO")
                        .requestMatchers(HttpMethod.DELETE, "/atividades").hasAnyRole("ADMIN", "VOLUNTARIO")
                        .requestMatchers(HttpMethod.GET, "/usuarios/lista").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .cors()  // Habilita CORS
                .and()
                .build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configuração global do CORS
        registry.addMapping("/**") // Aplica para todas as rotas
                .allowedOrigins("http://localhost:3000") // Permite requisições do frontend no React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Permite qualquer cabeçalho
                .allowCredentials(true); // Permite envio de cookies, se necessário
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


