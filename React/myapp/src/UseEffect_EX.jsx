import { useEffect, useState } from 'react';

function UseEffect_EX() {
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    
    // 1. 의존성 배열 없음 → 매번 호출
    useEffect(() => {
        console.log('Hello from useEffect');
    });

    // 2. count4가 바뀔 때만 호출
    useEffect(() => {
        console.log("Counter value is now " + count4);
    }, [count4]);

    // 3. count5가 바뀔 때 호출 + 이전 effect 정리(clean up)
    useEffect(() => {
        console.log("Hello from useEffect");

        return (() => {
            console.log("Clean up function");
        });
    }, [count5]);

    return (
    <>
        <p>매번 호출: {count3} </p>
        <button onClick={() => setCount3(count3 + 1)}>매번 호출</button>

        <p>다시 렌더링: {count4} </p>
        <button onClick={() => setCount4(count4 + 1)}>다시 렌더링 </button>

        <p>정리 기능: {count5} </p>
        <button onClick={() => setCount5(count5 + 1)}>정리 기능 </button>
    </>
    );
}
export default UseEffect_EX;
