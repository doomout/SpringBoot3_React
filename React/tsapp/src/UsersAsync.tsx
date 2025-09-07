import { useEffect, useState } from "react";

// User 타입 정의
type User = {
  id: number;
  name: string;
  email: string;
};

function UsersAsync() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터를 불러오는 비동기 함수
  const fetchUsers = async () => {
    try {
      // fetch는 Promise 반환 → await으로 결과 기다림
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("네트워크 응답 오류");
      }

      // response.json()도 Promise 반환 → await 필요
      const data: User[] = await response.json();

      setUsers(data); // 데이터 상태 업데이트
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      setLoading(false); // 성공이든 실패든 로딩 종료
    }
  };

  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>사용자 목록 (async/await)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersAsync;
