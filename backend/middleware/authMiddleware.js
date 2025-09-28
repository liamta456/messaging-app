const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Authenticating...');
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authentication failed.');
        return res.status(401).json({ error: 'Unauthorized.' });
    }

    const token = authHeader.substring('Bearer '.length);

    try {
        const decodedPayload = jwt.verify(token, process.env.SUPABASE_LEGACY_JWT_SECRET);
        console.log('Authentication successful.');
        req.user = { id: decodedPayload.sub, email: decodedPayload.email };
        next();
    } catch (error) {
        console.error('Authentication unsuccessful.');
        return res.status(401).json({ error: error.message });
    }
}

module.exports = authMiddleware;