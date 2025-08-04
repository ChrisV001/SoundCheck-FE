import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../api/client";

const ListAllUsers = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/all")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setUsers(response.data.userList);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleDelete = async () => {
    const idString = window.prompt(
      "Enter the ID of the user that you want to delete."
    );

    if (!idString) return;

    const id = Number(idString);
    if (Number.isNaN(id)) return alert("Invalid ID");

    if (!window.confirm(`Confirm deletion of user #${id}?`)) return;

    try {
      const response = await apiClient.delete(`/user/${id}`);
      const responseBody = response.data;

      alert(responseBody.message || "Deleted!");

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Deleted failed";
      alert(message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold mb-4">All Users</h1>
        {error && <p className="text-red-600">{error}</p>}
        {users.length === 0 ? (
          <p className="text-2xl font-semibold">No users found</p>
        ) : (
          <ul className="space-y-5">
            {users.map((user) => (
              <li key={user.id} className="p-4 border rounded shadow">
                <p>
                  <span>ID:</span> {user.id}
                </p>
                <p>
                  <span>Username:</span> {user.username}
                </p>
                <p>
                  <span>Email:</span> {user.email}
                </p>
                <p>
                  <span>Role:</span> {user.role}
                </p>
                <p>
                  <span>Created at:</span> {user.createdAt}
                </p>
                <p>
                  <span>Updated at:</span> {user.updatedAt}
                </p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleDelete}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          Delete User
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ListAllUsers;
