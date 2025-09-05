import { useEffect, useState } from "react";

// User 데이터 타입 정의
// API 응답에서 id, name, email 세 가지만 사용한다고 가정
type User = {
  id: number;
  name: string;
  email: string;
};

function Users() {
  // users 상태: User 객체 배열 (초기값은 빈 배열)
  const [users, setUsers] = useState<User[]>([]);
  // 로딩 상태: true = 아직 데이터를 불러오는 중
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 처음 렌더링될 때(API 호출)
  useEffect(() => {
    // fetch는 Promise를 반환
    fetch("https://jsonplaceholder.typicode.com/users")
      // 응답을 받았을 때 실행
      .then((response) => {
        if (!response.ok) {
          // HTTP 상태 코드가 200~299가 아니면 에러 발생
          throw new Error("네트워크 응답 오류");
        }
        // 응답을 JSON으로 변환 → 이것도 Promise
        return response.json();
      })
      // JSON 데이터가 준비되면 실행
      .then((data: User[]) => {
        // 받아온 데이터를 users 상태에 저장
        setUsers(data);
        // 로딩 완료
        setLoading(false);
      })
      // 에러가 발생했을 경우 실행
      .catch((error) => {
        console.error("에러 발생:", error);
        setLoading(false);
      });
  }, []); 
  // [] → 의존성 배열: 컴포넌트가 처음 마운트될 때만 실행됨

  // 로딩 중일 때는 "로딩 중..." 메시지 표시
  if (loading) return <p>로딩 중...</p>;

  // 로딩이 끝났다면 사용자 목록 출력
  return (
    <div>
      <h2>사용자 목록 (Promise 체인)</h2>
      <ul>
        {users.map((user) => (
          // key 속성은 React가 리스트를 렌더링할 때 필요한 식별자
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
