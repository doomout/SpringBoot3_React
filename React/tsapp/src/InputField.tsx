import { useState } from "react";

function InputField() {
  const [text, setText] = useState("");

  // 이벤트 타입: React.ChangeEvent<HTMLInputElement>
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>입력한 값: {text}</p>
    </div>
  );
}

export default InputField;
