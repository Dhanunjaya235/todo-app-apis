import jwt from 'jsonwebtoken';
import '../loadEnv.mjs';

function verifyToken(req, res, next) {
    const token = req.header('Authorization').split(' ').pop();
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithm: 'HS256' });
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;