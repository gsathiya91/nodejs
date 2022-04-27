const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
    if (!req.headers['accesstoken']) {
        return res.status(400).send({ msg: "Unauthorized : Token not found" })
    }
    // console.log('came')
    try {
        req.body.user = await jwt.verify(req.headers['accesstoken'], 'SWERA_SECRET_KEY')
        next();
    } catch (err) {
        return res.status(401).send({ msg: "Token not valid" })
    }
}

exports.authorizeUser = async (req, res, next) => {
    console.log(req.body);
    req.body.user.role === 'Admin' ?
        next() : res.status(401).send({ msg: "You are not Admin" })
}