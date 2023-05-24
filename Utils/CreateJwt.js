const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
exports.createJwt = async (req, res, next) => {
  const user = await User.findOne({ email: req.query.email });
  const email = req.query.email;
  if (user) {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
      expiresIn: "24h",
    });
    res.send({ accessToken: token });
  } else {
    res.status(403).send({ accessToken: "No token" });
  }
};
