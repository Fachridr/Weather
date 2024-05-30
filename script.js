async function fetchData() {
    let searchCity = 'garut'
    let apiKey = `e626ac138781a789351e65806e5c22ea`
    const responseOpenWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`)
    const responseOpenWeatherJson = await responseOpenWeather.json()
    console.log(responseOpenWeatherJson, "<< response Open Weather Json")

    let lat = responseOpenWeatherJson.coord.lat;
    let lon = responseOpenWeatherJson.coord.lon;
    
    const responseOpenMeteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`)
    const responseOpenMeteoJson = await responseOpenMeteo.json()
    console.log(responseOpenMeteoJson, "<< response Open Meteo Json")
}

fetchData()