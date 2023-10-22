import React from "react";
import { useFormik } from "formik";
import { LoginValidation } from "./LoginValidation";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, touched, handleSubmit, handleBlur, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginValidation,
      onSubmit: (values) => {
        Login(values);
      },
    });

  async function Login(values) {
    try {
      let result = await axios.post("http://localhost:4000/login", values);
      if (result.status === 200) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(result.data.accessToken)
        );
        alert(result.data.msg);
        navigate("/protectedroute");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form className="signupForm">
        <h1>Login Form</h1>
        <label>Email</label>

        <input
          name="email"
          type="email"
          placeholder="Enter Your email"
          onChange={handleChange}
          value={values.email}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? <p>{errors.email}</p> : null}

        <label>Password</label>

        <input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? <p>{errors.password}</p> : null}

        <button onClick={handleSubmit}>Login</button>
        <NavLink to="/signup">
          If you not have account then go to Signup Page
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
