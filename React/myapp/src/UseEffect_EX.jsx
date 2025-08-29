import { useEffect, useState } from 'react';

function UseEffect_EX() {
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    

    // 렌더링이 끝나면 매번 호출 
    useEffect(() => {
        console.log('Hello from useEffect');
    });

    // count 값이 변경되면 실행되고 컴포너트가 다시 렌더링 됨
    useEffect(() => {
        console.log("Counter value is now " + count4);
    }, [count4]);

    // 정리 기능
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