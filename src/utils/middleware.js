import Authenticate from "authentication-api";

const secretKey = process.env.SECRET_KEY
const Authentication = new Authenticate(secretKey)


export const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[2];
    try {
        const payload = Authentication.authorize(token);
        req.user = payload; 
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }
};