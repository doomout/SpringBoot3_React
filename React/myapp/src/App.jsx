import { useEffect, useState } from 'react';
import './App.css'
import Counter from "./Counter"; // Counter 컴포넌트 가져오기

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  
  const increment = () =>{
    setCount(count + 1);  // 아직 렌더링 안됨
    setCount2(count2 + 1); 
    // 모든 상태가 업데이트 되고 나서 컴포넌드 재랜더링
  } 

  // 렌더링이 끝나면 매번 호출 됨
  useEffect(() => {
    console.log('Hello from useEffect');
  });

  // count 값이 변경되면 실행되고 컴포너트가 다시 렌더링 됨
  useEffect(() => {
    console.log("Counter value is now " + count4);
  }, [count4]);

  return (
    <>
    <p>Counters: {count} {count2}</p>
    <p><button onClick={increment}>Increment</button></p>
    <button onClick={() => setCount3(count3 + 1)}>눌러봐</button>
    <button onClick={() => setCount4(count4 + 1)}>이건 </button>
    </>
  );
}

export default App
