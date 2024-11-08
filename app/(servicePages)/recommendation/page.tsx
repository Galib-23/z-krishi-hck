"use client";

import { AiChatSession } from "@/lib/gemini-config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CropRecommendation = () => {
  const [city, setCity] = useState("Dhaka");
  const [prompt, setPrompt] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [recommendedCrop, setRecommendedCrop] = useState<any>(null);

  const API_key = "c24ebb344096854386380018f34db72c";

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`,
      );
      const data = await res.json();
      setWeather(data);
      if (res.ok) {
        setPrompt(`You are an AI assistant for crop recommendations. Here is the weather data: temperature=${weather?.main?.temp}K, humidity=${weather?.main?.humidity}%, pressure=${weather?.main.pressure}. Provide only a JSON response with fields: "cropName", "cropDescription", "plantingProcedure", "precautions". Do not add any additional text like "heres the information" or "here's the json file without text" with the result. just give the json and no text before or after`);

      }
      console.log("Weather data:", data);
    } catch (error) {
      console.log("Weather API error:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city])

  const getCropRecommendation = async () => {
    const { value: userCity } = await Swal.fire({
      title: "Enter your city",
      input: "text",
      inputLabel: "City",
      inputPlaceholder: "Enter your city",
    });

    if (userCity) {
      setCity(userCity);
      setLoading(true);

      try {
        const result: any = await AiChatSession.sendMessage("Description: " + prompt);
        console.log("Full AI Response:", result);

        const jsonData = result?.response?.text();

        console.log("Extracted AI Response Text:", jsonData);

        if (jsonData) {
          const cropData = JSON.parse(jsonData);
          const recommendedCrop = {
            cropName: cropData.cropName,
            cropDescription: cropData.cropDescription,
            plantingProcedure: cropData.plantingProcedure,
            precautions: cropData.precautions,
          };
          setRecommendedCrop(recommendedCrop);
          console.log("Recommended Crop:", recommendedCrop);
        } else {
          console.error("No valid JSON text found in AI response:", jsonData);
        }
      } catch (error: any) {
        console.log("Error in crop recommendation:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <button onClick={getCropRecommendation}>Get Recommendation</button>
      {loading ? (
        <p>Loading...</p>
      ) : recommendedCrop ? (
        <div>
          <h2>Recommended Crop: {recommendedCrop.cropName}</h2>
          <p>{recommendedCrop.cropDescription}</p>
          <p>Planting Procedure: {recommendedCrop.plantingProcedure}</p>
          <p>Precautions: {recommendedCrop.precautions}</p>
        </div>
      ) : null}
    </div>
  );
};

export default CropRecommendation;
