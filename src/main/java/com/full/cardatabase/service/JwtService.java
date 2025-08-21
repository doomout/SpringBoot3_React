package com.full.cardatabase.service;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtService {
    // 토큰 만료 시간 1일(밀리초). 실제 운영시에는 더 짧아야 함
    static final long EXPIRATIONTIME = 86400000;
    // 토큰의 접두사
    static final String PREFIX = "Bearer";

    // 비밀키 생성, 시연 목적으로만 이용
    // 운영 환경에선 애플리케이션 구성에서 읽어와야 함
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // 서명된 JWT 토큰 생성
    public String getToken(String username) {
        String token = Jwts.builder().setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(key)
                .compact();

        return token;
    }

    // 요청의 Authorization 헤더에서 토큰을 가져온 뒤 토큰을 확인하고 사용자 이름을 가져옴
    public String getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (token != null) {
            String user = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, ""))
                    .getBody()
                    .getSubject();

            if (user != null) {
                return user;
            }
        }
        return null;
    }
}
