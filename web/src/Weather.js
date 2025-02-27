import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9eaf097452ce05951c8c387e032b4295`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const styles = {
    container: {
      marginTop: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      backgroundColor: "#f9f9f9",
      maxWidth: "600px",
      margin: "20px auto",
      textAlign: "center",
    },
    form: {
      marginBottom: "20px",
    },
    input: {
      padding: "8px",
      marginRight: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    button: {
      padding: "8px 16px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "#fff",
      borderRadius: "4px",
      cursor: "pointer",
    },
    cityName: {
      fontSize: "1.5em",
      marginBottom: "20px",
    },
    dataContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
    },
    column: {
      flex: 1,
      margin: "5px 0",
      border: "1px solid #ddd",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "10px",
    },
    dataBlock: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    icon: {
      width: "50px",
      height: "50px",
      marginRight: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button style={styles.button} type="submit">
          Get Weather
        </button>
      </form>
      {weatherData ? (
        <>
          <h2 style={styles.cityName}>{weatherData.name}</h2>
          <div style={styles.dataContainer}>
            <div style={styles.column}>
              <div style={styles.dataBlock}>
                <img
                  style={styles.icon}
                  src="https://img.icons8.com/?size=100&id=48808&format=png&color=000000"
                  alt="Temperature icon"
                />
                <p>
                  <strong>Temperature:</strong>{" "}
                  {(weatherData.main.temp - 273.15).toFixed(2)}°C
                </p>
              </div>
              <div style={styles.dataBlock}>
                <img
                  style={styles.icon}
                  src="https://img.icons8.com/?size=100&id=HmG1jwKEJyxC&format=png&color=000000"
                  alt="Description icon"
                />
                <p>
                  <strong>Description:</strong>{" "}
                  {weatherData.weather[0].description}
                </p>
              </div>
              <div style={styles.dataBlock}>
                <img
                  style={styles.icon}
                  src="https://img.icons8.com/?size=100&id=1414&format=png&color=000000"
                  alt="Feels like icon"
                />
                <p>
                  <strong>Feels like:</strong>{" "}
                  {(weatherData.main.feels_like - 273.15).toFixed(2)}°C
                </p>
              </div>
            </div>
            <div style={styles.column}>
              <div style={styles.dataBlock}>
                <img
                  style={styles.icon}
                  src="https://img.icons8.com/?size=100&id=9250&format=png&color=000000"
                  alt="Humidity icon"
                />
                <p>
                  <strong>Humidity:</strong> {weatherData.main.humidity}%
                </p>
              </div>
              <div style={styles.dataBlock}>
                <img
                  style={styles.icon}
                  src="https://img.icons8.com/?size=100&id=9447&format=png&color=000000"
                  alt="Pressure icon"
                />
                <p>
                  <strong>Pressure:</strong> {weatherData.main.pressure}
                </p>
              </div>
              <div style={styles.dataBlock}>
                <img
                  style={styles.icon}
                  src="https://img.icons8.com/?size=100&id=31842&format=png&color=000000"
                  alt="Wind speed icon"
                />
                <p>
                  <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
