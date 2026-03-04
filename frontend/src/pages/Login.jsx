import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

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



            `}
      </style>

      <div className="login-page">
        <nav className="nav">
            <div className="nav-logo"></div>
        </nav>
      </div>
    </>
  );
}

export default Login;
