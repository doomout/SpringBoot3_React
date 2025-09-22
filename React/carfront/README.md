# CarFront (React + TypeScript + Vite)

이 프로젝트는 **Vite**로 생성된 React + TypeScript 기반 프론트엔드 애플리케이션입니다.  
UI 라이브러리로는 **MUI(Material UI)** 를 사용하고,  
서버 상태 관리는 **TanStack React Query**,  
HTTP 요청은 **Axios**를 활용합니다.

---

## 📦 프로젝트 생성 및 초기 설정

### 1. Vite 기반 React + TypeScript 프로젝트 생성

```bash
npm create vite@latest
```

- 프로젝트 이름: carfront
- Framework: React
- Variant: TypeScript
- 프로젝트 디렉토리 이동

```bash
cd ./carfront
```

### 2. 기본 패키지 설치

```bash
npm install
```

### 3. UI 라이브러리 (MUI + Emotion) 설치

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### 4. React Query 설치 (서버 상태 관리)

```bash
npm install @tanstack/react-query
```

### 5. Axios 설치 (HTTP 통신 라이브러리)

```bash
npm install axios
```

### 6. MUI 데이터 그리드 설치

```bash
 npm install @mui/x-data-grid
```

### 7. MUI 아이콘 버튼 컴포넌트 설치

아이콘 종류 확인 사이트
https://mui.com/material-ui/material-icons/

```bash
npm install @mui/icons-material
```

## 타입스크립트 기초 문법 정리

### 1. 기본 타입

```ts
let isDone: boolean = true;
let age: number = 30;
let userName: string = "kim";

let numbers: number[] = [1, 2, 3]; // 배열
let tuple: [string, number] = ["kim", 10]; // 튜플
```

### 2. any, unknown, void, never

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

### 3. 함수 타입

```ts
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;
```

### 4. 객체 타입

```ts
type User = {
  name: string;
  age: number;
  isAdmin?: boolean; // 선택적 속성 (optional)
};

const user: User = { name: "kim", age: 30 };
```

### 5. 인터페이스

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

### 6. 유니온 & 교차 타입

```ts
let id: string | number; // 유니온
type Employee = Person & { job: string }; // 교차(합치기)
```

### 7. 제네릭

```ts
function identity<T>(arg: T): T {
  return arg;
}

const output1 = identity<string>("Hello");
const output2 = identity<number>(123);
```

### 8. 타입 단언 (Type Assertion)

```ts
let someValue: unknown = "Hello TypeScript";
let strLength: number = (someValue as string).length;
```

### 9. Enum (열거형)

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;
```

### 10. 타입 추론 & 타입 가드

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
