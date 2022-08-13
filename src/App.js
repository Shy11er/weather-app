import React, { useState } from 'react'

function App() {
  const [ location, setLocation ] = useState('')
  const [ data, setData ] = useState({})

  let city = data.name

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=20f1ae8ab542849c0bc3f7bd808ce905`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetch(url)
      .then(res => res.json())
      .then(result => {
        setLocation('')
        setData (result)
        console.log(result)
      })
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
    if (!data.timezone) {
      return ''
    }else {
      return (d.toISOString().replace('T', ' / ').slice(0,-5)) // 2022-08-11 / 18:19:40
    }
  }

  const weather = () => {
    let description = document.getElementById('weather_description')


  }

  const setBackground = () => {
    let time = parseInt(dateBuilder.slice(13,15))
    console.log(time)
    let app = document.getElementById('app')

    if ( 0 <= time <=6 ) {
      app.style.background = `url('./images/night.png') no-repeat center center/cover` 
    } else if (6 < time <= 18) {
      app.style.background = `url('./images/morning.png') no-repeat center center/cover` 
    }else if (18 < time < 0) {
      app.style.background = `url('./images/evening.jpg') no-repeat center center/cover` 
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
          onKeyPress={searchLocation}
          />
        </div>
        <ul id='cities'></ul>
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
