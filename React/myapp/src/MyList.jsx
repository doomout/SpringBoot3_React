import React from "react";

function MyList() {
    const data = [1,2,3,4,5];
    return (
        <>
        <ul>
            {
                // 목록에서 변화가 감지하는데는 고유키(index) 가 필요하다.
                data.map((number, index) => 
                <li key={index}>listitem {number}</li>)
            }
        </ul>
        </>
    );
};

export default MyList;