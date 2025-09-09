// React Query에서 useQuery 훅을 가져오기
import { useQuery } from '@tanstack/react-query';
// HTTP 요청을 위해 axios 라이브러리 가져오기
import axios from 'axios';

function Repositories() {
  // ✅ GitHub API에서 react 관련 저장소 목록을 가져오는 함수
  const getRepositories = async () => {
    // axios를 이용해 GitHub 검색 API 호출
    const response = await axios.get(
      'https://api.github.com/search/repositories?q=react'
    );
    // 응답 데이터 중 'items' 배열만 반환 (저장소 목록)
    return response.data.items;
  };

  // ✅ useQuery 훅을 이용해 데이터 가져오기
  const { isLoading, isError, data } = useQuery({
    queryKey: ['repositories'], // 쿼리 캐싱을 위한 key
    queryFn: getRepositories,   // 실행할 fetch 함수
  });

  // ✅ 로딩 중일 때 화면에 표시
  if (isLoading) {
    return <p>Loading....</p>;
  }

  // ✅ 에러 발생 시 화면에 표시
  if (isError) {
    return <p>Error....</p>;
  }

  // ✅ 데이터가 성공적으로 불러와졌을 때 테이블로 렌더링
  return (
    <table>
      <tbody>
        {
          // data는 배열 (저장소 목록)
          data.map((repo) => (
            <tr key={repo.id}>
              {/* 저장소 이름 */}
              <td>{repo.full_name}</td>
              {/* 저장소 URL (여기 오타 있음: fref → href로 수정해야 함) */}
              <td>
                <a href={repo.html_url}>{repo.html_url}</a>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Repositories;
