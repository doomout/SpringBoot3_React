import { useState } from "react";
import useTitle from "./UseTitle";

function Counter() {
    // 초기 값이 0인 count 상태
    const [count, setCount] = useState(0);
    useTitle(`You clicked ${count} times`);
    
    return (
    <>
        <div>
            <p>Counter = {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    </>
    );
};

export default Counter;