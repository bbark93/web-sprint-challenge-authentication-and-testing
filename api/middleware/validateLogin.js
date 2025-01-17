function validateLogin(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  next(); // Proceed to the next middleware/route handler if validation passes
}

module.exports = {
  validateLogin,
};
