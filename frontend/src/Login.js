import React, { useState } from 'react';
import './Login.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import validation from './Loginvalidation'; // Import JS file for validation
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');

    // Function to handle input changes
    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate inputs
        setErrors(validation(values));
        // If no validation errors, send login request
        if (errors.email === '' && errors.password === '') {
            axios
                .post('http://localhost:8081/login', values)
                .then((res) => {
                    if (res.data === 'Success') {
                        localStorage.setItem('username',values.email);       
                        navigate('/home'); // Redirect to home page on successful login

                    } else {
                        alert('No record found'); // Alert user if login fails
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container-main">
            <div className="container-left">
                {/* Left content */}
                <h2 className='heading'>Welcome to carpool</h2>
            </div>
            <div className="container-right">
                {/* Right content */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleInput}
                            className="form-control rounded-0"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <p>Enter the details correctly</p>
                    <button type="submit" className="btn btn-success btn-block rounded-0">
                        Login
                    </button>
                    <div className="link">
                        <Link to="/Signup">Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
