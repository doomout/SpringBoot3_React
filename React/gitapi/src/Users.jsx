// Users.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 사용자 목록 컴포넌트
function Users() {
  // 데이터를 가져오는 함수
  const getUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  };

  // useQuery 훅 사용
  const { isLoading, isError, data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <p>⏳ 사용자 목록 불러오는 중...</p>;
  }

  if (isError) {
    return <p>❌ 데이터를 가져오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div>
      <h2>👤 사용자 목록</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
