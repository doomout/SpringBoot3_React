import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './Home';
import Contact from './Contact';
import PageNotFound from './PageNotFound';
import About from './About';

function User() {
  const { id } = useParams(); // URL 파라미터 읽기
  return <h2>👤 User ID: {id}</h2>;
}

function NavigateExample() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>🚀 Navigate Example</h2>
      <button onClick={() => navigate('/')}>홈으로 이동</button>
      <button onClick={() => navigate('/contact')}>Contact 이동</button>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>{' | '}
          <Link to="/contact">Contact</Link>{' | '}
          <Link to="/about">About</Link>{' | '}
          <Link to="/user/42">User 42</Link>{' | '}
          <Link to="/navigate">Navigate</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="user/:id" element={<User />} />
          <Route path="navigate" element={<NavigateExample />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
