const jwt = require('jsonwebtoken');
const CFG = require('./config');

const auth = (req, res, next) => {
    try {
        const header = req.header('Authorization');

        if (!header) {
            return res.status(401).json({ message: "No authorization header provided. Access denied." });
        }

        if (!header.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid authorization format. Expected 'Bearer <token>'." });
        }

        const token = header.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing. Access denied." });
        }

 
        jwt.verify(token, CFG.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token. Access denied." });
            }

            req.user_id = decoded; 
            next(); 
        });

    } catch (error) {
        return res.status(401).json({ message: `Authentication error: ${error.message}. Access denied.` });
    }
};

module.exports = auth;
