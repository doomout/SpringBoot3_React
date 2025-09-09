import './App.css'
import { useState } from 'react';
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function App() {
  // 선택된 날짜 상태
  const [value, setValue] = useState(new Date());

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📅 날짜 선택기</h1>
      <DatePicker onChange={setValue} value={value} />
      <p style={{ marginTop: '1rem' }}>
        선택된 날짜: {value?.toString()}
      </p>
    </div>
  );
}

export default App
