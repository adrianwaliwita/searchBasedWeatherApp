const apiKey =  "1492091b9e60e4cf31fe3f87ba7dc9e9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weatherIcon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appID=${apiKey}`)
    if(response.status == 404)
    {
        document.querySelector(".weather").style.display = "none"
        document.querySelector(".error").style.display = "block"
    } 
    else
    {

    let data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round (data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "clouds"){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
    }

    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none"

    }



};

function handleWeatherCheck() {
    // Using trim() to remove whitespace from both ends of the string.
    if (searchBox.value.trim() === "") {
        alert("Please enter a city name before searching!");
        // If you have a specific element where you'd like to display the error message, 
        // you can modify its innerHTML/textContent or add a class to it, etc.
    } else {
        checkWeather(searchBox.value);
    }
}

// Event listener for "Enter" key in the searchBox
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleWeatherCheck();
    }
});

// Event listener for button click
searchBtn.addEventListener("click", handleWeatherCheck);