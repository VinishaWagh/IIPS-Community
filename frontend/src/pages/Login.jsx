import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/IIPS_Connect_logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (error) {
      console.log(error.response?.data);
      alert("Login failed");
    }
  };

  return (
    <>
      <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

            *{box-sizing: border-box; margin: 0; padding: 0;}

            html, body, #root{
            width: 100%;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            }

            .login-page{
            font-family: 'Nunito', sans-serif;
            min-height: 100vh;
            background: #f5f6fa;
            display: flex;
            flex-direction: column;
            }

            .nav{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 48px;
            background: #fff;
            }

            .nav-logo{
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 800;
            font-size: 15px;
            letter-spacing: 2px;
            color: #3d4a6b;
            text-transform: uppercase;
            cursor: pointer;
            }

            .nav-logo svg { color: #7b8fcf; }

            .nav-links{
            display: flex;
            align-items: center;
            gap: 32px;
            list-style: none;
            }

            .nav-links li a{
            text-decoration: none;
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            }

            .nav-lang{
            display: flex;
            align-items: center;
            color: #6b7280;
            gap: 4px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            }

            .nav-right{
            display: flex;
            align-items: center;
            gap: 20px;
            }

            .nav-signup{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            background: #3d4a6b;
            border-radius: 6px;
            padding: 5px 12px;
            text-decoration: none;
            align-items: center;
            justify-content: center;
            letter-spacing: 0.5px;
            }

            .nav-home-icon{
            width: 32px;
            height: 32px;
            background: #3d4a6b;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            cursor: pointer;
            }

            // Main-section
            .main{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 48px;
            gap: 60px;
            }

            .form-side{
            flex: 0 0 400px;
            max-width: 400px;
            }

            .welcome-title{
            font-size: 28px;
            font-weight: 800;
            color: #1e2a3a;
            letter-spacing: 2px;
            margin-bottom: 8px;
            }

            .signup-text{
            font-size: 14px;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 32px;
            }

            .signup-text a{
            color: #7b8fcf;
            text-decoration: none;
            font-weight: 700;
            }

            .signup-text a:hover{ text-decoration: underline;}

            .field-label{
            display: block;
            font-size: 14px;
            font-weight: 700;
            color: #1e2a3a;
            margin-bottom: 8px;
            }

            .input-wrap{
            position: relative;
            margin-bottom: 20px;
            }
            .input-wrap input{
            width: 100%;
            padding: 14px 18px;
            border: 1.5px solid #dde1f0;
            border-radius: 30px;
            font-family: 'Nunito', sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #1e2a3a;
            background: #fff;
            transition: border-color 0.2s;
            }

            .input-wrap input::placeholder { 
            color: #b5cd4;}
            .input-wrap input:focus { border-color: #7b8fcf;}

            .forgot-password{
            font-size: 13px;
            font-weight: 700;
            color: #7b8fcf;
            text-decoration: none;
            }

            .forgot-password: hover {
            text-decoration: underline;
            }

            .signin-btn{
            width: 100%;
            padding: 15px;
            background: #7b8fcf;
            color: #fff;
            border: none;
            border-radius: 50px;
            font-family: 'Nunito, sans-serif;
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            margin-bottom: 28px;
            } 
            .signin-btn:hover { background: #6a7dc0; }
            .signin-btn:active { transform: scale(0.97); }







            `}
      </style>

      <div className="login-page">
        {/* Navbar */}
        <nav className="nav">
            {/* Logo */}
            <div className="nav-logo">
              <img src={logo} alt="Logo" height="36" />
            </div>
            {/* Links */}
            <ul className="nav-links">
              <li><a href="#">Help</a></li>
              <li><a href="#">Contact Us</a></li>
              <li>
                <span className="nav-lang">English
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                </span>
              </li>
            </ul>
            {/* Nav Right */}
            <div className="nav-right">
              <a href="" className="nav-signup">Sign Up</a>
              <div className="nav-home-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </div>
            </div>
        </nav>

        {/* Main Section */}
        <div className="main">
          <div className="form-side">
            <h1 className="welcome-title">WELCOME BACK!</h1>
            <p className="signup-text">Don't have an account? <a href="#">Sign Up</a></p>

            <form onSubmit={handleLogin}>
              <label className="field-label">Email</label>
              <div className="input-wrap">
                <input type="email" placeholder="Email Address" value={email} onChange={(e) =>{
                setEmail(e.target.value)
              }} required/>
              </div>

              <label className="field-label">Password</label>
              <div className="input-wrap">
                <input type="password" placeholder="••••••••" value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }} required/>
              </div>

              <a href="" className="forgot-password">Forgot password?</a>

              <button type="submit" className="signin-btn">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
