package com.MDC.demo.infra.security;

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

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf->csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/usuarios/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios/auth/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/usuarios/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/usuarios/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/usuarios/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/atividades").hasAnyRole("ADMIN", "VOLUNTARIO")
                        .requestMatchers(HttpMethod.GET, "/atividades/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/atividades/{id}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/atividades/{id}").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/atividades/{id}").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
