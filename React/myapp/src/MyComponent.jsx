import React from 'react';
import AuthContext from './AuthContext';

function MyComponent()  {
    // 버튼을 누르면 호출
    const handleClick  = () => {
        alert('버튼 눌렸음');
    }
    const authContext = React.useContext(AuthContext);

    return (
        <>
            <p>Welcome {authContext}</p>
            <button onClick={handleClick}>눌러봐~</button>
        </>
    );
};

export default MyComponent;