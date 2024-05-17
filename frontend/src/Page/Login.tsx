import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/login.css";
import Logsvg from "../assets/log.svg";
import Regisvg from "../assets/register.svg";

const Login: React.FC = () => {
  useEffect(() => {
    const sign_in_btn =
      document.querySelector<HTMLButtonElement>("#sign-in-btn");
    const sign_up_btn =
      document.querySelector<HTMLButtonElement>("#sign-up-btn");
    const container = document.querySelector<HTMLDivElement>(".containers");

    const handleSignUpClick = () => {
      if (container) {
        container.classList.add("sign-up-mode");
      }
    };

    const handleSignInClick = () => {
      if (container) {
        container.classList.remove("sign-up-mode");
      }
    };

    if (sign_up_btn && sign_in_btn && container) {
      sign_up_btn.addEventListener("click", handleSignUpClick);
      sign_in_btn.addEventListener("click", handleSignInClick);
    }

    return () => {
      if (sign_up_btn && sign_in_btn && container) {
        sign_up_btn.removeEventListener("click", handleSignUpClick);
        sign_in_btn.removeEventListener("click", handleSignInClick);
      }
    };
  }, []);

  return (
    <div className="Login containers full-screen">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btns solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btns" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btns transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={Logsvg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btns transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={Regisvg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
