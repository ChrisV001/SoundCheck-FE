import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddExhaustSystems = () => {
  const [error, setError] = useState("");
  const [allCarModels, setAllCarModels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    material: "",
    soundProfile: "",
    performanceMetrics: "",
    carModels: [],
    reviews: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/carmodel/all")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setAllCarModels(response.data.carModels || []);
        } else {
          setError("Could not load car models: " + response.data.message);
        }
      })
      .catch((error) => {
        setError("Error loading car models: " + error.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        carModels: formData.carModels.map((id) => ({ id })),
      };
      const response = await axios.post(
        "http://localhost:8080/exhaustsystems/add",
        payload
      );
      if (response.data.statusCode === 200) {
        alert("Created!");
        setFormData({
          name: "",
          type: "",
          material: "",
          soundProfile: "",
          performanceMetrics: "",
          carModels: [],
          reviews: [],
        });
      } else {
        setError(response.data.message || "Adding Exhaust System Failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error adding exhaust system.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleCarModelChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((op) =>
      Number(op.value)
    );
    setFormData((fd) => ({ ...fd, carModels: selected }));
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Add Exhaust System</h1>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {error && <div className="mb-4 text-red-600">{error}</div>}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type
                  </label>
                  <input
                    type="type"
                    name="type"
                    id="type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Type"
                    required={true}
                    onChange={handleChange}
                    value={formData.type}
                  />
                </div>
                <div>
                  <label
                    htmlFor="material"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Material
                  </label>
                  <input
                    type="material"
                    id="material"
                    name="material"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Material"
                    required={true}
                    onChange={handleChange}
                    value={formData.material}
                  />
                </div>
                <div>
                  <label
                    htmlFor="soundprofile"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sound Profile
                  </label>
                  <input
                    type="soundprofile"
                    id="soundprofile"
                    name="soundprofile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Sound Profile"
                    required={true}
                    onChange={handleChange}
                    value={formData.soundProfile}
                  />
                </div>
                <div>
                  <label
                    htmlFor="performanceMetrics"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Performance Metrics
                  </label>
                  <input
                    type="performanceMetrics"
                    id="performanceMetrics"
                    name="performanceMetrics"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Performance Metrics"
                    required={true}
                    onChange={handleChange}
                    value={formData.performanceMetrics}
                  />
                </div>
                <div>
                  <label
                    htmlFor="carModels"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Applicable Car Models{" "}
                    <span className="text-xs italic">
                      (you can select multiple)
                    </span>
                  </label>
                  <select
                    id="carModels"
                    name="carModels"
                    multiple
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.carModels.map(String)}
                    onChange={handleCarModelChange}
                  >
                    {allCarModels.map((cm) => (
                      <option key={cm.id} value={cm.id}>
                        {cm.model}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Exhaust System
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AddExhaustSystems;
