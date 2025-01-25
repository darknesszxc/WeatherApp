import { useEffect, useState } from "react";
import WeatherIconDescription from "./WeatherIconDescription";
function WeatherDisplay({ cityName, weatherInfo, isLocationBased }) {
  const [displayParameters, setDisplayParameters] = useState([]);
  const [localTime, setLocalTime] = useState(null);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("weatherSettings"));
    setDisplayParameters(
      settings || ["temp", "feels_like", "humidity", "sunrise", "sunset"]
    );

    const currentLocalTime = new Date(
      (weatherInfo.dt + weatherInfo.timezone) * 1000
    );
    setLocalTime(
      currentLocalTime.toLocaleString("ru-RU", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [weatherInfo]);

  const { temp, feels_like, humidity } = weatherInfo.main;
  const { sunset, sunrise } = weatherInfo.sys;

  const timezoneOffset = weatherInfo.timezone;

  const weatherDescription = weatherInfo.weather[0].description;
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;

  function formatUnixTime(unixTime, timezoneOffset) {
    const date = new Date((unixTime + timezoneOffset) * 1000);
    return date.toLocaleString("ru-RU", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col w-[80%] justify-center border p-[16px] rounded-2xl mt-6">
      <div className=" text-[15px] font-bold md:text-[20px] ">
        {localTime && <p>Последнее обновление данных: {localTime}</p>}
        {isLocationBased ? (
          <h1>Текущее местоположение: {cityName}</h1>
        ) : (
          <h1>Город: {cityName}</h1>
        )}
      </div>

      <div className="mt-5 flex flex-col ">
        <div className="flex w-full items-center ">
          {weatherIcon && (
            <img
              src={weatherIcon}
              alt={weatherDescription}
              className="w-[60px] h-[60px]"
            />
          )}

          <WeatherIconDescription weatherId={weatherInfo.weather[0].id} />
          {displayParameters.includes("temp") && (
            <p className="font-bold">{temp}°C</p>
          )}
        </div>
        <div className="border-l-2 p-4 border-orange-400">
          {displayParameters.includes("feels_like") && (
            <p>Ощущается как: {feels_like}°C</p>
          )}
          {displayParameters.includes("sunrise") && (
            <p>Время рассвета: {formatUnixTime(sunrise, timezoneOffset)}</p>
          )}
          {displayParameters.includes("sunset") && (
            <p>Время заката: {formatUnixTime(sunset, timezoneOffset)}</p>
          )}
          {displayParameters.includes("humidity") && (
            <p>Влажность: {humidity}%</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
