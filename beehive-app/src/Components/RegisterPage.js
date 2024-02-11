/* global gapi */
import * as React from "react";
import Header from "./Header";
import { useState } from "react";
import { RegisterUser, ExistingEmail, checkLogin } from "../Service";
import { Icon } from "@material-ui/core";

function RegisterPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswordConfirmationError, setShowPasswordConfirmationError] = useState(false); // Add state for error visibility
    const [showUserAlreadyExistsError, setShowUserAlreadyExistsError] = useState(false); // Add state for error visibility

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Email: ' + email + 'Password: ' + password + 'Username: ' + username + 'Location: ' + location);
        setShowPasswordConfirmationError(false);
        setShowUserAlreadyExistsError(false);

        if(password !== confirmPassword){
            setShowPasswordConfirmationError(true);
        }
        else{
            const emailResult = await ExistingEmail(email);
            console.log(emailResult);
            if(emailResult.length > 0) {
                setShowUserAlreadyExistsError(true);
            }
            else {
                const register = await RegisterUser(email, password, username, location);
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
        setUsername("");
        setLocation("");
        setConfirmPassword("");
    };



    return (
        <div className="RegisterPageDesktop" style={{width: 1440, height: 3200, position: 'relative', background: 'white'}}>
            <Header className="HeaderInstance" style={{width: 1440, height: 100, left: 0, top: 0, position: 'absolute'}} />
            <div className="Rectangle9" style={{width: 543, height: 500, left: 131, top: 504, position: 'absolute', background: '#D9D9D9'}}></div>
            <div className="Frame7" style={{width: 580, height: 500, left: 720, top: 250, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'inline-flex'}}>
                <div className="Onehive" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'flex'}}>
                    <div className="Onehive" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                        <div className="Heading" style={{width: 580, height: 110, textAlign: 'center', color: 'black', fontSize: 45, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word'}}>Sign Up</div>
                        {showPasswordConfirmationError && ( // Show error text if showError is true
                            <div className="password-error-text" style={{width: 580, height: 110, textAlign: 'center', color: 'red', fontSize: 30, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word'}}>Passwords do not match</div>
                        )}
                        {showUserAlreadyExistsError && ( // Show error text if showError is true
                            <div className="user-error-text" style={{width: 580, height: 110, textAlign: 'center', color: 'red', fontSize: 30, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word'}}>User already exists</div>
                        )}
                    </div>
                </div>
                <div className="Username" style={{width: 87, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word'}}>Name</div>
                <input type="text" name="username" value={username} style={{width: 463, height: 60}}  onInput={handleUsernameChange}/>
                <div className="Location" style={{width: 113, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word'}}>Location</div>
                <input type="text" name="location" value={location} style={{width: 463, height: 60}}  onInput={handleLocationChange}/>
                <div className="Email" style={{width: 87, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word'}}>Email</div>
                <input type="email" name="email" value={email} style={{width: 463, height: 60}}  onInput={handleEmailChange}/>
                <div className="Password" style={{width: 113, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word'}}>Password</div>
                <input type="password" name="password" value={password} style={{width: 463, height: 60}} onInput={handlePasswordChange} />
                <div className="ConfirmPassword" style={{width: 200, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word'}}>Confirm Password</div>
                <input type="password" name="confirmPassword" value={confirmPassword} style={{width: 463, height: 60}} onInput={handleConfirmPasswordChange} />
                <div className="Frame8" style={{justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex-start'}}>
                    <div className="Register" style={{textAlign: 'center', color: 'black', fontSize: 26, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word', marginLeft: '70px', marginTop: '40px'}}><a href="dashboard" className="login-button" type="button" color="#e5bcff" textDecoration="none" onClick={handleSubmit}>Sign Up</a></div>
                    <div className="Login" style={{textAlign: 'left', color: 'black', fontSize: 20, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word', marginLeft: "20px", textDecoration:"none", marginTop:"30px"}}>Already have an account? <a href="login" className="login" type="button" color="#e5bcff" textDecoration="none">Log In</a></div>
                </div>
            </div>
            <img className="Image1" style={{width: 378, height: 151, left: 210, top: 678, position: 'absolute'}} src={require('./img/fec.png')} />
        </div>
    );
}

export default RegisterPage;