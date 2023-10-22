import React from "react";
import "./signup.css";
import { Formik, useFormik } from "formik";
import { SignupValidation } from "./SignupValidation";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { values, handleChange, touched, handleSubmit, handleBlur, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignupValidation,
      onSubmit: (values) => {
        Register(values);
      },
    });

  async function Register(values) {
    try {
      let result = await axios.post("http://localhost:4000/register", values);
      if (result.status === 201) {
        alert(result.data.msg);
      }
    } catch (error) {
      console.log(errors);
    }
  }

  return (
    <div>
      <form className="signupForm">
        <h1>Signup Form</h1>

        <label>Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter Your name"
          onChange={handleChange}
          value={values.name}
          onBlur={handleBlur}
        />
        {errors.name && touched.name ? <p>{errors.name}</p> : null}
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

        <label>Confirm password</label>

        <input
          name="confirmPassword"
          type="password"
          placeholder="Enter Your confirm Password"
          onChange={handleChange}
          value={values.confirmPassword}
          onBlur={handleBlur}
        />
        {errors.confirmPassword && touched.confirmPassword ? (
          <p>{errors.confirmPassword}</p>
        ) : null}

        <button onClick={handleSubmit}>Signup</button>
        <button>Reset</button>
        <NavLink to="/login">
          If you have an account then go to login page
        </NavLink>
      </form>
    </div>
  );
};

export default Signup;
