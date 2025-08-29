import { useState } from 'react';
import './App.css'
import Counter from "./Counter"; // Counter 컴포넌트 가져오기

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  
  const increment = () =>{
    setCount(count + 1);  // 아직 렌더링 안됨
    setCount2(count2 + 1); 
    // 모든 상태가 업데이트 되고 나서 컴포넌드 재랜더링
  } 

  return (
    <>
    <p>Counters: {count} {count2}</p>
    <button onClick={increment}>Increment</button>
    </>
  );
}

export default App
