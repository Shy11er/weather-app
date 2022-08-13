import React, { useState } from 'react'
import { rainFun } from './rain'

function App() {
  const [ location, setLocation ] = useState('')
  const [ data, setData ] = useState({})
  const [ cities, setSities ] = useState([
    'Paris',
    'New York',
    'Moscow',
    'Tokyo',
    'Ottawa',
    'Berlin',
  ]);

  let city = data.name

  const searchLocation = (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=20f1ae8ab542849c0bc3f7bd808ce905`;

    fetch(url)
    .then(res => res.json())
    .then(result => {
      setLocation('')
      setData (result)
      console.log(result)
    })
  }
  
  const onSearchInputClick = (event) => {
    if (event.key === 'Enter') {
      searchLocation(location)
    }
  }

  const setWeather = (weather) => {
    switch(weather) {
      case 'Clear':
        return (<img id='weather_logo' src={require('./logo/sunny.png')}></img>);

      case 'Clouds':
        return (<img id='weather_logo' src={require('./logo/cloud.png')}></img>);

      case 'Fog':
      case 'Mist':
        return (<img id='weather_logo' src={require('./logo/foggy.png')}></img>);

      case 'Rain':
        return (<img id='weather_logo' src={require('./logo/rain.png')}></img>);

      case 'Thunderstorm':
        return (<img id='weather_logo' src={require('./logo/thunder.png')}/>)
      
      case 'Snow':
        return (<img id='weather_logo' src={require('./logo/snow.png')}/>)
    };
  }

  

  const dateBuilder = (d) => {
    const app = document.getElementById('app')
    
    if (!data.timezone) {
      return ''
    }else {
      let time = '';
      time = d.toISOString().replace('T', ' / ').slice(0,-5)

      let t = parseInt(time.slice(13,15))
      console.log(t)
     
      if ( 6 <= t && t < 18) {
        app.style.backgroundImage = "url('http://localhost:3000/static/media/morning.a61f24811c1d1b9dc829.png')"
      }else if (18 <= t && t < 23) {
        app.style.backgroundImage = "url('http://localhost:3000/static/media/evening.7d2b1c5a5cd94417f441.jpg')"
      }else{
        app.style.backgroundImage = "url('http://localhost:3000/static/media/night.01b8dc4ea91c4d834fe3.png')"
      }

      return (time) // 2022-08-11 / 18:19:40
    }
  }

  return (
    <div id='app'>
      <div className='left'>
        <div className='left-top'>
          <div className='logo'>
            <img src={require('./logo/term.png')} alt="" className='logo_image' id='weather_logo' />
            <h2 id='h2'>.Weather</h2>
          </div>
        </div>
        <div className='left-bottom'>
          <div className='info'>
            { data.main && <span id='temp'>{Math.ceil(data.main.temp - 273.15)}°</span> }
          </div>
          
          <div className='info'>
            { data.sys && <span id='city'> { city } </span> }
            <section className='section'>
              <div className='date'> { dateBuilder(new Date((new Date().getTime()) + (data.timezone)*1000)) } </div>
            </section>
          </div>
          
          <div className='info'>
            <div className='image_weather'> { setWeather( data.weather && data.weather[0].main) } </div>
            <br/>
            { data.weather && <span id='weather_description'> { data.weather[0].main} </span> }
          </div>
        </div>
      </div>
      <div className='right' id='right-sect'>
        <div className='input'>
          <input
          placeholder='Enter location'
          value={location}
          onChange={event => setLocation(event.target.value)}
          type='text'
          onKeyPress={onSearchInputClick}
          />
        </div>
        <ul id='cities'>
          { cities.map((city) => (
            <li key={city} className='city'
              onClick={() => searchLocation(city)}
            >{city}</li>
          )) }
        </ul>
        <div className='main_line'>
          <div className='line' id='right-sect'></div>
        </div>
        {data.main && (
          <ul id='weather_info'>
            <h3>Weather Details</h3>
            <li id='main_info'>
              <span>Cloudy</span>
              <span>{ data.clouds && data.clouds.all }%</span>
            </li>
            <li id='main_info'>
              <span>Wind</span>
              <span>{ data.wind && data.wind.speed } MPS</span>
            </li>
            <li id='main_info'>
              <span>Humidity</span>
              <span>{ data.main && data.main.humidity }%</span>
            </li>
            <li id='main_info'>
              <span>Feels like</span>
              <span>{ data.main && <span>{Math.ceil(data.main.feels_like - 273.15)}°</span> }</span>
            </li>
        </ul>
        )}
      </div>
    </div>
  );
}

export default App;
