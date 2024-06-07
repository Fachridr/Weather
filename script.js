document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-city').addEventListener('click', () => {
        const cityName = document.getElementById('city-input').value;
        if (cityName) {
            getCoordinates(cityName).then(coords => {
                if (coords) {
                    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
                    document.getElementById('city-name').textContent = cityName;
                    fetchWeatherData(apiUrl);
                } else {
                    alert('Kota tidak ditemukan');
                }
            });
        } else {
            alert('Masukkan nama kota');
        }
    });
});

function getCoordinates(cityName) {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=id&format=json`;
    console.log(`Geocoding URL: ${geocodingUrl}`);
    return fetch(geocodingUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Geocoding response data:', data);
            if (data.results && data.results.length > 0) {
                return {
                    latitude: data.results[0].latitude,
                    longitude: data.results[0].longitude
                };
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching coordinates:', error);
            return null;
        });
}

function fetchWeatherData(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            const forecast = data.daily;
            const weatherContainer = document.getElementById('weather-forecast');
            weatherContainer.innerHTML = ''; 

            forecast.time.forEach((date, index) => {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');

                const formattedDate = new Date(date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                const weatherCode = getWeatherDescription(forecast.weather_code[index]);
                const tempMax = forecast.temperature_2m_max[index];
                const tempMin = forecast.temperature_2m_min[index];
                const weatherIcon = getWeatherIcon(forecast.weather_code[index]);

                dayDiv.innerHTML = `
                    <div class="date">${formattedDate}</div>
                    <i class="wi ${weatherIcon} weather-icon"></i>
                    <div class="weather-code">${weatherCode}</div>
                    <div class="temp">Suhu Maks: ${tempMax}°C</div>
                    <div class="temp">Suhu Min: ${tempMin}°C</div>
                `;

                weatherContainer.appendChild(dayDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherContainer = document.getElementById('weather-forecast');
            weatherContainer.innerHTML = '<p>Gagal mengambil data cuaca.</p>';
        });
}

function getWeatherDescription(code) {
    const weatherDescriptions = {
        0: 'Langit cerah',
        1: 'Cerah sebagian',
        2: 'Sebagian berawan',
        3: 'Berawan',
        45: 'Kabut',
        48: 'Kabut membeku',
        51: 'Gerimis ringan',
        53: 'Gerimis sedang',
        55: 'Gerimis lebat',
        56: 'Gerimis beku ringan',
        57: 'Gerimis beku lebat',
        61: 'Hujan ringan',
        63: 'Hujan sedang',
        65: 'Hujan lebat',
        66: 'Hujan beku ringan',
        67: 'Hujan beku lebat',
        71: 'Salju ringan',
        73: 'Salju sedang',
        75: 'Salju lebat',
        77: 'Butiran salju',
        80: 'Hujan badai ringan',
        81: 'Hujan badai sedang',
        82: 'Hujan badai berat',
        85: 'Hujan salju ringan',
        86: 'Hujan salju lebat',
        95: 'Badai petir',
        96: 'Badai petir dengan hujan es ringan',
        99: 'Badai petir dengan hujan es lebat'
    };

    return weatherDescriptions[code] || 'Cuaca tidak diketahui';
}

function getWeatherIcon(code) {
    const weatherIcons = {
        0: 'wi-day-sunny',
        1: 'wi-day-sunny-overcast',
        2: 'wi-day-cloudy',
        3: 'wi-cloudy',
        45: 'wi-fog',
        48: 'wi-fog',
        51: 'wi-sprinkle',
        53: 'wi-sprinkle',
        55: 'wi-sprinkle',
        56: 'wi-rain-mix',
        57: 'wi-rain-mix',
        61: 'wi-rain',
        63: 'wi-rain',
        65: 'wi-rain',
        66: 'wi-rain-mix',
        67: 'wi-rain-mix',
        71: 'wi-snow',
        73: 'wi-snow',
        75: 'wi-snow',
        77: 'wi-snow',
        80: 'wi-showers',
        81: 'wi-showers',
        82: 'wi-showers',
        85: 'wi-snow',
        86: 'wi-snow',
        95: 'wi-thunderstorm',
        96: 'wi-thunderstorm',
        99: 'wi-thunderstorm'
    };

    return weatherIcons[code] || 'wi-na';
}