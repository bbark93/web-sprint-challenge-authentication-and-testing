const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../../config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    console.log("token: ", token);
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        next({ status: 401, message: err.message });
      } else {
        req.decodedJwt = decodedToken;

        next();
      }
    });
  } else {
    next({ status: 401, message: "token required" });
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
