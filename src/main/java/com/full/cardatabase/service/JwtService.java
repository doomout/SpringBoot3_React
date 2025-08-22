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
    // 토큰 만료 시간 (1일 = 86,400,000밀리초)
    // 실제 운영 환경에서는 보안 때문에 더 짧게 (예: 30분~2시간 정도) 설정하는 것이 일반적
    static final long EXPIRATIONTIME = 86400000;

    // 토큰 앞에 붙는 접두사 (Bearer {토큰} 형태로 Authorization 헤더에 들어감)
    static final String PREFIX = "Bearer";

    // 서명(Signature)에 사용할 비밀키 생성
    // 여기서는 간단히 HS256 알고리즘을 이용해 무작위 키를 생성했지만,
    // 실제 서비스에서는 환경변수나 별도의 보안 저장소에서 불러와야 함
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // ✅ JWT 토큰 생성 메서드
    public String getToken(String username) {
        String token = Jwts.builder() // JWT 빌더 시작
                .setSubject(username) // 토큰의 주체(subject) → 사용자 이름 저장
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                // 현재 시간 + 만료시간 설정
                .signWith(key) // 비밀키로 서명 (HS256)
                .compact(); // JWT 문자열 생성 (헤더.페이로드.서명)

        return token; // 완성된 JWT 문자열 반환
    }

    // ✅ 요청(HttpServletRequest)에서 JWT를 꺼내 사용자 이름 추출하는 메서드
    public String getAuthUser(HttpServletRequest request) {
        // HTTP 요청 헤더 중 "Authorization" 값을 꺼냄
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null) {
            // "Bearer " 접두사를 제거하고 토큰만 추출
            String user = Jwts.parserBuilder()
                    .setSigningKey(key) // 토큰 검증 시 사용할 비밀키 설정
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, ""))
                    // 토큰을 파싱(검증 포함)
                    .getBody() // JWT의 Body(Claims) 부분 꺼내기
                    .getSubject(); // subject(=username) 추출

            if (user != null) {
                return user; // 사용자 이름 반환
            }
        }
        return null; // 토큰이 없거나 검증 실패 시 null 반환
    }
}
