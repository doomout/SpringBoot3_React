import React from 'react';
import AuthContext from './AuthContext';

function MyComponent()  {
    // 버튼을 누르면 호출
    const handleClick  = (event) => {
        event.preventDefault(); // 기본 작동 방지
        alert('버튼 눌렸음');
    }
    const authContext = React.useContext(AuthContext);

    return (
        <>
            <p>Welcome {authContext}</p>
            <form onClick={handleClick}>
                <input type="submit" value="눌러봐"/>
            </form>
        </>
    );
};

export default MyComponent;