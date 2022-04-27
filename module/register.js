const mongo = require('../shared/connect');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {

    //Email already exists or not// Validation
    const existUser = await mongo.selectedDB.collection('user').findOne(
        { email: req.body.email });
    if (existUser) return res.status(500).send({ msg: "You are already a registered user" })

    //Encrypt password
    // salt=>randomly generated string

    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    //Save in db
    var response = await mongo.selectedDB.collection('user').insertOne(req.body);
    res.send(response);
}

exports.signin = async (req, res, next) => {

    //validating email
    const existUser = await mongo.selectedDB.collection('user').findOne(
        { email: req.body.email });
    if (!existUser) return res.status(500).send({ msg: "You are not a registered user" });

    //validate password

    const isValid = await bcrypt.compare(req.body.password, existUser.password);
    if (!isValid) return res.status(500).send({ msg: "Password did not match" });

    //Generate token
    //Token => encrypted form of some data
    const token = jwt.sign(existUser, 'SWERA_SECRET_KEY' );//{ expiresIn: '1hr' }
    res.send(token);
}