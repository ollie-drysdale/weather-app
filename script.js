let isCelsius = true;
let currentTempC = null;

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '31f8ca9a430da08e70faf4626fb35bfb'; // Replace this with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      currentTempC = data.main.temp;

      document.getElementById('temperature').innerText = `${Math.round(currentTempC)}°C`;
      document.getElementById('description').innerText = toTitleCase(data.weather[0].description);
      document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById('wind').innerText = `Wind: ${data.wind.speed} m/s`;
    })
    .catch(error => {
      document.getElementById('weatherResult').innerText = 'Could not fetch weather.';
      console.error(error);
    });
}

document.getElementById('toggle-temp').addEventListener('click', () => {
  if (currentTempC === null) return;

  isCelsius = !isCelsius;

  const displayTemp = isCelsius
    ? `${Math.round(currentTempC)}°C`
    : `${Math.round((currentTempC * 9) / 5 + 32)}°F`;

  document.getElementById('temperature').innerText = displayTemp;
  document.getElementById('toggle-temp').innerText = isCelsius
    ? 'Switch to °F'
    : 'Switch to °C';
});
