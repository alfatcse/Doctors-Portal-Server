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
exports.verifyJWT = async (req, res, next) => {
  const auth_header = req.headers.authorization;
  if (!auth_header) {
    return res.status(401).send("Unauthorized Access");
  }
  const token = auth_header.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.status(403).send({ message: err });
    }
    req.decoded = decoded;
    next();
  });
};
