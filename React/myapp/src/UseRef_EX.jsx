import { useRef } from "react";

function UseRef_EX() {
    // input 태그를 가리킬 "참조(ref)"를 만든다
    const inputRef = useRef(null);

    return (
    <>
        {/* input에 ref 속성을 연결 → inputRef.current가 input DOM을 가리키게 됨 */}
        <p><input ref={inputRef} /></p>

        {/* 버튼 클릭 시 → inputRef.current.focus() 실행 → input에 포커스 */}
        <button onClick={() => inputRef.current.focus()}>
            클릭시 포커스로 들어감
        </button>
    </>
    );
};

export default UseRef_EX;
