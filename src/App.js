import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import ImgLocation from "./location.png";
import ImgPressure from "./pressure.png";
import ImgHumidity from "./humidity.png"

function App() {

  const [city, setCity] = useState("Nagpur");
  const [temp, setTemp] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState("Clear Sky");

  useEffect(() => {

    async function loadData() {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73ba4ed59fd3b370d4f178d831d3833a`)

      if (response.status === 200) {
        const temp = response.data.main.temp - 273.15
        setTemp(Math.round(temp))
        setPressure(response.data.main.pressure)
        setHumidity(response.data.main.humidity)
        setDesc(response.data.weather[0].description)
      }

    }
    loadData();
  }, [city])

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`

  return (
    <>
      <div className='container'>
        <h1 className='title'>Weather APP</h1>

        <div className='input-container'>
          <img alt='location' src={ImgLocation} className="img-location" />
          <input type="text" placeholder="Enter City Name" value={city} className="input-box" onChange={(e) => { setCity(e.target.value) }} />
        </div>

        <div className='city-container'>
          <h4 className='city'>{city} </h4>
          <h3>{date}</h3>
          <h2 className='temp'>{temp}°c</h2>
          <p>------------------------------------------------</p>
          <h2>{desc}</h2>
        </div>

        <div className='sub-container'>

          <div className='pressure-humidity-container'>
            <img alt='pressure' src={ImgPressure} className="img-pressure-humidity" />
            <h4 className='pressure'>Pressure : {pressure} </h4>
          </div>

          <div className='pressure-humidity-container'>
            <img alt='humidity' src={ImgHumidity} className="img-pressure-humidity" />
            <h4 className='humidity'>Humidity : {humidity} </h4>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
