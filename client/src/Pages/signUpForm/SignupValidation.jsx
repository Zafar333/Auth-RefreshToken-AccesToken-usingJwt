import React from "react";
import * as yup from "yup";

export const SignupValidation = yup.object({
  name: yup.string().min(2).required("name must be required"),
  email: yup.string().email().required("please enter your email"),
  password: yup.string().min(6).required("please enter your password"),
  confirmPassword: yup
    .string()
    .min(6)
    .required("please enter your password")
    .oneOf([yup.ref("password"), null], "password must match"),
});
