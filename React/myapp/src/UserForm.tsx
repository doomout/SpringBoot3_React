import { useState } from "react";

function UserForm() {
  const [name, setName] = useState("");

  // 이벤트 타입: React.FormEvent<HTMLFormElement>
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 기본 동작(새로고침) 막기
    alert(`제출된 이름: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <button type="submit">제출</button>
    </form>
  );
}

export default UserForm;
