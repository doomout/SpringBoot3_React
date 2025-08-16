package com.full.cardatabase.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;


public interface CarRepository extends CrudRepository<Car, Long> {
    // 브랜드로 자동차 검색
    //List<Car> findByBrand(String brand);
    
    // 색상으로 자동차 검색
    List<Car> findByColor(String color);
    
    // 연도로 자동차 검색
    List<Car> findByModelYear(int modelYear);

    // 브랜드와 모델로 자동차를 검색
    List<Car> findByBrandAndModel(String brand, String model);

    // 브랜드 또는 색상으로 자동차 가져오기
    List<Car> findByBrandOrColor(String brand, String color);

    // 브랜드로 자동차를 검색하고 연도로 정렬
    List<Car> findByBrandOrderByModelYearAsc(String brand);

    // SQL 문을 사용한 브랜드로 자동차 검색
    //@Query("select c from Car c where c.brand = ?1")
    //List<Car> findByBrand(String brand);

    // like 를 사용한 브랜드로 자동차 검색
    @Query("select c from Car c where c.brand like %?1")
    List<Car> findByBrand(String brand);
}
