import React from "react";

const weatherDescriptions = {
  200: { description: "Гроза с легким дождем", icon: "11d" },
  201: { description: "Гроза с дождем", icon: "11d" },
  202: { description: "Гроза с сильным дождем", icon: "11d" },
  210: { description: "Легкая гроза", icon: "11d" },
  211: { description: "Гроза", icon: "11d" },
  212: { description: "Сильная гроза", icon: "11d" },
  221: { description: "Непредсказуемая гроза", icon: "11d" },
  230: { description: "Гроза с легким моросящим дождем", icon: "11d" },
  231: { description: "Гроза с моросящим дождем", icon: "11d" },
  232: { description: "Гроза с сильным моросящим дождем", icon: "11d" },

  300: { description: "Легкий дождик", icon: "09d" },
  301: { description: "Моросящий дождик", icon: "09d" },
  302: { description: "Сильный дождик", icon: "09d" },
  310: { description: "Легкий дождик с дождем", icon: "09d" },
  311: { description: "Моросящий дождик с дождем", icon: "09d" },
  312: { description: "Сильный дождик с дождем", icon: "09d" },
  313: { description: "Дождик и ливень", icon: "09d" },
  314: { description: "Сильный дождик с ливнем", icon: "09d" },
  321: { description: "Шквалистый дождик", icon: "09d" },

  500: { description: "Легкий дождь", icon: "10d" },
  501: { description: "Умеренный дождь", icon: "10d" },
  502: { description: "Сильный дождь", icon: "10d" },
  503: { description: "Очень сильный дождь", icon: "10d" },
  504: { description: "Экстремальный дождь", icon: "10d" },
  511: { description: "Ледяной дождь", icon: "13d" },
  520: { description: "Легкий дождь с ливнем", icon: "09d" },
  521: { description: "Дождь с ливнем", icon: "09d" },
  522: { description: "Сильный дождь с ливнем", icon: "09d" },
  531: { description: "Нестабильный дождь с ливнем", icon: "09d" },

  600: { description: "Легкий снег", icon: "13d" },
  601: { description: "Снег", icon: "13d" },
  602: { description: "Сильный снег", icon: "13d" },
  611: { description: "Грязный снег", icon: "13d" },
  612: { description: "Легкий снегопад", icon: "13d" },
  613: { description: "Снегопад", icon: "13d" },
  615: { description: "Легкий дождь и снег", icon: "13d" },
  616: { description: "Дождь и снег", icon: "13d" },
  620: { description: "Легкий снегопад", icon: "13d" },
  621: { description: "Снегопад", icon: "13d" },
  622: { description: "Сильный снегопад", icon: "13d" },

  701: { description: "Туман", icon: "50d" },
  711: { description: "Дымка", icon: "50d" },
  721: { description: "Легкая дымка", icon: "50d" },
  731: { description: "Песчаная буря", icon: "50d" },
  741: { description: "Туман", icon: "50d" },
  751: { description: "Песок", icon: "50d" },
  761: { description: "Пыль", icon: "50d" },
  762: { description: "Вулканический пепел", icon: "50d" },
  771: { description: "Шквалы", icon: "50d" },
  781: { description: "Торнадо", icon: "50d" },

  800: { description: "Ясное небо", icon: "01d" },

  801: { description: "Немного облаков (11-25%)", icon: "02d" },
  802: { description: "Облачность (25-50%)", icon: "03d" },
  803: { description: "Облака (51-84%)", icon: "04d" },
  804: { description: "Полная облачность (85-100%)", icon: "04d" },
};

// Функция для получения описания и иконки по ID
const getWeatherDescription = (weatherId) => {
  return (
    weatherDescriptions[weatherId] || {
      description: "Неизвестная погода",
      icon: "01d",
    }
  );
};

const WeatherIconDescription = ({ weatherId }) => {
  const { description, icon } = getWeatherDescription(weatherId);

  return (
    <div className="flex items-center">
      <p className="mr-2 font-bold">{description}</p>
    </div>
  );
};

export default WeatherIconDescription;
