/* global gapi */
import React, { useState } from "react";
import { TextField, Button, Typography, Link, Grid } from "@material-ui/core";
import { RegisterUser, ExistingEmail, checkLogin } from "../Service";

function RegisterPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPasswordError(false);
        setEmailExistsError(false);

        if (password !== confirmPassword) {
            setPasswordError(true);
        } else {
            const emailResult = await ExistingEmail(email);
            if (emailResult.length > 0) {
                setEmailExistsError(true);
            } else {
                const register = await RegisterUser(email, password, firstName, lastName);
                // Handle successful registration
                const loginResult = await checkLogin(email, password);
                if(loginResult.status) {
                    window.location.href = "/dashboard";
                } else {
                    alert("Login failed!"); // Show error if login is incorrect
                }  
            }
        }  
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setConfirmPassword("");
    };



    return (
        <Grid container justify="center" alignItems="center" style={{ minHeight: "100vh" }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Typography variant="h4" align="center" gutterBottom style={{ color: "hotpink" }}>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={handleFirstNameChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={handleLastNameChange}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        margin="normal"
                        error={passwordError}
                        helperText={passwordError && "Passwords do not match"}
                        required
                    />
                    {emailExistsError && (
                        <Typography variant="body1" color="error" align="center">
                            User already exists
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        style={{ marginTop: 20, background: "#e5bcff", color: "black" }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
                    Already have an account?{" "}
                    <Link href="login" style={{ color: "hotpink" }}>
                        Log In
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default RegisterPage;