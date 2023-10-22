const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Route = require("./routes/index.js");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(Route());
app.listen(4000, () => {
  console.log("your server is live");
});
