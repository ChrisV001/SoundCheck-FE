import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
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

    const filteredExhaustSystems = exhaustSystems.filter((es) => {
        const query = searchQuery.toLowerCase();
        const matchesExhaust = es.name?.toLowerCase().includes(query);
        const matchesCarModels = 
        es.carModels && 
        Array.from(es.carModels).some(
            (carModel) => carModel.model && carModel.model.toLowerCase().includes(query)
        )
    });

  return (
    <div>
      <Navbar />
      <h1>Exhaust System Page</h1>
      <Footer />
    </div>
  );
};

export default ExhaustSystems;
