package com.full.cardatabase.web;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.full.cardatabase.domain.AccountCredentials;
import com.full.cardatabase.service.JwtService;

@RestController // REST API 컨트롤러임을 명시
public class LoginController {
    private final JwtService jwtService; // JWT 토큰 생성 및 검증 서비스
    private final AuthenticationManager authenticationManager; // 사용자 인증 처리 매니저

    // 생성자 주입 (Spring이 자동으로 Bean을 주입해줌)
    public LoginController(JwtService jwtService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login") // POST /login 요청을 처리
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
        // 클라이언트에서 보낸 username/password를 바탕으로 인증 객체 생성
        UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(credentials.username(),
                credentials.password());

        // AuthenticationManager가 실제 DB의 사용자 정보와 대조해서 인증 수행
        Authentication auth = authenticationManager.authenticate(creds);

        // 인증 성공 시 사용자 이름(auth.getName())을 기반으로 JWT 토큰 생성
        String jwts = jwtService.getToken(auth.getName());

        // 응답을 200 OK로 반환하면서
        // - Authorization 헤더에 JWT 토큰("Bearer ~")을 넣어줌
        // - 브라우저 CORS 환경에서 Authorization 헤더를 읽을 수 있도록 허용
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();
    }
}
