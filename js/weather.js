const apikey = "28fd15358cdecbc1a1dfef367e71acef"
weatherapi = "https://api.openweathermap.org/data/2.5/"
city = document.getElementById('city')

//Default city
doAPICall("Chicago")

handleSubmit=()=>{
    let inputCity = document.getElementById('city').value;
    let response = doAPICall(inputCity);
}

function doAPICall(inputCity) {
    fetch(`${weatherapi}weather?q=${inputCity}&units=metric&appid=${apikey}`)
        .then(response => {
            return response.json();
        }).then(displayData);
}

function displayData(response) {
    const city = document.querySelector(".city");
    city.innerText = `${response.name}, ${response.sys.country}`;

    const today = new Date();
    const date = document.querySelector(".date");
    date.innerText = dateFunction(today);

    const temp = document.querySelector(".temp");
    temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

    const weather = document.querySelector(".weather");
    weather.innerText = `Weather: ${response.weather[0].main}`;

    const humidity = document.querySelector(".humidity");
    humidity.innerText = `Humidity: ${response.main.humidity}%`;

    const tempRange = document.querySelector(".temp-range");
    tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

    wimage = document.getElementById("weather-img")
    const weatherIcon = document.querySelector(".weather-icon");
    const iconURL = "http://openweathermap.org/img/w/";
    weatherIcon.src = iconURL + response.weather[0].icon + ".png";
       
    weatherIcon.src = getWeatherIcon(response.weather[0].main)

    city.value = "";
    
}

function getWeatherIcon(type){
    type = type.toLowerCase()
    if(type == "sunny" || type == "clear")
        return "/images/sunny.png"
    else if(type == "haze" || type == "cloudy" || type == "clouds")
        return "/images/cloudy.png"
    else if(type == "partly-sunny" || type == "partly-cloudy")
        return "/images/partly-cloudy.jpg"
    else if(type == "rainy")
        return "/images/rainy.jpg"
    else if(type == "mist")
        return "/images/mist.jpg"

}

function dateFunction(d){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}