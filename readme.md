# SpringBoot3_React

Spring Boot 3 + React 기반의 풀스택 웹 애플리케이션 실습 프로젝트

## Tech Stack

- **Backend**: Spring Boot 3.5.4, Java 17, MariaDB 10.11.14
- **Frontend**: React 19.1, Node.js 22.15.0, npm 10.9.2, TypeScript 5.9.2
- **Tools**: VSCode (Prettier, ESLint, React Snippets), Postman, Chrome React DevTools

## 주요 의존성

- Spring Boot Web / Data JPA / Security
- Spring Data REST
- Springdoc OpenAPI 2.8.9
- JWT (io.jsonwebtoken 0.11.5)
- MariaDB JDBC
- H2 (테스트)
- React, TypeScript

## application.properties (개발 환경 예시)

```bash
spring.jpa.hibernate.ddl-auto=create-drop   # 🚨 개발 전용, 운영에서는 update/validate 권장
spring.jpa.show-sql=true
spring.data.rest.basePath=/api
springdoc.swagger-ui.path=/swagger-ui/index.html
```

## React Query v3 예제 vs v4 + TypeScript 5 최신 코드

### Import 방식

```ts
// TypeScript 4.x
import { CarResponse } from "../types";

// TypeScript 5.x
import type { CarResponse } from "../types";
```

### useMutation 사용법

```ts
// React Query v3
const { mutate } = useMutation(addCar, {
  onSuccess: () => {
    queryClient.invalidateQueries(["cars"]);
  },
});

// React Query v4 + TypeScript 5
const { mutate } = useMutation<CarResponse, Error, Car>({
  mutationFn: addCar,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["cars"] });
  },
  onError: (err: Error) => {
    console.error(err.message);
  },
});
```

### invalidateQueries

```ts
// React Query v3
queryClient.invalidateQueries(["cars"]);

// React Query v4 (객체 문법 필수)
queryClient.invalidateQueries({ queryKey: ["cars"] });
```

### 에러 핸들링

```ts
// React Query v3
onError: (err) => {
  console.error(err);
};

// React Query v4
onError: (err: Error) => {
  console.error(err.message);
};
```

### Form 입력값 (string → number 변환)

```ts
// TypeScript 4.x (느슨한 타입 허용)
<input name="price" value={car.price} onChange={handleChange} />

// TypeScript 5.x (string → number 변환 필요)
<input
  name="price"
  value={car.price}
  onChange={(e) => setCar({ ...car, price: Number(e.target.value) })}
/>
```

## 리액트 테스트 하기

## Jest란?

**Facebook(현재 Meta)**에서 만든 JavaScript/TypeScript 테스트 프레임워크
React 프로젝트에서 가장 널리 쓰이는 테스트 도구
단위 테스트(Unit Test), 스냅샷 테스트(Snapshot Test), 비동기 코드 테스트 지원

### 주요 특징

- Zero Config → React + Vite/CRA 환경에서 바로 사용 가능
- 스냅샷 테스트 → 컴포넌트 UI 변경 여부를 쉽게 감지
- 빠른 실행 속도와 watch 모드 → 코드 변경 시 자동으로 테스트 재실행
- Mocking 지원 → API 호출, 함수 등을 가짜로 만들어 독립적으로 테스트 가능

### 기본 사용법

```bash
# 설치
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

```json
// package.json 예시
"scripts": {
  "test": "jest"
}
```

```js
// 예시 테스트 (sum.test.js)
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello world", () => {
  render(<App />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
```

## React Testing Library란?

- React 컴포넌트 테스트 전용 라이브러리
- DOM Testing Library 기반 → 실제 브라우저 환경과 유사하게 컴포넌트를 다룸
- “사용자 관점” 테스트를 강조 (버튼 클릭, 텍스트 확인 등)

### 주요 특징

- 사용자 중심: DOM 쿼리(getByText, getByRole 등)로 UI를 실제 사용자처럼 테스트
- Jest와 함께 사용: 보통 Jest + RTL 조합으로 단위/통합 테스트 작성
- 간단한 API: 불필요한 구현 세부사항 대신, “어떤 화면이 보여야 하는가”에 집중
- 접근성(A11y) 향상: 접근성 역할(Role)에 기반한 테스트 권장

### 기본 사용법

```bash
# 설치
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```js
// App.test.js 예시
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("버튼 클릭 시 텍스트 변경", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /클릭/i }));
  expect(screen.getByText(/변경됨/i)).toBeInTheDocument();
});
```

### 정리하면:

- Jest → 테스트 실행기(Test Runner)
- React Testing Library → React 컴포넌트 테스트 도구
