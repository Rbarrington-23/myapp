import React, { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">

      <header className="header">
        <h1>Enterprise Dashboard</h1>
        <p>Professional Data Management System</p>
      </header>

      <div className="card-container">

        <div className="card">
          <h2>Total Users</h2>
          <p>{users.length}</p>
        </div>

        <div className="card">
          <h2>Status</h2>
          <p>Active</p>
        </div>

      </div>

      <div className="table-section">

        <h2>User List</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Dashboard;