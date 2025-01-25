import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SavedCities from "./components/SavedCities";
import WeatherByLocation from "./components/WeatherByLocation";
import Settings from "./components/Settings";

function App() {
  return (
    <Router basename="/WeatherApp">
      <nav className="flex w-full justify-around p-4 bg-gray-200 text-[10px] lg:text-[20px] md:text-[15px]">
        <Link
          to="/"
          className=" hover:text-blue-500 transition duration-200 px-2 py-1 rounded-md"
        >
          Сохранённые города
        </Link>
        <Link
          to="/location"
          className=" hover:text-blue-500 transition duration-200 px-2 py-1 rounded"
        >
          Погода по местоположению
        </Link>
        <Link
          to="/settings"
          className=" hover:text-blue-500 transition duration-200 px-2 py-1 rounded"
        >
          Настройки
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<SavedCities />} />
        <Route
          path="/location"
          element={<WeatherByLocation isLocationBased={true} />}
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
