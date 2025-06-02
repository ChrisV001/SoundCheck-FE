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

  return (
    <div className="">
      <Navbar />
      <div>
        
      </div>
      <Footer />
    </div>
  );
};

export default AddExhaustSystems;
