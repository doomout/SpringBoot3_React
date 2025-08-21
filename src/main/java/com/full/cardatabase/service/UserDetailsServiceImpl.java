package com.full.cardatabase.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;

import com.full.cardatabase.domain.AppUser;
import com.full.cardatabase.domain.AppUserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // AppUser 엔티티를 DB에서 조회하기 위해 사용하는 Repository
    private final AppUserRepository repository;

    // 생성자 주입 방식으로 Repository 주입
    public UserDetailsServiceImpl(AppUserRepository repository) {
        this.repository = repository;
    }

    // Spring Security에서 로그인 시 사용자 정보를 불러오는 핵심 메서드
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. username으로 DB에서 사용자 조회 (Optional로 감싸져 있음 → null 방지)
        Optional<AppUser> user = repository.findByUsername(username);

        UserBuilder builder = null;

        if (user.isPresent()) {
            // 2. 조회된 사용자 엔티티 꺼내오기
            AppUser currentUser = user.get();

            // 3. Spring Security 전용 User 객체를 만들기 위한 빌더 생성
            builder = org.springframework.security.core.userdetails.User.withUsername(username);

            // 4. DB에서 조회한 비밀번호를 설정
            builder.password(currentUser.getPassword());

            // 5. DB에서 조회한 권한(ROLE) 설정
            builder.roles(currentUser.getRole());

        } else {
            // 6. 해당 username이 DB에 없으면 예외 발생 → 로그인 실패 처리
            throw new UsernameNotFoundException("User not found.");
        }

        // 7. UserDetails 객체 반환 (Spring Security에서 사용)
        return builder.build();
    }
}
