
const { AllData, GetDataById, CreateNewEmp, UpdatedExistEmp, EmpStatus } = require('../models/EmployeeModel');
const { isItValid } = require('../util/validationchecker');

/**
 * TO:DO 
 * Password reset, email validation, status{DONE}, unique id, API Security  
 */


/**
 * Show All Data
 */
const getAllData = async (req, res) => {
    if (req.user.response[0].role == 'admin' || req.user.response[0].dept == 'manager') {
        ;
        try {
            const response = await AllData();
            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json(error);

        }
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}


/**
 * Show Data By Id
 */
const getDataById = async (req, res) => {

    const id = req.user.response[0].id;
    const isValidId = await isItValid('employees', 'id', 'id', id);

    if (isValidId.isValid) {

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

/**
 * Search By Id
 * TODO: search data by employee id , waiting to generate employee id what why 
 */
const getSearchDataById = async(req, res) =>{

}

/**
 * Create New Employee
 */
const createNewEmployee = async (req, res) => {
    if (req.user.response[0].role == 'admin' || req.user.response[0].dept == 'manager') {
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

            if (!isUserExist.isValid) {

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
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }

}



/**
 * Updated Existing Employee Data By Id
 */
const updatedEmployee = async (req, res) => {

    if (req.user.response[0].role == 'admin' || req.user.response[0].dept == 'manager') {

        const body = req.body;

        const { id, full_name, email, phone, address, role, dept } = body;

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
        } else {

            /**
            * Validation check is user already exist?
            */

            const isUserExist = await isItValid('employees', 'id', 'id', id);

            if (isUserExist.isValid) {

                try {
                    const response = await UpdatedExistEmp(body);
                    return res.status(200).json({ response });

                } catch (error) {

                    return res.status(500).json({ error });

                }
            } else {
                return res.status(400).json({ status: "error", message: "Invalid User" });
            }

        }

    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }

}



/**
 * Employee Status Update By Id
 */
const employeeStatus = async (req, res) => {

    if (req.user.response[0].role == 'admin' || req.user.response.dept == 'manager') {

        const id = req.params['id'];

        if (!id) {
            return res.status(400).json({ status: "error", message: "Param is empty" });
        }

        const isValidUser = await isItValid('employees', 'id, status', 'id', id);

        if (isValidUser.isValid) {

            try {
                const value = isValidUser.data[0].status == '0' ? '1' : 0;

                const response = await EmpStatus(id, value);
                return res.status(200).json(response);

            } catch (error) {
                return res.status(500).json({ status: "error", message: error });
            }

        }
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}




module.exports = {
    getAllData,
    getDataById,
    getSearchDataById,
    createNewEmployee,
    updatedEmployee,
    employeeStatus

}