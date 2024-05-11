import React, { useState } from "react";
import axios from "axios";
import './login2.css';

function Login() {
    const [signInValues, setSignInValues] = useState({
        signInEmail: "",
        signInPassword: ""
    });

    const [signUpValues, setSignUpValues] = useState({
        signUpName: "",
        signUpEmail: "",
        signUpPassword: ""
    });

    const handleSignInInput = (event) => {
        const { name, value } = event.target;
        setSignInValues({ ...signInValues, [name]: value });
    };

    const handleSignUpInput = (event) => {
        const { name, value } = event.target;
        setSignUpValues({ ...signUpValues, [name]: value });
    };

    const handleSignInSubmit = (event) => {
        event.preventDefault();
        // Handle sign in logic
        axios.post("http://localhost:8081/login", signInValues)
            .then((res) => {
                // Handle response
                console.log(res.data);
            })
            .catch((error) => {
                // Handle error
                console.log("Sign in failed:", error);
            });
    };

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        // Handle sign up logic
        axios.post("YOUR_SIGNUP_ENDPOINT", signUpValues)
            .then((res) => {
                // Handle response
                console.log(res.data);
            })
            .catch((error) => {
                // Handle error
                console.error("Sign up failed:", error);
            });
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
                    <h1>Create Account</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        name="signUpName"
                        value={signUpValues.signUpName}
                        onChange={handleSignUpInput}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="signUpEmail"
                        value={signUpValues.signUpEmail}
                        onChange={handleSignUpInput}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="signUpPassword"
                        value={signUpValues.signUpPassword}
                        onChange={handleSignUpInput}
                    />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSignInSubmit}>
                    <h1>Sign in</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        name="signInEmail"
                        value={signInValues.signInEmail}
                        onChange={handleSignInInput}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="signInPassword"
                        value={signInValues.signInPassword}
                        onChange={handleSignInInput}
                    />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
