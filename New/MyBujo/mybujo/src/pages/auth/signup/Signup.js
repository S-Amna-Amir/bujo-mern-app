import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap';
import "./Signup.css";
import {useNavigate} from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    })

    const handleInputChange = (event) => {
        const { name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateForm = () => {
    const { email, name, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !name || !password) {
        alert("All fields are required.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email.");
        return false;
    }

    if (name.length < 2 || name.length > 50) {
        alert("Name must be between 2 and 50 characters.");
        return false;
    }

    if (password.length < 6 || password.length > 128) {
        alert("Password must be between 6 and 128 characters.");
        return false;
    }

    return true;
    };


    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        if (!validateForm()) return;
        try{
            const response  = await fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json();
            console.log(result);
            navigate("/login");
        }
        catch(error)
        {
            console.error(error.message)
        }
        finally{
            setFormData({
                email: "",
                name: "",
                password: ""
            })
        }
    }
    return (
        <div className ='center-form'>
            <Form onSubmit = {handleSubmit}>
                <h1>Signup</h1>
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
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
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
                    Signup
                </Button>
            </Form>
        </div>
    )
}

export default Signup;