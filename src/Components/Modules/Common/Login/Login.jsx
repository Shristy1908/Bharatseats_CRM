import React, { useState } from "react";
import logo from "../../../../assets/images/logo.png";
import { AlertMessage } from "../../../../Framework/Components/Widgets/Notification/NotificationProvider";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "./Login.css";
import maruti_suzuki_logo from "../../../../assets/images/maruti-suzuki-logo.svg";
import suzukiLogo from "../../../../assets/images/Suzuki_Logo.png";
import { authenticate } from "./Services/Methods";
import { encryptStringData } from "../../../../Service/Utilities/encodeDecode";
import { Loader } from "../../../../Framework/Components/Widgets";
import { setSessionStorage } from "./Auth/auth";

function Login() {
  const setAlertMessage = AlertMessage();
  const navigate = useNavigate();
  const [validationFormError, setValidationFormError] = useState({});
  const [formValues, setFormValues] = useState({
    txtUsername: "",
    txtPassword: "",
  });

  const updateState = (name, value) => {
    debugger;
    if (!btnLoaderActive) {
      validationFormError[name] = validateField(name, value);
      setFormValues((values) => ({
        ...values,
        [name]: value,
      }));
    }
  };

  const handleValidation = () => {
    try {
      const errors = {};
      let formIsValid = true;
      errors["txtUsername"] = validateField(
        "txtUsername",
        formValues.txtUsername
      );
      errors["txtPassword"] = validateField(
        "txtPassword",
        formValues.txtPassword
      );
      if (Object.values(errors).join("").toString()) {
        formIsValid = false;
      }
      setValidationFormError(errors);
      return formIsValid;
    } catch (error) {
      setAlertMessage({
        open: true,
        type: "error",
        message: "Something went wrong!",
      });
      return false;
    }
  };

  const validateField = (name, value) => {
    let errorsMsg = "";
    if (name === "txtUsername") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "User Name is required!";
      }
    } else if (name === "txtPassword") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Password is required!";
      }
    }
    return errorsMsg;
  };

  // const handleLogin = async (props) => {
  //   debugger;
  //   if (!handleValidation()) {
  //     return;
  //   }
  //   try {
  //     setBtnLoaderActive(true);

  //     setBtnLoaderActive(false);
  //     navigate("/home");
  //   } catch (error) {
  //     console.log(error);
  //     setAlertMessage({
  //       type: "error",
  //       message: error,
  //     });
  //   }
  // };

  const [btnLoaderActive, setBtnLoaderActive] = useState(false);
  const handleLogin = async () => {
    try {
      if (!handleValidation()) {
        return;
      }
      setBtnLoaderActive(true);
      const formdata = {
        userName: formValues.txtUsername,
        password: encryptStringData(formValues.txtPassword),
      };
      const result = await authenticate(formdata);
      setBtnLoaderActive(false);
      if (result.response.successCode === 1) {
        const user = {
          ...result.response.responseData,
        };
        setBtnLoaderActive(true);
        setSessionStorage("user", user);
        navigate("/home");
      } else {
        setAlertMessage({
          type: "error",
          message: result.response.successMsg,
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  return (
    <>
      <div className="signInContainer">
        <div className="OuterContainer">
          <img src={logo} alt="logo" />
          <div className="innerContainer">
            <form className="formContainer" action="#">
              <h1>Login</h1>

              <div className="logininputContainer">
                <input
                  name="txtUsername"
                  type="text"
                  placeholder="Username"
                  value={formValues.txtUsername}
                  onChange={(e) => updateState(e.target.name, e.target.value)}
                  required
                />
                <FaUser className="icon" />
                <span className="login_ErrorTxt">
                  {validationFormError["txtUsername"]}
                </span>
              </div>

              <div className="logininputContainer">
                <input
                  name="txtPassword"
                  type="password"
                  placeholder="Password"
                  value={formValues.txtPassword}
                  onChange={(e) => updateState(e.target.name, e.target.value)}
                  required
                />
                <FaLock className="icon" />
                <span className="login_ErrorTxt">
                  {validationFormError["txtPassword"]}
                </span>
              </div>

              <div className="rememberMe_ForgotPass">
                <a href="#">Forgot Password</a>
              </div>
              <div className="loginBtn">
                <button type="button" onClick={() => handleLogin()}>
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="clientName">
            <img src={suzukiLogo} alt="suzuki logo" className="client1" />
            <img
              src={maruti_suzuki_logo}
              alt="maruti logo"
              className="client2"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

// import React, { useState, useEffect } from "react";
// import { FaUser, FaLock } from "react-icons/fa";
// import { AlertMessage } from "../../../../Framework/Components/Widgets/Notification/NotificationProvider";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Config from "../../../../Configuration/Config.json";
// import APIEndpoints from "./Services/EndPoints";
// import logo from "../../../../assets/images/logo.png";
// import maruti_suzuki_logo from "../../../../assets/images/maruti-suzuki-logo.svg";
// import suzukiLogo from "../../../../assets/images/Suzuki_Logo.png";
// import "./Login.css";

// function Login() {
//   const setAlertMessage = AlertMessage();
//   const navigate = useNavigate();
//   const [btnLoaderActive, setBtnLoaderActive] = useState(false);
//   const [validationFormError, setValidationFormError] = useState({});
//   const [formValues, setFormValues] = useState({
//     txtUsername: "",
//     txtPassword: "",
//   });

//   useEffect(() => {
//     //kll
//   }, []);

//   const updateState = (name, value) => {
//     if (!btnLoaderActive) {
//       const errors = {
//         ...validationFormError,
//         [name]: validateField(name, value),
//       };
//       setValidationFormError(errors);
//       setFormValues((values) => ({
//         ...values,
//         [name]: value,
//       }));
//     }
//   };

//   const validateField = (name, value) => {
//     let errorsMsg = "";
//     if (name === "txtUsername" && (!value || value.trim() === "")) {
//       errorsMsg = "User Name is required!";
//     } else if (name === "txtPassword" && (!value || value.trim() === "")) {
//       errorsMsg = "Password is required!";
//     }
//     return errorsMsg;
//   };

//   const handleValidation = () => {
//     const errors = {
//       txtUsername: validateField("txtUsername", formValues.txtUsername),
//       txtPassword: validateField("txtPassword", formValues.txtPassword),
//     };
//     setValidationFormError(errors);
//     return !Object.values(errors).some((error) => error);
//   };

//   const handleLogin = async () => {
//     if (!handleValidation()) return;

//     try {
//       setBtnLoaderActive(true);
//       const result = await authenticate(
//         formValues.txtUsername,
//         formValues.txtPassword
//       );
//       if (result.successCode === 1) {
//         // Handle successful login
//         navigate("/home");
//       } else {
//         setAlertMessage({
//           type: "error",
//           message: result.successMsg,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       setAlertMessage({
//         type: "error",
//         message: "An error occurred during login.",
//       });
//     } finally {
//       setBtnLoaderActive(false);
//     }
//   };

//   return (
//     <div className="signInContainer">
//       <div className="OuterContainer">
//         <img src={logo} alt="logo" />
//         <div className="innerContainer">
//           <form className="formContainer">
//             <h1>Login</h1>
//             <div className="logininputContainer">
//               <input
//                 name="txtUsername"
//                 type="text"
//                 placeholder="Username"
//                 value={formValues.txtUsername}
//                 onChange={(e) => updateState(e.target.name, e.target.value)}
//                 required
//               />
//               <FaUser className="icon" />
//               <span className="login_ErrorTxt">
//                 {validationFormError["txtUsername"]}
//               </span>
//             </div>
//             <div className="logininputContainer">
//               <input
//                 name="txtPassword"
//                 type="password"
//                 placeholder="Password"
//                 value={formValues.txtPassword}
//                 onChange={(e) => updateState(e.target.name, e.target.value)}
//                 required
//               />
//               <FaLock className="icon" />
//               <span className="login_ErrorTxt">
//                 {validationFormError["txtPassword"]}
//               </span>
//             </div>
//             <div className="rememberMe_ForgotPass">
//               <a href="#">Forgot Password</a>
//             </div>
//             <div className="loginBtn">
//               <button type="button" onClick={handleLogin}>
//                 {btnLoaderActive ? "Logging in..." : "Login"}
//               </button>
//             </div>
//           </form>
//         </div>
//         <div className="clientName">
//           <img src={suzukiLogo} alt="suzuki logo" className="client1" />
//           <img src={maruti_suzuki_logo} alt="maruti logo" className="client2" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
