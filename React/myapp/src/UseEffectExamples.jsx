import { useEffect, useState } from "react";

function UseEffectExamples() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [running, setRunning] = useState(false);

  // 1. 의존성 배열 없음 → 모든 렌더링 후 실행
  useEffect(() => {
    console.log("✅ 모든 렌더링 후 실행 (count, userId, running 바뀔 때도 실행)");
  });

  // 2. 특정 state(userId)가 바뀔 때만 실행
  useEffect(() => {
    console.log("📡 userId가 바뀔 때만 실행:", userId);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [userId]);

  // 3. clean-up → running 상태가 바뀔 때 타이머 등록/해제
  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        console.log("⏱ 타이머 실행 중...");
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        console.log("🧹 타이머 정리");
      }
    };
  }, [running]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>useEffect 통합 예제</h2>

      {/* 1. 매번 실행 */}
      <div>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>count 증가</button>
      </div>
      <hr />

      {/* 2. 특정 state 변화 */}
      <div>
        <p>userId: {userId}</p>
        <button onClick={() => setUserId(userId + 1)}>다음 유저</button>
        <pre>{userData && JSON.stringify(userData, null, 2)}</pre>
      </div>
      <hr />

      {/* 3. clean-up */}
      <div>
        <p>타이머 상태: {running ? "실행 중" : "정지"}</p>
        <button onClick={() => setRunning(true)}>타이머 시작</button>
        <button onClick={() => setRunning(false)}>타이머 정지</button>
      </div>
    </div>
  );
}

export default UseEffectExamples;
