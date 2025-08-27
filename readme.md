## 풀스텍 웹 개발

- IDE: vscode
- 스프링 부트 3.5.4
- Java: openjdk 17.0.12
- DB: MariaDB 10.11.14
- Node.js: 22.15.0
- npm: 10.9.2
- React 용 vscode 확장 프로그램: Prettier, Reactjs code snippets, ESLint
- React 설치 과정: npm create vite@latest -> 앱 이름 지정 -> React -> JavaScript -> npm install

## 환경설정

```gradle
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-rest'

	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.9")
	implementation 'org.springframework.boot:spring-boot-starter-security'

	implementation("io.jsonwebtoken:jjwt-api:0.11.5")

	runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
	runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'

	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	runtimeOnly 'org.mariadb.jdbc:mariadb-java-client'

	testRuntimeOnly 'com.h2database:h2'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
	testImplementation 'org.springframework.security:spring-security-test'
}
```

```properties
logging.level.root=DEBUG

spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=create-drop

spring.data.rest.basePath=/api

# Data REST는 /api 아래, OpenAPI는 표준 /v3/api-docs 사용
spring.data.rest.basePath=/api
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui/index.html
springdoc.swagger-ui.enabled=true
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
