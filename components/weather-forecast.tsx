const WeatherForecast = () => {
    return (
      <div className="text-5xl font-bold text-center border-2 max-w-7xl mx-auto min-h-screen m-10 rounded-3xl bg-emerald-200 px-10 bg-opacity-50">
        <p className="p-10 ">Weather Cast</p>
        <hr className="border-black" />
        <p className="font-extralight text-sm">A weather forecast provides an outlook on atmospheric conditions over a specific period, using data from satellites, weather stations, and advanced computer models. It predicts factors such as temperature, precipitation, humidity, wind speed, and atmospheric pressure, helping individuals and communities prepare for varying weather events. Forecasts can range from short-term predictions, which are generally accurate within a few days, to long-term seasonal outlooks, although accuracy decreases over time. Reliable weather forecasts are crucial for planning daily activities, managing agricultural operations, and ensuring public safety in cases of severe weather.</p>
        <div className="space-y-10 py-10 px-5 mt-10 mb-10 max-w-3xl mx-auto h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-gray-200">
          <div className="flex justify-between items-center text-xl font-light ">
            <p className="w-1/3">City </p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">Dhaka</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Humidity </p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">75%</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Max Temperature </p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">40 C</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Min Temperature </p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">20 C</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Air pressure </p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">400 Hg</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Air speed </p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">4.00 ml/hr</p>
          </div>
          <div className="flex justify-between items-center text-xl font-light">
            <p className="w-1/3">Air speed angle </p>
            <hr className="border-black border-1 w-1/3" />
            <p className="w-1/3">4.00 deg</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherForecast;
  