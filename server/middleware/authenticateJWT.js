const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing!' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authenticateJWT;
