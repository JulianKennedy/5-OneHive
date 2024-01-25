/* global gapi */
import * as React from "react";
import Header from "./Header";
import { useState } from "react";
import { checkLogin } from "../Service";

function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState();

    var a = false;
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Email: ' + email + 'Password: ' + password); 
        await checkLogin(email, password);
    };




    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
      

  return (
    <div className="LoginPageDesktop" style={{width: 1440, height: 3200, position: 'relative', background: 'white'}}>
  <Header className="HeaderInstance" style={{width: 1440, height: 100, left: 0, top: 0, position: 'absolute'}} />
  <div className="Rectangle9" style={{width: 543, height: 500, left: 131, top: 504, position: 'absolute', background: '#D9D9D9'}}></div>
  <div className="Frame7" style={{width: 580, height: 500, left: 720, top: 504, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'inline-flex'}}>
    <div className="Onehive" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'flex'}}>
      <div className="Onehive" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div className="Heading" style={{width: 580, height: 110, textAlign: 'center', color: 'black', fontSize: 45, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word'}}>Login into Your Account</div>
      </div>
    </div>
    <div className="Email" style={{width: 87, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word'}}>Email</div>
    <input type="email" name="email" style={{width: 463, height: 60}}  onChange={handleEmailChange}/>
    <div className="Password" style={{width: 113, height: 41, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Newsreader', fontWeight: '200', wordWrap: 'break-word'}}>Password</div>
    <input type="password" name="password" style={{width: 463, height: 60}} onChange={handlePasswordChange}/>
    <div className="Frame6" style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
    <input type="checkbox" className="KeepMeSignedIn" value="Keep me signed in" style={{width: 30, textAlign: 'left', color: 'black', fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word'}} />
    <label htmlFor="Keep me signed in" style={{width: 32, textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word'}}>Keep me signed in</label><br />
    <div className="ForgotYourPassword" style={{width: 161, height: 0, textAlign: 'left', color: '#0047FF', fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word', marginTop: "20px", marginLeft: "60px"}}>
    <a href="/forgotpassword" style={{width: 161, height: 0, textAlign: 'left', color: '#0047FF', fontSize: 15, fontFamily: 'Newsreader', fontWeight: '400', wordWrap: 'break-word', marginTop: "20px", textDecoration: "none"}}>Forgot your Password?</a>
        </div>
  </div>
  </div>
  <div className="Frame3" style={{left: 900, top: 932, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 50, display: 'inline-flex', marginTop: '120px'}}>
     
      <div className="Frame8" style={{justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div className="Login" style={{textAlign: 'center', color: 'black', fontSize: 26, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word', marginLeft: "40px"}}><a href="dashboard" className="login-button" type="button" color="#e5bcff" textDecoration="none" onClick={handleSubmit}>Login</a></div>
      </div>
    </div>
  <img className="Image1" style={{width: 378, height: 151, left: 210, top: 678, position: 'absolute'}} src={require('./img/fec.png')} />
</div>
  )};

export default LoginPage;