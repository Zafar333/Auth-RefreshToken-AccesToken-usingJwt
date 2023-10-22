import axios from "axios";
import jwt from "jwt-decode";
import { useEffect } from "react";
import { axiosInstance } from "../api";

export async function GetAccessToken() {
  let info = jwt(JSON.parse(localStorage.getItem("accessToken")));
  console.log(info);
  try {
    await axiosInstance.post("/refreshToken", { id: info.id });
  } catch (error) {
    console.log(error);
  }
}
