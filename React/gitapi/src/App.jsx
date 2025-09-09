import './App.css'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Repositories from './Repositories'
import Users from './Users';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1>React Query로 사용자 데이터 가져오기</h1>
          <Users />
        </div>
        <div>
          <h1>React Query로 깃허브 레포티지 가져오기</h1>
          <Repositories />
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
