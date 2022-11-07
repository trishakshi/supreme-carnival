require("dotenv").config();
const jwt = require("jsonwebtoken");

function roleAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ err: "Unauthorized." });
    }

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.role = validatedUser.registeredToken.roleId

    next();
  } catch (err) {
    return res.status(401).json({ err: "Unauthorized." });
  }
}

function userAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ err: "Unauthorized." });
    }

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validatedUser.registeredToken.id

    next();
  } catch (err) {
    return res.status(401).json({ err: "Unauthorized." });
  }
}

module.exports = {
  roleAuth: roleAuth,
  userAuth: userAuth
}