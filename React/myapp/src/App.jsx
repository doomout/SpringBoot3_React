
import './App.css'
import Counter from "./Counter"; 
import UseEffect_EX from "./UseEffect_EX";
import UseRef_EX from "./UseRef_EX";

function App() {
  return (
  <>
    <div>
      <h1>useState 연습</h1>
      <Counter />
      <h1>useEffect 연습</h1>
      <UseEffect_EX />  
      <h1>useRef_EX 연습</h1>
      <UseRef_EX />
    </div>
  </>
  );
}

export default App
