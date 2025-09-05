
import './App.css'
import Counter from "./Counter"; 
import UseEffect_EX from "./UseEffect_EX";
import UseRef_EX from "./UseRef_EX";
import UseEffectExamples from "./UseEffectExamples";
import AuthContext from './AuthContext';
import MyComponent from './MyComponent';
import MyList from './MyList';
import MyTable from './MyTable';
import MyForm from './MyForm';
import HelloComponent from './HelloComponent';
import UserComponent from './UserComponent';
import ClickButton from "./ClickButton";
import InputField from "./InputField";
import UserForm from "./UserForm";
import Users from "./Users";
import UsersAsync from "./UsersAsync";
import UsersAxios from "./UsersAxios";

function App() {

  return (
  <div>
    <UsersAxios />
  {/* 과거 예제들
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
    <UserComponent />
    <HelloComponent name="doom" age={15} />
    <MyForm />
    <MyComponent />
    <MyTable />
    <MyList />
    <h2>useState 연습</h2>
    <Counter />
    <h2>useEffect 연습</h2>
    <UseEffect_EX />  
    <h2>useRef_EX 연습</h2>
    <UseRef_EX />     
    <UseEffectExamples />
  */}
  </div>
  );
}

export default App

