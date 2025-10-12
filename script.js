const apiKey = 'fc8f8b3a65684753896101951251210';
const baseUrl = 'https://api.weatherapi.com/v1';

const searchbar = document.querySelector('.search-bar');
const cityElement = document.querySelector('.location .city');
const dateElement = document.querySelector('.location .date');
const tempElement = document.querySelector('.current .temp');
const weatherElement = document.querySelector('.current .weather');
const hiLowElement = document.querySelector('.current .hi-low');

// Set current date
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = now.toLocaleDateString('en-US', options);

// Fetch weather data
async function fetchWeather(city = 'New York') {
    try {
        const response = await fetch(`${baseUrl}/current.json?key=${apiKey}&q=${city}&aqi=no`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
        searchbar.value = '';
    }
}

// Display weather data
function displayWeather(data) {
    const { location, current } = data;
    
    cityElement.textContent = `${location.name}, ${location.country}`;
    tempElement.innerHTML = `${Math.round(current.temp_c)}<span>°c</span>`;
    weatherElement.textContent = current.condition.text;
    
    // For hi-low, using current temp since current API doesn't provide min-max
    hiLowElement.textContent = `${Math.round(current.temp_c - 2)}°c / ${Math.round(current.temp_c + 2)}°c`;
    
    // Change background based on temperature
    changeBackground(current.temp_c);
}

// Change background based on temperature
function changeBackground(temp) {
    const body = document.body;
    
    if (temp > 30) {
        body.style.background = 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)';
    } else if (temp > 20) {
        body.style.background = 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)';
    } else if (temp > 10) {
        body.style.background = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)';
    } else {
        body.style.background = 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)';
    }
}

// Event listener for search
searchbar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchbar.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

// Load default city weather
fetchWeather();
