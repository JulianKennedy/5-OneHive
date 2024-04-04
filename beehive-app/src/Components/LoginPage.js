import React, { useState } from "react";
import { TextField, Button, Typography, Link, Grid } from "@material-ui/core";
import { checkLogin } from "../Service";

function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowError(false);

        const loginResult = await checkLogin(email, password);
        if (loginResult.status) {
            localStorage.setItem('jwt', loginResult.token);
            window.location.href = "/dashboard";
        } else {
            setShowError(true);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <Grid container justify="center" alignItems="center" style={{ minHeight: "100vh" }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Typography variant="h4" align="center" gutterBottom style={{ color: "#e5e5" }}>
                    Login to Your Account
                </Typography>
                {showError && (
                    <Typography variant="body1" color="error" align="center">
                        Incorrect Email or Password
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        // type="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        style={{ marginTop: 20, background: "#e5bcff", color: "black" }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
                    <Link href="forgotpassword" style={{ color: "#e5bcff" }}>
                        Forgot your Password?
                    </Link>
                </Typography>
                <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
                    Don't have an account?{" "}
                    <Link href="register" style={{ color: "#e5bcff" }}>
                        Register
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default LoginPage;
