document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;
    fetchWeather(city);
});

function fetchWeather(city) {
    const apiKey = "e626ac138781a789351e65806e5c22ea";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ID}&appid=${e626ac138781a789351e65806e5c22ea}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const weatherInfo = `Cuaca: ${weatherDescription}, Suhu: ${temperature}°C`;
            document.getElementById("weather-info").textContent = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById("weather-info").textContent = 'Gagal memuat informasi cuaca';
        });
}