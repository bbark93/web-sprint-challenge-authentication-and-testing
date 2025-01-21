const Users = require("../users/users-model.js");

function validateLogin(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  next(); // Proceed to the next middleware/route handler if validation passes
}

function isUnique(req, res, next) {
  const { username } = req.body;

  Users.findBy({username})
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "username taken" });
      }
      next();
    })
    .catch(next);
}

module.exports = {
  validateLogin,
  isUnique
};
