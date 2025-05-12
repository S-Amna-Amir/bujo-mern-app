import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "./Header.css";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  let userRole = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/">
          {token ? "Logged-In" : "Not-LoggedIn"}
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/home" className="nav-link">
            Home
          </Nav.Link>

          {token ? (
            <>
              {userRole === "admin" && (
                <>
                  <Nav.Link as={Link} to="/dashboard" className="nav-link">
                    Delete 
                  </Nav.Link>
                  
                </>
              )}
              <Nav.Link className="nav-link" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="nav-link">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
