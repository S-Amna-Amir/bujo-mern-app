import React, { useEffect, useState } from 'react';
import { useNavigate }         from 'react-router-dom';
import { Table, Row, Col, Container } from 'react-bootstrap';

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 1️⃣ Delete handler is now inside the component
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.status === 204) {
        // update state to remove that user
        setUsers(users.filter(u => u._id !== userId));
      } else {
        const { message } = await res.json();
        alert("Could not delete user: " + message);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Dashboard</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* 2️⃣ Single map over users */}
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
 