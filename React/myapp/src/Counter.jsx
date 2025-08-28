import { useState } from "react";

function Counter() {
    // 초기 값이 0인 count 상태
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Counter = {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
};

export default Counter;