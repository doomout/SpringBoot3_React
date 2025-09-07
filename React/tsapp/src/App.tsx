import React, { useState } from 'react'
import './App.css'

import ClickButton from "./ClickButton";
import InputField from "./InputField";
import UserForm from "./UserForm";
import Users from "./Users";
import UsersAsync from "./UsersAsync";
import UsersAxios from "./UsersAxios";

function App() {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Hello ${name}`);
  }

  return (
    <>
    <UsersAxios />
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange}/>
      <input type="submit" value="Submit" />
    </form>
    <UsersAsync />
    <Users />
    <h1>이벤트 핸들링 연습 (React + TypeScript)</h1>
      <section>
        <h2>1. 버튼 클릭 예제</h2>
        <ClickButton />
      </section>
      <section>
        <h2>2. 입력창 예제</h2>
        <InputField />
      </section>
      <section>
        <h2>3. 폼 제출 예제</h2>
        <UserForm />
      </section>
    </>
  )
}

export default App
