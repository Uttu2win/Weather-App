let cityName =document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temp = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");


let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_pressure = document.querySelector(".weather_pressure");
let w_wind = document.querySelector(".weather_wind");
let w_humidity = document.querySelector(".weather_humidity");
let w_sunrise =document.querySelector(".weather_sunrise");
let w_sunset =document.querySelector(".weather_sunset");

let citySearch= document.querySelector(".weather_search")

const getCountryName =(code)=>{
    return  new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}


const getDateTime=(dt)=>{
    const curDate =new Date(dt*1000);
    const options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    }

    
    const formatter= new Intl.DateTimeFormat("en-US",options);

     return formatter.format(curDate)
}
const getTime=(dt, offset)=>{
    const curDate =new Date((dt+offset)*1000);
    const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC"
    }

    
    const formatter= new Intl.DateTimeFormat("en-US",options);

     return formatter.format(curDate)
}


let city="hassan";

//search functionality
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName =document.querySelector(".city_name");
    city=cityName.value;
    getWeatherData();
    cityName.value=""
})

const getWeatherData = async () => {
    const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0eb495cecf5db8c8dc27b8192f324f9b`
    try{
        const res =await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const {main,name,weather,sys,wind,dt,timezone}=data;
        
    cityName.innerHTML= `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML= getDateTime(dt);
    w_temp.innerHTML=`${main.temp}&#176`;
    w_minTem.innerHTML=`Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML=`Max: ${main.temp_max.toFixed()}&#176`;

    w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML=`${main.humidity}%`;
    w_wind.innerHTML=`${wind.speed} m/s`;
    w_pressure.innerHTML=`${main.pressure}`;
    w_sunrise.innerHTML= getTime(sys.sunrise, timezone);
    w_sunset.innerHTML= getTime(sys.sunset, timezone);

    w_forecast.innerHTML=weather[0].main;
    w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`
    } catch (error) {
        console.log(error);
    }
}





document.body.addEventListener("load", getWeatherData());