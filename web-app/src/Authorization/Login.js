// IMPORTS
import { useEffect, useState, useContext } from "react";

// STYLESHEETS
import "./Login.css";

// IMAGES
import pageImage from "../assets/images/cover-image.png";
import LoginView from "./LoginView/LoginView";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase.js";
import AuthContext from "../Components/AuthContext/AuthContext.js";


// LOGIN PAGE
function Login() {
  // CONSTANTS AND USESTATE HOOKS

  const navigate = useNavigate();
  const { setUserImpl } = useContext(AuthContext);
  let [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      setUserImpl(user);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [user, loading]);

  // DISPLAY LOGIN PAGE(S)
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          background: `url(${pageImage}) no-repeat scroll center center`,
          backgroundSize: "cover",
          height: "100vh",
        }}
        className="wrapper"
      >
        <LoginView />
      </div>
    </>
  );
}
export default Login;