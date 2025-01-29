
require('dotenv').config('../.env');
const { Registration, Login } = require('../models/AuthModel');
const { isItValid } = require('../util/validationchecker');

const jwt = require('jsonwebtoken');

const registration = async (req, res) => {

}

const login = async (req, res) => {

    const body = req.body;
    const privateKey = process.env.PRIVATE_KEY;
    
    const { email, password } = body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email & Password Required" });
    }

    const mailSplit = email.split("@");
    let tableName = 'employees';

    if (mailSplit[1] == 'org.com') {
        tableName = 'guest';
    }

    try {

        const response = await Login(body, tableName);
        if (response == "") {
            return res.status(400).json({ status: "error", message: "Invalid Credential" });
        }

        const token = jwt.sign({response}, privateKey, {expiresIn: '1h'});
        
        return res.status(200).json({ message: "success", token: token });


    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });

    }
}

module.exports = {
    registration,
    login
}