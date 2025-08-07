import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const CreateUser = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    reviews: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { ...formData };
      const response = await axios.post(
        "http://localhost:8080/user/register",
        payload
      );

      if (response.data.statusCode === 200) {
        alert("User created!");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "",
          reviews: [],
        });
      } else {
        setError(response.data.message || "User creation FAILED!");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating user.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Add User</h1>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {error && <div className="mb-4 text-red-600">{error}</div>}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.password}
                    placeholder="••••••••"
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <input
                    type="role"
                    name="role"
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.role.toUpperCase()}
                    placeholder="Role: USER or ADMIN"
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create User
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

export default CreateUser;
