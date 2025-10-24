const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token (remove 'Bearer ' prefix if present)
    const tokenValue = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
