import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
import { fetchJSON } from "../api/editProfileApi";

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userId = (() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      return jwtDecode(token).id;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (!userId) return navigate("/login");
    (async () => {
      try {
        const user = await fetchJSON(`/api/users/${userId}`);
        console.log("🔍 fetched user:", user);
        setForm({ name: user.name, email: user.email, password: "" });
      } catch (e) {
        setMessage(`Error loading profile: ${e.message}`);
      }
    })();
  }, [userId, navigate]);

  // basic validators
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (form.password && form.password.length < 6)
      errs.password = "Min 6 characters";
    return errs;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
    }));
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
    }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
      };
      if(form.password) {
        payload.password = form.password;
      }
      await fetchJSON(`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      
      setMessage("Profile updated successfully!");
      setForm((f) => ({ ...f, password: "" }));
    } catch (e) {
      setMessage(`Update failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  console.log("📝 form state:", form);
  if (!form) {
    return <Container className="mt-4"><Spinner animation="border" /></Container>;
    }
  return (
   
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <h2>Edit Profile</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Leave blank to keep current"
            value={form.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Save Changes"}
        </Button>
      </Form>
    </Container>
  );
}
