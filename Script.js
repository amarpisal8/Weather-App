const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-detail');

searchButton.addEventListener('click', () => {
  const apiKey = '98740f4ebc0d63bc0f8ba70090e5a091';
  const city = document.querySelector('.search-box input').value.trim(); // Trim leading/trailing spaces

  if (city === '') {
    return; // Handle empty city input
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(json => {
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temprature');
      const description = document.querySelector('.weather-box .description');
      const humiditySpans = document.querySelectorAll('.weather-detail .humidity span');
      const windSpans = document.querySelectorAll('.weather-detail .wind span');

      switch (json.weather[0].main.toLowerCase()) {
        case "clear":
          image.src = './images/clear.png';
          break;
        case "rain":
          image.src = './images/rain.png';
          break;
        case "snow":
          image.src = './images/snow.png';
          break;
        case "clouds":
          image.src = './images/cloud.png';
          break;
        case "mist":
        case "haze":
          image.src = './images/mist.png';
          break;
        default:
          image.src = '';
      }

      // Update weather information based on API response
      temperature.textContent = `${json.main.temp}°C`; // Use textContent for text updates
      description.textContent = json.weather[0].description;
      humiditySpans.forEach(span => span.textContent = `${json.main.humidity}%`);  // Update all humidity spans
      windSpans.forEach(span => span.textContent = `${json.wind.speed} m/s`);   // Update all wind spans
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      // Display an error message to the user (optional)
      weatherBox.textContent = "Error fetching weather data";  // Example error message display
    });
});
