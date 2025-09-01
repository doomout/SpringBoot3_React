import React from "react";

function MyList() {
    const data = [1,2,3,4,5];
    return (
        <>
        <ul>
            {
                data.map((number) => <li>listitem {number}</li>)
            }
        </ul>
        </>
    );
};

export default MyList;