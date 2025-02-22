import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import "./LS.css";
import { Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleApi = (e) => {
    e.preventDefault();
    const url = API_URL + "/login";
    const data = { username, password };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            navigate("/");
          }
        }
      })
      .catch((err) => {
        alert("SERVER ERR");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div src="./@wallandiamin.jpg" className="login__img" />

      <form action="" className="container">
        <h1 className="login__title">Login</h1>

        <div className="login__content">
          <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>

            <div className="login__box-input">
              <input
                autoComplete="off"
                type="text"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <label for="login-email" className="login__label">
                Username
              </label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>

            <div className="login__box-input">
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <label for="login-pass" className="login__label">
                Password
              </label>
              <i
                className={
                  showPassword
                    ? "ri-eye-line login__eye"
                    : "ri-eye-off-line login__eye"
                }
                id="login-eye"
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-group">
            <input
              type="checkbox"
              className="login__check-input"
              id="login-check"
            />
            <label for="login-check" className="login__check-label">
              Remember me
            </label>
          </div>

          <a href="#" className="login__forgot">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="login__button" onClick={handleApi}>
          Login
        </button>

        <p className="login__register">
          Don't have an account?
          <Link classNameName="m-3" to="/signup">
            {" "}
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
