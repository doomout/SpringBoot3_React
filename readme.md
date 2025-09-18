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

# application.properties (개발 환경 예시)

```bash
spring.jpa.hibernate.ddl-auto=create-drop   # 🚨 개발 전용, 운영에서는 update/validate 권장
spring.jpa.show-sql=true
spring.data.rest.basePath=/api
springdoc.swagger-ui.path=/swagger-ui/index.html
```

### 타입스크립트 기초 문법 정리

## 1. 기본 타입

```ts
let isDone: boolean = true;
let age: number = 30;
let userName: string = "kim";

let numbers: number[] = [1, 2, 3]; // 배열
let tuple: [string, number] = ["kim", 10]; // 튜플
```

## 2. any, unknown, void, never

```ts
let notSure: any = 4; // 아무거나 → 되도록 쓰지 말기
let value: unknown = "hi"; // 타입 알 수 없을 때 → 사용 전 타입 체크 필요
function logMessage(msg: string): void {
  console.log(msg);
} // 리턴 없음
function fail(msg: string): never {
  throw new Error(msg);
} // 절대 리턴 안함
```

## 3. 함수 타입

```ts
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;
```

## 4. 객체 타입

```ts
type User = {
  name: string;
  age: number;
  isAdmin?: boolean; // 선택적 속성 (optional)
};

const user: User = { name: "kim", age: 30 };
```

## 5. 인터페이스

```ts
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  skills: string[];
}

const dev: Developer = {
  name: "lee",
  age: 25,
  skills: ["React", "TypeScript"],
};
```

## 6. 유니온 & 교차 타입

```ts
let id: string | number; // 유니온
type Employee = Person & { job: string }; // 교차(합치기)
```

## 7. 제네릭

```ts
function identity<T>(arg: T): T {
  return arg;
}

const output1 = identity<string>("Hello");
const output2 = identity<number>(123);
```

## 8. 타입 단언 (Type Assertion)

```ts
let someValue: unknown = "Hello TypeScript";
let strLength: number = (someValue as string).length;
```

## 9. Enum (열거형)

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;
```

## 10. 타입 추론 & 타입 가드

```ts
let message = "hi"; // string으로 추론됨

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // string 메서드 가능
  } else {
    console.log(id); // number
  }
}
```

## 11. React Query v3 예제 vs v4 + TypeScript 5 최신 코드

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
