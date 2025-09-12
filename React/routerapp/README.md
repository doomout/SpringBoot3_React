# 📌 React Router 기본 개념 정리

React Router는 **SPA(Single Page Application)**에서 URL에 따라 다른 컴포넌트를 보여주기 위해 사용하는 라우팅 라이브러리입니다.  
(전통적인 웹은 URL마다 서버에서 새로운 HTML을 내려주지만, React Router는 **클라이언트 사이드 라우팅**을 지원합니다.)

---

## 🚀 설치

```bash
npm install react-router-dom
```

⚡ 핵심 컴포넌트 & 훅

1. BrowserRouter

- 애플리케이션을 라우팅 가능하게 감싸주는 최상위 컴포넌트

```tsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <App />
</BrowserRouter>;
```

2. Routes / Route

- 경로(path)에 따라 어떤 컴포넌트를 렌더링할지 정의

```tsx
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>;
```

3. Link / NavLink

- a 태그 대신 사용
- 새로고침 없이 클라이언트 사이드 네비게이션을 지원

```tsx
import { Link, NavLink } from "react-router-dom";

<Link to="/about">소개</Link>
<NavLink to="/about" className="active-link">소개</NavLink>
```

4. useNavigate

- 자바스크립트 코드에서 페이지 이동할 때 사용

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/about");
```

5. useParams

- URL 파라미터를 읽어옴

```tsx
// 라우터 정의
<Route path="/users/:id" element={<User />} />;

// 컴포넌트
import { useParams } from "react-router-dom";
const { id } = useParams(); // /users/10 → id = "10"
```

📖 정리

- BrowserRouter : 라우팅 지원 최상위 컴포넌트
- Routes/Route : 경로와 컴포넌트 매핑
- Link/NavLink : 새로고침 없는 네비게이션
- useNavigate : JS 코드로 페이지 이동
- useParams : URL 파라미터 읽기

# 📌 React Router v6 예제 요약

React Router는 SPA에서 URL에 따라 다른 컴포넌트를 보여주는 라이브러리입니다.  
아래는 자주 쓰이는 기능들을 포함한 기본 예제입니다.

---

## 🚀 코드 요약

```tsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

// 정적 페이지
function Home() {
  return <h2>🏠 Home</h2>;
}
function Contact() {
  return <h2>📞 Contact</h2>;
}
function About() {
  return <h2>ℹ️ About</h2>;
}

// URL 파라미터 사용
function User() {
  const { id } = useParams();
  return <h2>👤 User ID: {id}</h2>;
}

// 코드로 네비게이션
function NavigateExample() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/")}>홈으로 이동</button>;
}

// 404 처리
function PageNotFound() {
  return <h2>❌ Page Not Found</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/contact">Contact</Link> |
        <Link to="/about">About</Link> | <Link to="/user/42">User 42</Link> |
        <Link to="/navigate">Navigate</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="user/:id" element={<User />} />
        <Route path="navigate" element={<NavigateExample />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 포함된 기능

- 기본 라우팅 → /, /contact, /about
- URL 파라미터 → /user/:id
- useNavigate 훅 → 코드로 페이지 이동
- 404 처리 → 없는 경로는 PageNotFound
