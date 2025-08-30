# SpringBoot3_React
Spring Boot 3 + React 기반의 풀스택 웹 애플리케이션 실습 프로젝트

## Tech Stack
- **Backend**: Spring Boot 3.5.4, Java 17, MariaDB 10.11.14
- **Frontend**: React 19.1, Node.js 22.15.0, npm 10.9.2
- **Tools**: VSCode (Prettier, ESLint, React Snippets), Postman, Chrome React DevTools

## 주요 의존성
- Spring Boot Web / Data JPA / Security
- Spring Data REST
- Springdoc OpenAPI 2.8.9
- JWT (io.jsonwebtoken 0.11.5)
- MariaDB JDBC
- H2 (테스트)

# application.properties (개발 환경 예시)
```bash
spring.jpa.hibernate.ddl-auto=create-drop   # 🚨 개발 전용, 운영에서는 update/validate 권장
spring.jpa.show-sql=true
spring.data.rest.basePath=/api
springdoc.swagger-ui.path=/swagger-ui/index.html
```

## 1. 의존성 주입이란?

### 1. 생성자 주입 (Constructor Injection) ✅ 권장 방식

```java
@Component
public class Car {
    private final CarRepository carRepository;

    @Autowired // Spring 4.3+ 에서는 생략 가능
    public Car(CarRepository carRepository) {
        this.carRepository = carRepository;
    }
}
```

- 장점

  - final로 불변성 보장 → 중간에 변경 불가
  - 테스트/DI 용이 (생성 시점에만 주입)
  - 순환 참조 방지 가능

- 단점
  - 의존성이 많으면 생성자 매개변수 길어질 수 있음

### 2. 세터 주입 (Setter Injection)

```java
@Component
public class Car {
    private CarRepository carRepository;

    @Autowired
    public void setCarRepository(CarRepository carRepository) {
        this.carRepository = carRepository;
    }
}
```

- 장점

  - 주입할 의존성이 선택적일 때 유용
  - 객체 생성 후에도 의존성 변경 가능

- 단점
  - 불변성 보장 불가 → 중간에 바꿀 수 있음
  - 필드가 null 상태로 사용될 위험

### 3. 필드 주입 (Field Injection) ❌ 비권장

```java
@Component
public class Car {
    @Autowired
    private CarRepository carRepository;
}
```

- 장점

  - 코드 짧고 간단

- 단점
  - 테스트 어려움 (목 객체 주입 불편)
  - DI 컨테이너 없이 객체 생성 불가
  - 의존성이 숨겨져 있어서 명확하지 않음

정리표
| 방법 | 불변성 | 테스트 용이성 | 권장 여부 |
| ------ | --- | ------- | ------- |
| 생성자 주입 | ✅ | ✅ | ⭐ 강력 권장 |
| 세터 주입 | ❌ | 보통 | 조건부 사용 |
| 필드 주입 | ❌ | ❌ | 지양 |
