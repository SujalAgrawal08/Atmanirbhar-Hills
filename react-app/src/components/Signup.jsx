import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { Navigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleApi = (e) => {
    e.preventDefault();
    const url = API_URL + "/signup";
    const data = { username, password, mobile, email };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          navigate("/login");
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
      <div src="./@wallandiamin.jpg" className="signup__img" />

      <form action="" className="container">
        <h1 className="login__title">Signup</h1>

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
            <i className="ri-smartphone-line login__icon"></i>

            <div className="login__box-input">
              <input
                autoComplete="off"
                type="text"
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                value={mobile}
                onChange={(e) => {
                  setmobile(e.target.value);
                }}
              />
              <label for="login-pass" className="login__label">
                Mobile
              </label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-mail-line login__icon"></i>

            <div className="login__box-input">
              <input
                autoComplete="off"
                type="email"
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <label for="login-pass" className="login__label">
                Email
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

        <button type="submit" className="login__button" onClick={handleApi}>
          Signup
        </button>

        <p className="login__register">
          Already have an account?
          <Link classNameName="m-3" to="/login">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
