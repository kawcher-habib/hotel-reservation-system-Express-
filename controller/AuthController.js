
const { Registration, Login } = require('../models/AuthModel');
const { isItValid } = require('../util/validationchecker');

const registration = async (req, res) => {

}

const login = async (req, res) => {

    const body = req.body;
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

        return res.status(200).json({ status: "success", message: response });


    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });

    }
}

module.exports = {
    registration,
    login
}