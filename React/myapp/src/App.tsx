
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

function App() {

  return (
  <div>
    <HelloComponent name="doom" age={15} />
  {/* 
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

