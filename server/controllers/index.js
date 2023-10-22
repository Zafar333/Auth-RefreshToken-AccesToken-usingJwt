const pool = require("../Database/index.js");
const jwt = require("jsonwebtoken");

exports.Register = async (req, resp) => {
  let client = await pool.connect();
  let { name, email, password } = req.body;

  try {
    let res = await client.query("select * from users where email=$1", [email]);
    if (res?.rows.length > 0) {
      return resp.status(401).json({ msg: "user already exist" });
    }
    await client.query(
      "insert into users(name,email,password) values($1,$2,$3)",
      [name, email, password]
    );
    resp.status(201).json({ msg: "users registered successfully" });
  } catch (error) {
    console.log(error);
    resp.json({ msg: "server error", error });
  } finally {
    client.release(true);
  }
};

exports.Login = async (req, resp) => {
  let client = await pool.connect();

  let { email, password } = req.body;
  try {
    let res = await client.query(
      "select * from users where email=$1 and password=$2",
      [email, password]
    );

    if (res?.rows.length === 0) {
      return resp.status(401).json({ msg: "email or password is incorrect" });
    }

    let refreshToken = jwt.sign({ id: res?.rows[0].id }, "dklsfjdsklfkjsl", {
      expiresIn: "2m",
    });
    let accessToken = jwt.sign({ id: res?.rows[0].id }, "58743rejfdslkfjsd", {
      expiresIn: "1m",
    });

    await client.query("update users set refresh_token=$1 where id=$2", [
      refreshToken,
      res.rows[0].id,
    ]);

    resp.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    resp.status(200).json({ msg: "login successfull", accessToken });
  } catch (error) {
    console.log(error);
    resp.json({ msg: "server error", error });
  } finally {
    client.release(true);
  }
};

exports.RefreshToken = async (req, resp) => {
  console.log(req.body.id);
  console.log(req);
  let client = await pool.connect();
  try {
    let res = await client.query(
      "select * from users where id=$1 and refresh_token=$2",
      [req.body.id, req.cookies.refreshToken]
    );
    if (res?.rows?.length === 0) {
      return resp.json({ msg: "Token expired", refreshTokenValid: false });
    }
    jwt.verify(res?.rows[0]?.refresh_token, "dklsfjdsklfkjsl", (err, token) => {
      if (!err) {
        let accessToken = jwt.sign(
          { id: res?.rows[0].id },
          "58743rejfdslkfjsd",
          {
            expiresIn: "1m",
          }
        );
        resp.status(200).json({ accessToken });
        return;
      }
      return resp.json({ msg: "Token expired", refreshTokenValid: false });
    });
  } catch (error) {
    resp.json({ msg: "server error", error });
  } finally {
    client.release(true);
  }
};
