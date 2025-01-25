import { useEffect, useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import { v4 } from "uuid";
function SavedCities() {
  const [savedCities, setSavedCities] = useState([]); //Список сохранённых городов в loacal storage
  const [filteredCities, setFilteredCities] = useState([]); // Для отображения найденных городов по запросу
  const [newCity, setNewCity] = useState(""); // Для хранения значения в инпуте для нового города
  const [selectedCity, setSelectedCity] = useState(null); // Выбранный город в списке
  const [weatherInfo, setWeatherInfo] = useState(null); // Информация о погоде

  const API_KEY = "5929ee68635710a2fe163e14881274a1";

  // Загружаем сохранённые города из LocalStorage при загрузке компонента
  useEffect(() => {
    const citiesFromStorage = JSON.parse(localStorage.getItem("savedCities"));
    if (citiesFromStorage) {
      setSavedCities(citiesFromStorage);
      setFilteredCities(citiesFromStorage); // Изначально показываем все города
    }
  }, []);

  // Сохраняем список городов в LocalStorage при изменении savedCities
  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }, [savedCities]);

  const addCity = async () => {
    if (!newCity.trim()) {
      return alert("Введите город");
    } else if (savedCities.includes(newCity))
      return alert("Такой город уже сохранён");

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${API_KEY}&units=metric&lang=ru`;

    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      const updatedCities = [...savedCities, newCity];
      setSavedCities(updatedCities);
      setFilteredCities(updatedCities); // Обновляем список фильтрованных городов
      setSelectedCity(newCity);
      setWeatherInfo(data);
      setNewCity(""); // Сбрасываем значение инпута
    } catch (error) {
      console.error("Ошибка при добавлении города:", error);
      alert("Не найден такой город");
    }
  };

  const selectCity = async (cityName) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`;

    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const data = await response.json();
      setSelectedCity(cityName);
      setWeatherInfo(data);
    } catch (error) {
      console.error("Ошибка при переключении города:", error);
    }
  };

  const removeCity = (cityName) => {
    const updatedCities = savedCities.filter((city) => city !== cityName);
    setSavedCities(updatedCities);
    setFilteredCities(updatedCities); // Обновляем список фильтрованных городов
    if (selectedCity === cityName) {
      setSelectedCity(null);
      setWeatherInfo(null);
    }
  };

  // Обработчик поиска
  const handleSearch = (query) => {
    const filtered = savedCities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-6">
      {/* Поле для поиска */}
      <div className="flex w-[80%] justify-center mb-4">
        <input
          type="text"
          placeholder="Поиск по сохраненным городам"
          onChange={(e) => handleSearch(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      {/* Добавление города */}
      <div className="flex w-[80%] justify-center mb-4">
        <input
          type="text"
          placeholder="Добавить город"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addCity();
          }}
          className="border px-2 py-1 w-full"
        />
        <button
          onClick={addCity}
          className="ml-2 bg-blue-500 text-white px-4 py-1  hover:bg-gray-300 hover:text-blue-500 transition duration-200  rounded-md
        "
        >
          Добавить
        </button>
      </div>

      {/* Список сохраненных городов */}
      <div className="flex flex-col w-[80%] justify-center items-center mt-4">
        <h2 className="mb-5  text-sm md:text-xl lg:text-xl font-bold">
          Сохраненные города:
        </h2>
        {filteredCities.length === 0 && (
          <p className="text-xl font-bold">Нет сохраненных городов</p>
        )}
        <ul className="w-full">
          {filteredCities.map((city) => (
            <li
              key={v4()}
              className="flex items-center justify-between border px-2 py-1 mb-2 rounded"
            >
              <button
                onClick={() => selectCity(city)}
                className="text-blue-500 underline"
              >
                {city}
              </button>
              <button
                onClick={() => removeCity(city)}
                className="text-red-500 hover:text-blue-500 transition duration-200  rounded-md "
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Отображение информации о погоде */}
      {selectedCity && weatherInfo && (
        <div className="flex w-full justify-center mt-6">
          <WeatherDisplay cityName={selectedCity} weatherInfo={weatherInfo} />
        </div>
      )}
    </div>
  );
}

export default SavedCities;
