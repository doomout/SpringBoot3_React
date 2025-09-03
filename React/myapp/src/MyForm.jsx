import { useState } from "react";

function MyForm() {
    const [text, setText] = useState('');
    //입력 요소의 내용이 변경되면 값을 상태에 저장
    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        alert(`자네 타입은? ${text} 야`);
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            {/* <input type="text" onChange={handleChange} value={text}/> */}
            {/* JSX를 이용하여 인라인 onChange 핸들러 함수 사용 */}
            <input 
                type="text"
                onChange={event => setText(event.target.value)}
                value={text}
            />
            <input type="submit" value="눌러봐"/>
        </form>
    );
};

export default MyForm;