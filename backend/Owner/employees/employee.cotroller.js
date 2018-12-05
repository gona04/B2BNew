const Employee = require('./employee.model');
const bcrypt = require('bcryptjs');

exports.addEmployee = (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then(hash => { 
        employee = new Employee({
            name: req.body.name,
            designation: req.body.designation,
            ownerId: req.OwnerDetails._id,
            password: hash,
            companyEmail: req.body.companyEmail
        })
    
        employee.save().then(result => {
            res.status(200).json({
                message: 'Employee added successfully',
                employee: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Some internal error occured while saving the data',
                error: error
            })
        })
    })
    .catch(error => {
        res.staus(500).json({
            message: 'Some internal error occured while saving the password',
            error: error
        })
    })
    
}

exports.getAllEmployees = (req, res, next) => {
    varifyId = req.OwnerDetails._id;
    Employee.find({ownerId: varifyId, isDeleted: false}).then(result => {
        res.status(200).json({
            message: 'fetched data successfully',
            employees: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Some internal error occured while retrieving the data',
            error: error
        })
    })
}

exports.getAllDeletedEmployees = (req, res, next) => {
    varifyId =  req.OwnerDetails._id
    console.log(varifyId);
    Employee.find({ownerId: varifyId, isDeleted: true }).then(result => {
       console.log(result)
        res.status(200).json({
            message: 'Fectched deleted employees successfully',
            employees: result
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'An error occured while fetching data',
            error: error
        })
    })
}

exports.updateEmployee = (req,res,next) => {
    id = req.body._id;
    varifyId = req.OwnerDetails._id;
    emp = new Employee({
        _id: id,
        name:            req.body.name,        
        designation:     req.body.designation, 
        companyEmail:    req.body.companyEmail,     
        password:        req.body.password,    
        ownerId:         req.OwnerDetails._id,     
        isDeleted:       req.body.isDeleted,   
        willBeDeleted:   req.body.willBeDeleted,
        isDeletedOn:    req.body. isDeletedOn
    })
    Employee.findByIdAndUpdate({_id: id, ownerId: varifyId}, emp).then(result => {

        res.status(200).json({
            message: 'Employee updated successfully',
            employee: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occured while updating an employee',
            error: error
        })
    }) 
}

exports.deleteForever = (req,res, next) => {
    id = req.params.id;

    Employee.findByIdAndDelete({_id: id}).then(result => {
        res.status(200).json({
            message: 'Employee deleted permaenetly',
            employee: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Some internal error happened while deleting the Employee',
            error: error
        })
    })
}

exports.login = (req,res,next) => {
    Employee.findOne({companyEmail: req.body.companyEmail}).then(employee => {
        // const employee = employee;
        console.log(employee)
        if(!employee) {
            return res.status(403).json({
                message: 'Authentication Failed'
            })
        }
        console.log(employee);
        bcrypt.compare(req.body.password, employee.password).then(result => {
            console.log(result);
            if(!result) {
                return res.status(403).json({
                    message: 'Authentication Failed'
                })
            }

            const token = jwt.sign({companyEmail: employee.companyEmail,_id: employee._id, role: 'EMPLOYEE'}, process.env.JWT_KEY, {expiresIn:"1h"});
            res.status(200).json({
                message: 'employee Authenticated successfully',
                token: token,
                expiresIn: 3600,
                role: 'EMPLOYEE',
                isDeleted: employee.isDeleted,
                id: employee._id
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(403).json({
                message: 'Authentication failed'
            })
        }) 
    })
}


exports.getEmployeeByOwnerId = (req, res, next) => {
    id = req.params.id, 

    Employee.find({ownerId: id}).then(result => {
        res.status(200).json({
            message: 'Fetched data successfully', 
            employee: result
        })
    })
    .catch(error =>  {
        res.status(500).json({
            message: 'Some error occured while retriving the employee',
            error: error
        })
    })
}