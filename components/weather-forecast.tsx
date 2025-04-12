"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const WeatherForecast = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
          );
  
          if (!res.ok) {
            setLoading(false);
            Swal.fire("City Not Found", "Please enter a valid city", "error");
            return;
          }
  
          const data = await res.json();
          setWeather(data);
          setLoading(false);
        } catch (error) {
          console.log("Weather API error:", error);
          Swal.fire("Error", "Something went wrong while fetching weather.", "error");
          setLoading(false);
        }
      };
  
      fetchWeatherData();
    }
  }, [API_key, city]);
  

  const getWeatherData = async () => {
    const { value: userCity } = await Swal.fire({
      title: "Enter your city",
      input: "text",
      inputLabel: "City",
      inputPlaceholder: "Enter your city",
    });

    if (userCity) {
      setCity(userCity);
    }
  };

  return (
    <div className="text-5xl font-bold text-center border-2 max-w-7xl mx-auto min-h-screen m-10 rounded-3xl bg-emerald-200 px-10 bg-opacity-50">
      <p className="p-10">Get Weather Data</p>
      <hr className="border-black" />
      <p className="font-extralight text-sm">
        A weather forecast provides an outlook on atmospheric conditions over a specific period, using data from satellites, weather stations, and advanced computer models. It predicts factors such as temperature, precipitation, humidity, wind speed, and atmospheric pressure, helping individuals and communities prepare for varying weather events.
      </p>
      <button
        className="text-sm bg-teal-450 px-3 py-2 rounded-md hover:bg-teal-500 mt-4 mb-4"
        onClick={getWeatherData}
      >
        Get Weather Data
      </button>

      {loading && <p className="text-center text-2xl font-bold mt-8">Loading...</p>}

      {weather && (
        <div className="space-y-10 py-10 px-5 mt-10 mb-10 max-w-3xl mx-auto h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-gray-200">
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">City</p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">{weather.name}</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Humidity</p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">{weather?.main?.humidity}%</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Max Temperature</p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">{weather?.main?.temp_max} °C</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Min Temperature</p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">{weather?.main?.temp_min} °C</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Air Pressure</p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">{weather?.main?.pressure} hPa</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Wind Speed</p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">{weather?.wind?.speed} m/s</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Wind Direction</p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">{weather?.wind?.deg}°</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
