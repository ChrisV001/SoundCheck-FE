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

  return (
    <div>
      <Navbar />
      <h1>Exhaust System Page</h1>
      <Footer />
    </div>
  );
};

export default ExhaustSystems;
