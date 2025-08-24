package com.full.cardatabase.service;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.full.cardatabase.domain.Car;

@Service
public class CarService {
    @PreAuthorize("hasRole('USER')")
    public void updateCar(Car car) {
        // 이 메서드는 USER 역할이 있는 사용자가 호출할 수 있음.
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteOwner(Car car) {
        // 이 메서드는 ADMIN 역할이 있는 사용자가 호출할 수 있음
    }
}
