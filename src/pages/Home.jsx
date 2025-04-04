import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/articles/all")
      .then((response) => {
        if (response.status.statusCode === 200) {
          setArticles(response.data.articleList);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  });
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold mb-4">Articles</h1>
        {error && <p className="text-red-600">{error}</p>}
        {articles.length === 0 ? (
          <p className="text-2xl font-semibold">No articles found</p>
        ) : (
          <ul className="space-y-5">
            {articles.map((article) => (
              <li key={article.id} className="p-4 border rounded shadow">
                <h2 className="text-xl">{article.title}</h2>
                <p>{article.content}</p>
                {article.publishedAt && (
                  <p className="text-sm text-gray-500">
                    Published: {new Date(article.publishedAt).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
