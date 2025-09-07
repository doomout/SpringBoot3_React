import { useState } from "react";

function ClickButton() {
  const [count, setCount] = useState(0);

  // 이벤트 타입: React.MouseEvent<HTMLButtonElement>
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("이벤트 객체:", event);
    setCount(count + 1);
  };

  return (
    <div>
      <p>클릭 횟수: {count}</p>
      <button onClick={handleClick}>클릭!</button>
    </div>
  );
}

export default ClickButton;
