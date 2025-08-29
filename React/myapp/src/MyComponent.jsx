import React from 'react';
import AuthContext from './AuthContext';

function MyComponent()  {
    const authContext = React.useContext(AuthContext);

    return (
        <>
            Welcome {authContext}
        </>
    );
};

export default MyComponent;