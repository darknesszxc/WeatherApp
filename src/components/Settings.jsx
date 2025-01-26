import { useState, useEffect } from "react";

function Settings() {
  const parameterLabels = {
    
    feels_like: "Ощущается как",
    humidity: "Влажность",
    sunrise: "Время рассвета",
    sunset: "Время заката",
  };

  const parameters = Object.keys(parameterLabels);
  const [selectedParameters, setSelectedParameters] = useState([]);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("weatherSettings"));
    if (savedSettings) {
      setSelectedParameters(savedSettings);
    }
  }, []);

  const handleChange = (param) => {
    setSelectedParameters((prev) =>
      prev.includes(param)
        ? prev.filter((item) => item !== param)
        : [...prev, param]
    );
  };

  const saveSettings = () => {
    localStorage.setItem("weatherSettings", JSON.stringify(selectedParameters));
    alert("Настройки сохранены!");
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex-col w-[80%]  mb-4">
        <h2 className="text-xl font-semibold">
          Выберите параметры для отображения
        </h2>
        <div className="flex flex-col mt-4 space-y-2">
          {parameters.map((param) => (
            <label key={param} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedParameters.includes(param)}
                onChange={() => handleChange(param)}
                className="mr-2"
              />
              {parameterLabels[param]}
            </label>
          ))}
        </div>
        <button
          onClick={saveSettings}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}

export default Settings;
