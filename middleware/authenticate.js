const jwt = require('jsonwebtoken');
require('dotenv').config('../.env');


const authenticate = (req, res, next) => {



    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        const id = decoded.response[0].id;
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}


module.exports = { authenticate };