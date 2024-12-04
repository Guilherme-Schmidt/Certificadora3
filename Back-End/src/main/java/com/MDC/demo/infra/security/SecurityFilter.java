package com.MDC.demo.infra.security;

import com.MDC.demo.model.Usuarios;
import com.MDC.demo.repository.UsuarioRespository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRespository usuarioRespository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = recoverToken(request);
        if (token != null) {
            String email = tokenService.validateToken(token); // A validação retorna o email
            if (email != null && !email.isEmpty()) {
                Usuarios usuario = usuarioRespository.findByEmail(email);
                if (usuario != null) {
                    var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    throw new ServletException("Usuário não encontrado no banco");
                }
            } else {
                throw new ServletException("Token inválido ou expirado");
            }
        }
        filterChain.doFilter(request, response); // Continuar o fluxo
    }



    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", "").trim();
    }

}
