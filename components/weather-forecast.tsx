"use client"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const WeatherForecast = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const API_key = 'c24ebb344096854386380018f34db72c';
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`,
      );
      const data = await res.json();
      setWeather(data);
      console.log("Weather data:", data);
      setLoading(false)
    } catch (error) {
      console.log("Weather API error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const getWeatherData = async () => {
    const { value: userCity } = await Swal.fire({
      title: "Enter your city",
      input: "text",
      inputLabel: "City",
      inputPlaceholder: "Enter your city",
    });

    if (userCity) {
      setCity(userCity);
      setLoading(true);
      await fetchWeatherData();
      setLoading(false)
    }
  }



  return (
    <div className="text-5xl font-bold text-center border-2 max-w-7xl mx-auto min-h-screen m-10 rounded-3xl bg-emerald-200 px-10 bg-opacity-50">
      <p className="p-10 ">Weather Forecast</p>
      <hr className="border-black" />
      <p className="font-extralight text-sm">A weather forecast provides an outlook on atmospheric conditions over a specific period, using data from satellites, weather stations, and advanced computer models. It predicts factors such as temperature, precipitation, humidity, wind speed, and atmospheric pressure, helping individuals and communities prepare for varying weather events. Forecasts can range from short-term predictions, which are generally accurate within a few days, to long-term seasonal outlooks, although accuracy decreases over time. Reliable weather forecasts are crucial for planning daily activities, managing agricultural operations, and ensuring public safety in cases of severe weather.</p>
      <button className="text-sm bg-teal-450 px-3 py-2 rounded-md hover:bg-teal-500 mt-4 mb-4" onClick={getWeatherData}>Get Recommendation</button>
      {
        loading && <p className="text-center text-2xl font-bold mt-8">Loading...</p>
      }
      {
        weather && (
          <div className="space-y-10 py-10 px-5 mt-10 mb-10 max-w-3xl mx-auto h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-gray-200">
            <div className="flex justify-between items-center text-xl font-light ">
              <p className="w-1/3">City </p>
              <hr className="border-black border-1 w-1/3" />
              <p className="w-1/3">{weather.name}</p>
            </div>
            <div className="flex justify-between items-center text-xl font-light">
              <p className="w-1/3">Humidity </p>
              <hr className="border-black border-1 w-1/3" />
              <p className="w-1/3">{weather?.main?.humidity}%</p>
            </div>
            <div className="flex justify-between items-center text-xl font-light">
              <p className="w-1/3">Max Temperature </p>
              <hr className="border-black border-1 w-1/3" />
              <p className="w-1/3">{weather?.main?.temp_max} K</p>
            </div>
            <div className="flex justify-between items-center text-xl font-light">
              <p className="w-1/3">Min Temperature </p>
              <hr className="border-black border-1 w-1/3" />
              <p className="w-1/3">{weather?.main?.temp_min} K</p>
            </div>
            <div className="flex justify-between items-center text-xl font-light">
              <p className="w-1/3">Air pressure </p>
              <hr className="border-black border-1 w-1/3" />
              <p className="w-1/3">{weather?.main?.pressure} Hg</p>
            </div>
            <div className="flex justify-between items-center text-xl font-light">
              <p className="w-1/3">Air speed </p>
              <hr className="border-black border-1 w-1/3" />
              <p className="w-1/3">{weather?.wind?.speed} ml/hr</p>
            </div>
            <div className="flex justify-between items-center text-xl font-light">
              <p className="w-1/3">Air speed angle </p>
              <hr className="border-black border-1 w-1/3" />
              <p className="w-1/3">{weather?.wind?.degree} deg</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default WeatherForecast;
