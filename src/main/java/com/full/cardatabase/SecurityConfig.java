package com.full.cardatabase;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
import org.springframework.http.HttpMethod;

import com.full.cardatabase.service.UserDetailsServiceImpl;

@Configuration // 스프링 설정 클래스임을 나타냄
@EnableWebSecurity // Spring Security 설정을 활성화
public class SecurityConfig {
    private final UserDetailsServiceImpl userDetailsService;
    // DB에서 사용자 정보를 가져오는 서비스 (사용자 인증 시 필요)

    private final AuthenticationFilter authenticationFilter;
    // JWT 토큰을 확인하는 커스텀 필터

    // 생성자 주입
    public SecurityConfig(UserDetailsServiceImpl userDetailsService, AuthenticationFilter authenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.authenticationFilter = authenticationFilter;
    }

    // AuthenticationManagerBuilder에 사용자 정보 서비스와 비밀번호 인코더를 등록
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    // 비밀번호를 암호화하기 위한 PasswordEncoder Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager Bean 등록 (로그인 시 아이디/비밀번호 검증 담당)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // 보안 필터 체인 설정 (Spring Security의 핵심 부분)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable()) // CSRF 보호 기능 끔 (REST API는 보통 필요 없음)
                .formLogin(form -> form.disable()) // 기본 제공 로그인 폼 비활성화
                .httpBasic(basic -> basic.disable()) // HTTP Basic 인증 비활성화
                .sessionManagement((sessionManagement) -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 세션을 아예 사용하지 않음 (JWT 인증이므로 필요 없음)
                .authorizeHttpRequests(
                        (authorizeHttpRequests) -> authorizeHttpRequests
                                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                                // 로그인 API는 인증 없이 접근 허용
                                .anyRequest().authenticated())
                // 나머지 모든 요청은 인증 필요
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        // UsernamePasswordAuthenticationFilter 실행 전에 JWT 필터 실행

        return http.build();
    }
}
