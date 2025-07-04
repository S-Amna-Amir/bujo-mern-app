import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Button, Form} from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";

const Login = () => {
        const navigate = useNavigate(); 
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        })
    
        const handleInputChange = (event) => {
            const { name, value} = event.target;
            setFormData({
                ...formData,
                [name]: value
            })
        }
    
        const handleSubmit = async (e) => 
        {
            e.preventDefault();
            try{
                const response  = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                const result = await response.json();
                if (!response.ok) {
                    console.error("Login failed:", result.message);
                    return;
                  }

                localStorage.setItem("token", result.token);
                const { email: userEmail, role: userRole } = jwtDecode(result.token);
                console.log(result);
                console.log(userEmail);
                if(userEmail === "admin@test.com" || userRole === "admin")
                {
                    navigate("/dashboard");
                }
                else
                {
                    navigate("/home");
                }
                
            }
            catch(error)
            {
                console.error(error.message)
            }
            finally{
                setFormData({
                    email: "",
                    password: ""
                })
            }
        }
    return (
        <div className ='center-form'>
            <Form onSubmit = {handleSubmit}>
                <h1>Login</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </div>
    )
    
}

export default Login;
