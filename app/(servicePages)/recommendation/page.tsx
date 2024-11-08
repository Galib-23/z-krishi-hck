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

  const API_key = 'c24ebb344096854386380018f34db72c';

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
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl text-center font-bold text-teal-500">CROP RECOMMENDATION</h2>
      <p className="text-center text-sm text-gray-600 mt-2 max-w-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel molestiae eaque sit? Similique aliquam, animi ipsa explicabo commodi, accusantium laborum enim, minus maxime molestias consequatur sunt.</p>
      <div className="mt-8 flex flex-col items-center">
        <div className="max-w-2xl flex
        flex-col items-center">
          <button className="text-sm bg-teal-450 px-3 py-2 rounded-md hover:bg-teal-500" onClick={getCropRecommendation}>Get Recommendation</button>
          {loading ? (
            <p>Loading...</p>
          ) : recommendedCrop ? (
            <div className="flex flex-col items-center mt-3">
              <div className="p-3 space-y-2 border-2 border-green-500">
                <p className="text-sm text-green-600">Temp: {weather?.main?.temp}K</p>
                <p className="text-sm text-green-600">Hum: {weather?.main?.humidity}%</p>
                <p className="text-sm text-green-600">Pressure: {weather?.main.pressure} mm Hg</p>
              </div>
              <div className="mt-5 space-y-2">
                <h2><span className="font-semibold">Recommended Crop:</span> <span className="text-gray-600">{recommendedCrop.cropName}</span></h2>
                <p className="text-gray-700 ">{recommendedCrop.cropDescription}</p>
                <p className=""><span className="font-semibold">Planting Procedure:</span> <span className="text-gray-600">{recommendedCrop.plantingProcedure}</span></p>
                <p className=""><span className="font-semibold">Precautions:</span><span className="text-gray-600">{recommendedCrop.precautions}</span></p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
