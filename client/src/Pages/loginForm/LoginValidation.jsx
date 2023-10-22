import React from "react";
import * as yup from "yup";

export const LoginValidation = yup.object({
  email: yup.string().email().required("please enter your email"),
  password: yup.string().required("please enter your password"),
});
