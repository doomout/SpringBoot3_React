package com.full.cardatabase;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import static org.springframework.security.config.Customizer.withDefaults;

import com.full.cardatabase.service.UserDetailsServiceImpl;

@Configuration // 이 클래스가 스프링 설정 클래스임을 나타냄
@EnableWebSecurity // Spring Security 보안 설정을 활성화
public class SecurityConfig {
    // DB에서 사용자 정보를 불러오는 서비스 (로그인 시 UserDetailsServiceImpl이 동작)
    private final UserDetailsServiceImpl userDetailsService;

    // JWT 토큰을 확인하는 커스텀 필터 (모든 요청에 대해 토큰 검사)
    private final AuthenticationFilter authenticationFilter;

    // 인증 실패(401 Unauthorized) 발생 시 실행될 핸들러
    private final AuthEntryPoint exceptionHandler;

    // 생성자 주입 (스프링이 자동으로 Bean을 넣어줌)
    public SecurityConfig(UserDetailsServiceImpl userDetailsService,
            AuthenticationFilter authenticationFilter,
            AuthEntryPoint exceptionHandler) {
        this.userDetailsService = userDetailsService;
        this.authenticationFilter = authenticationFilter;
        this.exceptionHandler = exceptionHandler;
    }

    // 사용자 인증을 처리할 때 UserDetailsService와 PasswordEncoder를 사용하도록 등록
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService) // 사용자 정보 조회 서비스
                .passwordEncoder(new BCryptPasswordEncoder()); // 비밀번호 암호화 방식
    }

    // 비밀번호 암호화를 담당하는 Bean 등록 (BCrypt 방식)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager Bean 등록 (로그인 시 아이디/비밀번호 검증 담당)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // Spring Security의 핵심 설정: 필터 체인 정의
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 모든 사용자에게 모든 접근 권한 부여
        // http.csrf((csrf) -> csrf.disable()).cors(withDefaults())
        // .authorizeHttpRequests((authorizeHttpRequests) ->
        // authorizeHttpRequests.anyRequest().permitAll());

        http.csrf((csrf) -> csrf.disable()).cors(withDefaults())
                .sessionManagement(
                        (sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(authenticationFilter,
                        UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(exceptionHandler));

        return http.build();
    }

    // 클래스 내에 전역 CORS 필터 추가
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(false);
        config.applyPermitDefaultValues();

        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
