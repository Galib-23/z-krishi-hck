"use client";

import { useEffect, useRef, useState } from "react";

const DetectVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [classifier, setClassifier] = useState<any>(null);
  const [disease, setDisease] = useState<string | null>(null);
  const [isVidStarted, setIsVidStarted] = useState(false);
  const [diseaseInfo, setDiseaseInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    const getDiseaseInfo = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/diseases?diseaseName=${disease}`);
        if (!res.ok) {
          console.log("Erorr in getting disease info..")
        }
        const data = await res.json();
        setDiseaseInfo(data);
        setLoading(false);
        console.log(data)
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    if (disease) {
      getDiseaseInfo();
    }
  }, [disease]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const ml5Module = await import("ml5");
        const loadedClassifier = await ml5Module.imageClassifier("https://teachablemachine.withgoogle.com/models/p_cqpug2b/model.json");
        setClassifier(loadedClassifier);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadModel();
  }, []);

  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream as MediaStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              setIsVidStarted(true);
              classifyDisease();
            };
          }
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
        });
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsVidStarted(false);
    setDisease(null);
    setDiseaseInfo(null);
  };

  const classifyDisease = () => {
    if (classifier && videoRef.current) {
      classifier.classify(videoRef.current, (error: any, results: any) => {
        if (error) {
          console.error("Classification error:", error);
          return;
        }
        setDisease(results[0].label);
        setConfidence(results[0].confidence);
        setTimeout(() => classifyDisease(), 1000);
      });
    }
  };


  return (
    <div className="flex flex-col sm:flex-row sm:justify-evenly gap-4 sm:gap-8 p-4 bg-gray-100 min-h-screen mt">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Disease Detection</h1>
        <video
          ref={videoRef}
          width={600}
          height={580}
          className="border-2 border-cyan-600 rounded-xl mb-4"
          autoPlay
          muted
        />
        {isVidStarted ? (
          <button
            onClick={stopVideo}
            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
          >
            Stop Detection
          </button>
        ) : (
          <button
            onClick={startVideo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
          >
            Start Detection
          </button>
        )}
      </div>
      {
        disease && (
          <div className="max-w-2xl mt-12">
            {disease && confidence > .9 ? (
              <div className=" p-4 bg-white rounded-md shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold">Detected Disease:</h2>
                <p className="text-lg text-green-700 font-bold">{disease}</p>
              </div>
            ) : disease && (
              <div className="flex items-center justify-center text-2xl text-red-600 font-bold">
                No Leaves found
              </div>
            )
            }
            {
              loading && (
                <div className="flex justify-center items-center">
                  <p className="text-4xl text-center font-semibold">Loading...</p>
                </div>
              )
            }
            {
              diseaseInfo && confidence > .9 && disease !== "normal" && (
                <div className="mt-5 border-2 rounded-md border-green-500 p-3">
                  <p className="font-semibold text-xl text-gray-800"><span className="text-green-700">{disease?.toUpperCase()}</span> Description:</p>
                  <p className="text-xs mt-1 text-gray-600">{diseaseInfo.diseaseDescription}</p>
                  <p className="font-semibold text-xl text-gray-800 mt-4">Cure:</p>
                  <p className="text-xs mt-1 text-gray-600">{diseaseInfo.cure}</p>
                  <p className="font-semibold text-xl text-gray-800 mt-4">Prevention:</p>
                  <p className="text-xs mt-1 text-gray-600">{diseaseInfo.prevention}</p>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default DetectVideo;
