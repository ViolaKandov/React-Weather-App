import React, { useState } from 'react'
import './WeatherApp.css'



import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import night_icon from '../Assets/night.png';
import clody_icon from '../Assets/cloudy.png';
import drizzle_icon from '../Assets/drizzle.png';
import drizzle_night_icon from '../Assets/drizzleNight.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import mist_icon from '../Assets/mist.png';
import wind_icon from '../Assets/wind.png';
import thunderstorm_icon from '../Assets/thunderstorm.png';
import humidity_icon from '../Assets/humidity.png';
import unknown_icon from '../Assets/unknown.png';
import snow_wallpaper from '../Assets/snow-wallpaper.jpg';



const WeatherApp = () => {
    let api_key = "d7112b67c9da729346ff8a4ad299d67f";

    const [wicon, setWicon] = useState(unknown_icon);
   

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        try {
            let response = await fetch(url)
            let data = await response.json();
            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            console.log("data: " + JSON.stringify(data))
            if (data.cod === "404") {
                humidity[0].innerHTML = "0%";
                wind[0].innerHTML = "0km/h";
                temperature[0].innerHTML = "0°c";
                location[0].innerHTML = "city not found";
                setWicon(unknown_icon);
            } else {
                humidity[0].innerHTML = data.main.humidity + " %";
                wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
                temperature[0].innerHTML = Math.floor(data.main.temp) + " °c";
                location[0].innerHTML = data.name;

                if (data.weather[0].icon === "01d") {
                    setWicon(clear_icon);
                }else if (data.weather[0].icon === "01n") {
                    setWicon(night_icon);
                }
                else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                    setWicon(clody_icon);
                }
                else if (data.weather[0].icon === "03d") {
                    setWicon(drizzle_icon);
                }else if (data.weather[0].icon === "03n") {
                    setWicon(drizzle_night_icon);
                }
                else if (data.weather[0].icon === "04d") {
                    setWicon(drizzle_icon);
                }
                else if (data.weather[0].icon === "04n") {
                    setWicon(drizzle_night_icon);
                }
                else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                    setWicon(rain_icon);
                }
                else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                    setWicon(rain_icon);
                }
                else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
                    setWicon(thunderstorm_icon);
                }
                else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                    setWicon(snow_icon);
                }
                else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
                    setWicon(mist_icon);
                }
                else {
                    setWicon(unknown_icon);
                }    
    
            }

    
    
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search'
 />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">0°c</div>
            <div className="weather-location">City</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" />
                    <div className="data">
                        <div className="humidity-percent">0%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" />
                    <div className="data">
                        <div className="wind-rate">0 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp 