import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddExhaustSystems = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/carmodel/all")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setAllCarModels(response.data.carModelList || []);
        } else {
          setError("Could not load car models: " + response.data.message);
        }
      })
      .catch((error) => {
        setError("Error loading car models: " + error.message);
      });
  }, []);

  //Checkbox toggle for the car models
  const toggleCarModel = (carModelId) => {
    setSelectedCarModelIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(carModelId)) {
        copy.delete(carModelId);
      } else {
        copy.add(carModelId);
      }
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/exhaustsystems/add",
        {
          name,
          type,
          material,
          soundProfile,
          performanceMetrics,
          carModels,
          reviews,
        }
      );

      if (response.data.statusCode === 200) {
      } else {
        setError(response.data.message || "Adding Exhaust System Failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error adding exhaust system.");
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Add Exhaust System</h1>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6">
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
                    // onChange={}
                    placeholder="Name"
                    required={true}
                  />
                </div>
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
