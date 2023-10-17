import React, { useState } from "react";
const api = {
  key: "6173aff54605f7245aae3c49f7c6a471",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} , ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.weather[0].main === "Sunny" ||
            (weather.weather[0].main === "Clear" && weather.main.temp > 33)
            ? "App warm"
            : (weather.weather[0].main === "Mist" ||
                weather.weather[0].main === "Haze" ||
                weather.weather[0].main === "Clouds") &&
              weather.main.temp <= 33 &&
              weather.main.temp >= 18
            ? "App cloud"
            : weather.main.temp < 18
            ? "App cold"
            : "App spring"
          : "App spring"
      }
    >
      <main>
        <p className="header">WEATHER ☀️</p>
        <div className="searchBox">
          <input
            type="text"
            className="searchBar"
            placeholder="🔍 Search Location :)"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="locationBox">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weatherBox">
              <div className="temp">{Math.round(weather.main.temp)}° C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          <div>
            <div className="text"></div>
          </div>
        )}
        <footer>
          Made by{" "}
          <a href="https://bento.me/anish7" target="__blank">
            ANISH
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
