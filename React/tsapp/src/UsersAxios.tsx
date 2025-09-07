import { useEffect, useState } from "react";
import axios from "axios";

// API에서 받을 데이터 타입 정의
type User = {
  id: number;
  name: string;
  email: string;
};

function UsersAxios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios는 fetch보다 간단하게 쓸 수 있음
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // axios는 응답 JSON을 자동으로 res.data에 넣어줌
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>Axios 사용자 목록</h2>
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

export default UsersAxios;
