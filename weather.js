async function getWeather() {
  const city = document.getElementById("city").value.trim(); // removes spaces
  const apiKey = "YOUR_API_KEY"; // 🔹 Replace this with your real key

  if (!city) {
    document.getElementById("weather-result").innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Weather API Response:", data); // for debugging

    if (data.cod == 200) {
      document.getElementById("weather-result").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>☁ Weather: ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
      `;
    } else {
      document.getElementById("weather-result").innerHTML = "<p>❌ City not found. Check spelling!</p>";
    }
  } catch (error) {
    document.getElementById("weather-result").innerHTML = "<p>⚠️ Error fetching weather data.</p>";
    console.error("Error:", error);
  }
}
