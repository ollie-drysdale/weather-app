async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '31f8ca9a430da08e70faf4626fb35bfb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            document.getElementById('weatherResult').innerHTML = `
            <h2>${city}</h2>
            <p><img src="${iconUrl}" alt="weather icon" /></p>
            <p>Temperature: ${temp}°C</p?
            <p>${description}</p>
            `;
        } else {
            document.getElementById('weatherResult').innerHTML = `<p>City not found.</p>`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather.</p>`;
    }
}