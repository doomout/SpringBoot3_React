import './App.css'
import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&APIKey=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(result => {
      setWeather({
        temp: result.main.temp,
        desc: result.weather[0].main,
        icon: result.weather[0].icon
      });
    })
    .catch(err => console.error(err))
  }, [])

  const [weather, setWeather] = useState({
    temp: '', desc: '', icon: ''
  });
  if(weather.icon) {
    return (
      <>
        <p>온도: {weather.temp} 도</p>
        <p>날씨: {weather.desc}</p>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather icon" />
      </>
    );
  }
  else {
    return <div>Loading....</div>
  }

}

export default App
