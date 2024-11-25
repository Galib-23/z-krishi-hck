"use client";

import Lottie from 'lottie-react'
import { steps } from "@/constants/seeds";
import { useState } from "react";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const Simulate = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const totalDays = steps.length;

  const nextDay = () => {
    if (currentDayIndex < totalDays - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const prevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const currentStep = steps[currentDayIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Link href={'/learn?tab=simulation'}>
        <div className="px-4 w-14 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 rounded-md">
          <ArrowLeft color="red" size={20} />
        </div>
      </Link>
      <h2 className="text-2xl text-center underline font-semibold text-teal-500 mb-4">
        Simulate How to Farm Tomato 💻
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 min-h-[80vh] object-cover">
        {/* Left Section: Image */}
        <div className="col-span-4 flex justify-center items-center border border-teal-500 rounded-md p-4 bg-white">
          <div className="md:w-[650px]">
            <Lottie className='h-[60vh]' animationData={currentStep.animation} loop={true} />
          </div>
        </div>

        {/* Right Section: Task Details */}
        <div className="sm:col-span-2 border border-purple-600 rounded-md p-5 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-semibold text-teal-600">
              Day {currentStep.day}: {currentStep.stage}
            </h3>
            <h2 className='text-xl text-gray-700 font-semibold mt-4'>Task: </h2>
            <p className="text-gray-500 text-sm">{currentStep.tasks}</p>
            <h2 className='text-xl text-gray-700 font-semibold mt-2'>Precautions: </h2>
            <p className="text-gray-500 text-sm">{currentStep.precautions}</p>
            <h2 className='text-xl text-gray-700 font-semibold mt-2'>Expected Outcome: </h2>
            <p className="text-gray-500 text-sm">{currentStep.expectedOutcome}</p>
            <h2 className='text-xl text-gray-700 font-semibold mt-2'>Tools: </h2>
            <ul>
              {
                currentStep.tools.map((tool, idx) => (
                  <li key={idx} className='text-gray-500 text-sm'># {tool}</li>
                ))
              }
            </ul>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevDay}
              disabled={currentDayIndex === 0}
              className={`px-4 py-2 rounded-md bg-teal-500 text-white font-medium ${currentDayIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              Previous
            </button>
            <button
              onClick={nextDay}
              disabled={currentDayIndex === totalDays - 1}
              className={`px-4 py-2 rounded-md bg-purple-600 text-white font-medium ${currentDayIndex === totalDays - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulate;
