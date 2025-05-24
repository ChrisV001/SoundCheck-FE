import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const ExhaustSystems = () => {
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [exhaustSystems, setExhaustSystems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/exhaustsystem/all")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setExhaustSystems(response.data.exhaustSystemList);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const filteredExhaustSystems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return [...exhaustSystems]
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
        .slice(0, 10);
    }

    return exhaustSystems.filter((es) => {
      const matchesExhaust = es.name?.toLowerCase().includes(q);
      const matchesCarModel =
        es.carModels &&
        Array.from(carModels).some((cm) => cm.model?.toLowerCase().includes(q));
      return matchesExhaust || matchesCarModel;
    });
  }, [exhaustSystems, searchQuery]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-16 max-w-md mx-auto pt-5"
      >
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {/* your SVG icon */}
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                       bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search for exhaust systems or car models"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2.5 bottom-1.5 px-4 py-2 text-sm font-medium 
                       text-white bg-blue-700 hover:bg-blue-800 rounded-lg 
                       focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Search
          </button>
        </div>
      </form>

      <div className="container mx-auto p-4">
        {error && <p className="text-red-600">{error}</p>}

        {filteredExhaustSystems.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No matches found.
          </p>
        ) : (
          <ul className="space-y-4">
            {filteredExhaustSystems.map((es) => (
              <li
                key={es.id}
                className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {es.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Type: {es.type} • Material: {es.material}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Sound: {es.soundProfile}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Models: {es.carModels.map((cm) => cm.model).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ExhaustSystems;
