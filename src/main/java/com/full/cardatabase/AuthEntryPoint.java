package com.full.cardatabase;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component // 스프링 빈으로 등록 (SecurityConfig에서 자동 인식)
public class AuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        // HTTP 상태 코드를 401 (Unauthorized)로 설정
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // 응답의 Content-Type을 application/json 으로 지정
        // (클라이언트에게 JSON 형식의 에러 응답임을 알림)
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // 응답 바디 인코딩을 UTF-8로 지정 (한글 깨짐 방지)
        response.setCharacterEncoding("UTF-8");

        // 응답 바디에 에러 메시지 출력
        PrintWriter writer = response.getWriter();
        writer.println("Error: " + authException.getMessage());
        // 예: "Error: Bad credentials" 이런 식으로 클라이언트에 내려감
    }
}
