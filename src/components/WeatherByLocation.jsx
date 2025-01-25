import { useEffect, useState } from "react";
import WeatherDisplay from "./WeatherDisplay";

function WeatherByLocation(isLocationBased) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Ошибка получения местоположения:", error);
        setError(true);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=5929ee68635710a2fe163e14881274a1&units=metric&lang=ru`;
      const URL_CITY = `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&limit=5&appid=5929ee68635710a2fe163e14881274a1&lang=ru`;

      const fetchWeather = async () => {
        try {
          const response = await fetch(URL_WEATHER);
          if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
          const data = await response.json();
          setInfo(data);
        } catch (error) {
          console.error("Ошибка при получении данных о погоде:", error);
          setError(true);
        }
      };

      const fetchLocation = async () => {
        try {
          const response = await fetch(URL_CITY);
          if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
          const data = await response.json();
          setCity(data);
        } catch (error) {
          console.error("Ошибка при получении данных о месте:", error);
          setError(true);
        }
      };

      Promise.all([fetchWeather(), fetchLocation()]).finally(() =>
        setLoading(false)
      );
    }
  }, [location]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error || !info || !city) {
    return <p>Не удалось загрузить данные о погоде</p>;
  }

  return (
    <div className="flex w-full justify-center ">
      <WeatherDisplay
        cityName={city[0].local_names.ru}
        weatherInfo={info}
        isLocationBased={isLocationBased}
      />
    </div>
  );
}

export default WeatherByLocation;
