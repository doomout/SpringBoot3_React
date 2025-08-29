
import './App.css'
import Counter from "./Counter"; 
import UseEffect_EX from "./UseEffect_EX";
import UseRef_EX from "./UseRef_EX";
import UseEffectExamples from "./UseEffectExamples";

function App() {
  return (
  <>
    <div>
      <h2>useState 연습</h2>
      <Counter />
      <h2>useEffect 연습</h2>
      <UseEffect_EX />  
      <h2>useRef_EX 연습</h2>
      <UseRef_EX />
      <UseEffectExamples />
    </div>
  </>
  );
}

export default App
