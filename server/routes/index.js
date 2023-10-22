const express = require("express");
const { Register, Login, RefreshToken } = require("../controllers/index.js");
const Protected = require("../Protected.js");
const router = express.Router();

const Route = () => {
  router.post("/register", Register);
  router.post("/login", Login);
  router.get("/protectedroute", Protected, (req, resp) => {
    resp.json("protected route");
  });
  router.post("/refreshToken", RefreshToken);
  return router;
};
module.exports = Route;
