const jwt = require("jsonwebtoken");
const {secretKey }= require("../configuration/jwtConfig");


function authenticateToken(req, res, next) {
    // Try both casing variants
    const authHeader = req.get("authorization") || req.get("Authorization");
    console.log("🔍 Got header:", authHeader);
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "unauthorized: Missing or malformed token!" });
    }
  
    const token = authHeader.slice(7); // grab everything after "Bearer "
  
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          console.error("🔒 JWT verify error:", err);
          // Distinguish expired vs. invalid
          const status = err.name === "TokenExpiredError" ? 401 : 403;
          return res.status(status).json({ message: `Forbidden: ${err.message}` });
        }
        req.user = user;
        next();
      });
      
  }
  
  function verifyToken(token) {
    jwt.verify(token, secretKey);
  }

module.exports= {authenticateToken, verifyToken};