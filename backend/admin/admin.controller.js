Admin = require('./admin.model');
bcrypt = require('bcryptjs');
jwt = require('jsonwebtoken');


//FOR REGISTERING AN ADMIN
exports.addAdmin = (req, res, next) => {
    password = req.body.password

    bcrypt.hash(password, 10).then(hash => {

        const admin = new Admin({
            name: req.body.name,
            emailId: req.body.emailId,
            role: req.body.role,
            password: hash
        })
        admin.save().then(result => {
            res.status(200).json({
                message: 'admin added successfully',
                admin: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'An errror occured while saving an admin',
                error: error
            })
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'An errror occured while saving the password',
            error: error
        })
    })


}


//FOR LOGIN VARIFICATION
exports.login = (req,res,next) => {

    Admin.findOne({emailId: req.body.emailId}).then(adminR => {
        const admin = adminR;
        if(!admin) {
            return res.status(403).json({
                message: 'Authentication Failed'
            })
        }

        bcrypt.compare(req.body.password, admin.password).then(result => {

            if(!result) {
                return res.status(403).json({
                    message: 'Authentication Failed'
                })
            }

            const token = jwt.sign({emailId: admin.emailId,_id: admin._id, role: 'ADMIN'}, process.env.JWT_KEY, {expiresIn:"1h"});
        
            res.status(200).json({
                message: 'Admin Authenticated successfully',
                token: token,
                expiresIn: 3600,
                role: 'ADMIN',
                isVarified: admin.isVarified
            })
        })
        .catch(error => {

            return res.status(403).json({
                message: 'Authentication failed',
                error: error
            })
        })
    })
}
