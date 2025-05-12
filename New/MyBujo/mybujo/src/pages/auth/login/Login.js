import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
    setFieldErrors(fe => ({ ...fe, [name]: '' }));
    setGeneralError('');
  };

  const validateForm = () => {
    const errs = {};
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) errs.email = 'Email is required';
    else if (!emailRegex.test(email)) errs.email = 'Invalid email format';

    if (!password) errs.password = 'Password is required';
    else if (password.length < 6 || password.length > 128)
      errs.password = 'Password must be 6–128 characters';

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.status === 400 && result.errors) {
        // express-validator errors
        const errs = {};
        result.errors.forEach(err => {
          errs[err.param] = err.msg;
        });
        setFieldErrors(errs);
        return;
      }
      if (!response.ok) {
        // login failed: 401, 403, etc.
        setGeneralError(result.message || 'Login failed');
        console.error("Login error details:", result);
        return;
      }

      // success
      localStorage.setItem("token", result.token);
      const { email: userEmail, role: userRole } = jwtDecode(result.token);
      if (userRole === "admin") {
        navigate("/admin/pending");
      } else {
        navigate("/home");
      }

    } catch (err) {
      console.error("Network or unexpected error:", err);
      setGeneralError("Network error. Please try again.");
    } finally {
      setLoading(false);
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>

        {generalError && <Alert variant="danger">{generalError}</Alert>}

        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!fieldErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
            isInvalid={!!fieldErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
