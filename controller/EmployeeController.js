
const { AllData, GetDataById, CreateNewEmp } = require('../models/EmployeeModel');
const { isItValid } = require('../util/validationchecker');

const getAllData = async (req, res) => {
    try {
        const response = await AllData();
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(error);

    }
}

const getDataById = async (req, res) => {

    const id = req.params['id'];
    const isValidId = await isItValid('employees', 'id', 'id', id);

    if (isValidId) {
        try {

            const response = await GetDataById(id);
            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json(error.message);

        }
    } else {
        return res.status(400).json({ status: "error", message: "Invalid Id" });

    }

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

        /**
         * Validation check is user already exist?
         */

        const isUserExist = await isItValid('employees', 'email', 'email', email);
        if (!isUserExist) {

            try {
                const response = await CreateNewEmp(body);
                return res.status(200).json({ response });

            } catch (error) {

                return res.status(500).json({ error });

            }
        } else {
            return res.status(400).json({ status: "error", message: "User Already Exist" });
        }
    }


}


module.exports = {
    getAllData,
    getDataById,
    createNewEmployee
}