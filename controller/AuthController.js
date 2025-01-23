
const {Registration, Login} = require('../models/AuthModel');

const registration = async(req, res) =>{

}

const login = async(req, res) =>{

    const body = req.body;
    const {email, password} = body;

    if(!email || !password){
        return res.status(400).json({status:"error", message:"Email & Password Required"});
    }

    try {
        const response = await Login(body);

        
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
        
    }


}