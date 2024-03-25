/* global gapi */
import * as React from "react";
import Header from "./Header";
import { useState } from "react";
import { checkLogin } from "../Service";
import { Icon } from "@material-ui/core";
import { Footer } from "./Footer";

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
        console.log('Email: ' + email + 'Password: ' + password);
        const loginResult = await checkLogin(email, password);
        if (loginResult.status) {
            localStorage.setItem('jwt', loginResult.token); // store locally!
            window.location.href = "/dashboard";
        } else {
            setShowError(true); // Show error if login is incorrect
            setEmail("");
            setPassword("");
        }
    };


    return (
            <div className="LoginPageDesktop" style={{ width: '100%', position: 'relative', background: 'white' }}>
                <Header className="HeaderInstance" style={{ width: '100%', height: 100, left: 0, top: 0, position: 'absolute' }} />
                <div className="Rectangle9" style={{ width: 543, height: 500, left: 131, top: 504, position: 'absolute', background: '#D9D9D9' }}></div>
                <div className="Frame7" style={{ width: 580, height: 500, left: 720, top: 504, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'inline-flex' }}>
                    <div className="Onehive" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'flex' }}>
                        <div className="Onehive" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
                            <div className="Heading" style={{ width: 580, height: 110, textAlign: 'center', color: 'black', fontSize: 45, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word' }}>Login to Your Account</div>
                            {showError && ( // Show error text if showError is true
                                <div className="error-text" style={{ width: 580, height: 110, textAlign: 'center', color: 'red', fontSize: 30, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word' }}>Incorrect Email or Password</div>
                            )}
                        </div>
                    </div>
                    <div className="Email" style={{ width: 87, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word' }}>Email</div>
                    <input type="email" name="email" value={email} style={{ width: 463, height: 60 }} onInput={handleEmailChange} />
                    <div className="Password" style={{ width: 113, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word' }}>Password</div>
                    <input type="password" name="password" value={password} style={{ width: 463, height: 60 }} onInput={handlePasswordChange} />
                    <div className="Frame6" style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div className="ForgotYourPassword" style={{ textAlign: 'left', color: '#0047FF', fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word', textDecoration: "none" }}>
                            <a href="forgotpassword" color="#0047FF" style={{ fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word', textDecoration: "none", marginLeft: '10px' }}> Forgot your Password? </a>
                        </div>
                        <input type="checkbox" className="KeepMeSignedIn" value="Keep me signed in" style={{ width: 30, textAlign: 'left', color: 'black', fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word', marginTop: '20px' }} />
                        <label htmlFor="Keep me signed in" style={{ width: 32, textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word' }}>Keep me signed in</label><br />
                    </div>
                    <div className="Frame8" style={{ justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex-start' }}>
                        <div className="Login" style={{ textAlign: 'center', color: 'black', fontSize: 26, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word', marginLeft: '150px', marginTop: '30px', color: "#e5bcff" }}><a href="dashboard" className="login-button" type="button" textDecoration="none" onClick={handleSubmit}>Login</a></div>
                        <div className="Register" style={{ textAlign: 'left', color: 'black', fontSize: 20, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word', marginLeft: '20px', textDecoration: 'none', marginTop: '30px', marginBottom: '100px'}}>If you don't have an account, <a href="register" className="register-button" type="button" color="#e5bcff" textDecoration="none">Register</a> for one now</div>
                    </div>
                </div>
                <img className="Image1" style={{ width: 378, height: 151, left: 210, top: 678, position: 'absolute' }} src={require('./img/fec.png')} />
            </div>
    );
}

export default LoginPage;