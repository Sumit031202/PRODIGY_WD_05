const apiKey = "9c3d90ea7adf9ba769cb7efccb9bd081"; // Replace with your OpenWeatherMap API key
const searchBtn = document.querySelector("button");
const cityInput = document.querySelector("input");
const weatherBox = document.querySelector(".weather-box");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const { name, sys, main, weather } = data;

    weatherBox.innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
      <p><strong>Condition:</strong> ${weather[0].main}</p>
      <p><strong>Description:</strong> ${weather[0].description}</p>
    `;
  } catch (err) {
    weatherBox.innerHTML = `<p>❌ ${err.message}</p>`;
  }
});
