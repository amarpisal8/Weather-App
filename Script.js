const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-detail');

function isLight(color) {
  // Convert hex color to RGB
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);
  // Calculate luminance
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5; // If luminance is greater than 0.5, color is light
}

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
          container.style.background = "linear-gradient(to right bottom, #fddb92, #d1fdff)";
          image.src = './images/clear.png';
          break;
        case "rain":
          container.style.background = "linear-gradient(to right bottom, #cfd9df, #e2ebf0)";
          image.src = './images/rain.png';
          break;
        case "snow":
          container.style.background = "linear-gradient(to right bottom, #e0eafc, #cfdef3)";
          image.src = './images/snow.png';
          break;
        case "clouds":
          container.style.background = "linear-gradient(to right bottom, #bdc3c7, #2c3e50)";
          image.src = './images/cloud.png';
          break;
        case "mist":
        case "haze":
          container.style.background = "linear-gradient(to right bottom, #e0eafc, #cfdef3)";
          image.src = './images/mist.png';
          break;
        default:
          container.style.background = "linear-gradient(to right bottom, #fddb92, #d1fdff)";
          image.src = '';
      }

      // Update font color based on background color
      const backgroundColor = getComputedStyle(container).backgroundColor;
      const fontColor = isLight(backgroundColor) ? 'black' : 'white';
      container.style.color = fontColor;

      // Update weather information based on API response
      temperature.textContent = `${json.main.temp}°C`; // Use textContent for text updates
      description.textContent = json.weather[0].description;
      humiditySpans.forEach(span => span.textContent = `${json.main.humidity}%`);  // Update all humidity spans
      windSpans.forEach(span => span.textContent = `${json.wind.speed} m/s`);   // Update all wind spans
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      // Display an error message to the user (optional)
      weatherBox.textContent = "Enter Valid City Name";  // Example error message display
    });
});
