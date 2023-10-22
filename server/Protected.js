const jwt = require("jsonwebtoken");
module.exports = (req, resp, next) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "58743rejfdslkfjsd", (err, token) => {
    if (!err) {
      return next();
    }
    return resp.status(403).json({ msg: "token expired" });
  });
};
