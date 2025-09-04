import { useState } from "react";
import { User } from "./types"; // User 타입 불러오기

function UserComponent() {
  // User 상태, 초기값은 null
  const [user, setUser] = useState<User | null>(null);

  // 버튼 클릭 시, 유저 정보 세팅
  const handleLogin = () => {
    setUser({
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
    });
  };

  // 로그아웃 → 상태 초기화
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <p>안녕하세요, {user.name}님!</p>
          <p>이메일: {user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <p>로그인한 사용자가 없습니다.</p>
          <button onClick={handleLogin}>로그인</button>
        </>
      )}
    </div>
  );
}

export default UserComponent;
