
const { CreateNewEmp } = require('../models/EmployeeModel');

const getAllData = (req, res) => {

}

const getDataById = (req, res) => {

}

const createNewEmployee = async (req, res) => {
    const body = req.body;

    const { full_name, email, phone, address, role, dept } = body;


    if (!full_name) {
        return res.status(400).json({ status: "error", message: "Name is required" });
    } else if (!email) {
        return res.status(400).json({ status: "error", message: "Email is required" });
    } else if (!phone) {
        return res.status(400).json({ status: "error", message: "Phone is required" });
    } else if (!address) {
        return res.status(400).json({ status: "error", message: "Address is required" });
    } else if (!dept) {
        return res.status(400).json({ status: "error", message: "Department is required" });
    }
    else {
        try {
            const response = await CreateNewEmp(body);
            return res.status(200).json({ response });

        } catch (error) {

            return res.status(500).json({ error });

        }
    }


}


module.exports = {
    getAllData,
    getDataById,
    createNewEmployee
}