"use client";

import dynamic from "next/dynamic";
import { AiChatSession } from "@/lib/gemini-config";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CropRecommendation = () => {
  const [city, setCity] = useState("Dhaka");
  const [prompt, setPrompt] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [recommendedCrop, setRecommendedCrop] = useState<any>(null);

  const RecommendLottie = dynamic(
    () => import("@/components/home/home-components/banner-lottie").then(mod => mod.RecommendLottie),
    { ssr: false }
  );

  const API_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    if (!city) return;

    const fetchWeatherData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
        );
        const data = await res.json();

        if (!res.ok) {
          Swal.fire("City Not Found", "Please enter a valid city", "error");
          return;
        }

        setWeather(data);

        const newPrompt = `You are an AI assistant for crop recommendations. Here is the weather data: temperature=${data.main.temp}°C, humidity=${data.main.humidity}%, pressure=${data.main.pressure} hPa. Provide only a JSON response with fields: "cropName", "cropDescription", "plantingProcedure", "precautions". Do not add any additional text like "heres the information" or "here's the json file without text" with the result. just give the json and no text before or after.`;

        setPrompt(newPrompt);

        console.log("Weather data:", data);
      } catch (error) {
        console.log("Weather API error:", error);
        Swal.fire("Error", "Failed to fetch weather data.", "error");
      }
    };

    fetchWeatherData();
  }, [API_key, city]);

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
          try {
            const cropData = JSON.parse(jsonData);
            const recommendedCrop = {
              cropName: cropData.cropName,
              cropDescription: cropData.cropDescription,
              plantingProcedure: cropData.plantingProcedure,
              precautions: cropData.precautions,
            };
            setRecommendedCrop(recommendedCrop);
            console.log("Recommended Crop:", recommendedCrop);
          } catch (parseError) {
            console.error("Failed to parse AI JSON:", parseError);
            Swal.fire("Error", "AI response is not in valid JSON format.", "error");
          }
        } else {
          console.error("No valid JSON text found in AI response:", jsonData);
          Swal.fire("Error", "No valid data found in AI response.", "error");
        }
      } catch (error: any) {
        console.log("Error in crop recommendation:", error.message);
        Swal.fire("Error", "Something went wrong while getting the recommendation.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-20 relative">
      <Link className="absolute top-6 left-6" href={'/'}>
        <div className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300 bg-gray-200 rounded-md">
          <ArrowLeft color="red" size={30} />
        </div>
      </Link>

      <div>
        <RecommendLottie />
      </div>

      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl text-center font-bold text-teal-500">CROP RECOMMENDATION</h2>
        <p className="text-center text-sm text-gray-600 mt-2 max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel molestiae eaque sit? Similique aliquam, animi ipsa explicabo commodi, accusantium laborum enim, minus maxime molestias consequatur sunt.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <div className="max-w-2xl flex flex-col items-center">
            <button className="text-sm bg-teal-450 px-3 py-2 rounded-md hover:bg-teal-500" onClick={getCropRecommendation}>
              Get Recommendation
            </button>

            {loading ? (
              <p className="mt-4">Loading...</p>
            ) : recommendedCrop ? (
              <div className="flex flex-col items-center mt-4">
                <div className="p-3 space-y-2 border-2 border-green-500">
                  <p className="text-sm text-green-600">Temp: {weather?.main?.temp}°C</p>
                  <p className="text-sm text-green-600">Humidity: {weather?.main?.humidity}%</p>
                  <p className="text-sm text-green-600">Pressure: {weather?.main.pressure} hPa</p>
                </div>
                <div className="mt-5 space-y-2">
                  <h2><span className="font-semibold">Recommended Crop:</span> <span className="text-gray-600">{recommendedCrop.cropName}</span></h2>
                  <p className="text-gray-700">{recommendedCrop.cropDescription}</p>
                  <p><span className="font-semibold">Planting Procedure:</span> <span className="text-gray-600">{recommendedCrop.plantingProcedure}</span></p>
                  <p><span className="font-semibold">Precautions:</span> <span className="text-gray-600">{recommendedCrop.precautions}</span></p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
