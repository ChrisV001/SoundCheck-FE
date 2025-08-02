import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

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
      </div>
      <Footer />
    </div>
  );
};

export default ListAllUsers;
