import React from 'react';
import { HelloProps } from './types';

// 기존 코드를 화살표 함수형 컴포넌트로 변경
const HelloComponent: React.FC<HelloProps> = ({name, age}) => {
    return (
        <>
        안녕 나는 {name}인데, 난 {age} 살이야.
        </>
    );
}

export default HelloComponent;