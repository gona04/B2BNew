const Owner = require('./owner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const io = require('../socket');

//TESTING WHETHER THE APP WORKS
exports.testing = (req,res,next) => {
    res.status(200).json({
        message: 'user recieved successfully'
    })
}

//REGISTER || SIGNUP OWNER
exports.signup = (req,res,next) => {
    
  bcrypt.hash(req.body.password, 10).then(hash => {
      
      const owner = new Owner({
        ceofullName: req.body.ceofullName,
        companyName: req.body.companyName, 
        companyEmail: req.body.companyEmail,
        personalEmail: req.body.personalEmail, 
        phoneNumber:req.body.phoneNumber, 
        password: hash, 
        role: req.body.role,
        isVarified: req.body.isVarified,
        isDeleted: false,
        isSeen: req.body.isSeen,
        reasonToReject: req.body.reasonToReject
      })
      console.log(req.body.companyName)
      owner.save().then(result => {
          console.log('\n\n\n\n IN SOCKET IO')
          console.log(result)
          const user = result
          io.getIO().emit('newCEO', {action: 'create', user: user });
          res.status(200).json({
              owner: result,
              message: 'company registered successfully'
          })
      })
      .catch(error => {
          console.log(error)
          res.status(500).json({
              message: 'there was some internal error'
          })
      })
  })
}

//LOGIN OWNER
exports.login = (req,res,next) => {
    console.log(req.body)
    Owner.findOne({companyEmail: req.body.companyEmail}).then(owner => {
        // const owner = owner;
        console.log(owner)
        if(!owner) {
            return res.status(403).json({
                message: 'Authentication Failed'
            })
        }
        console.log(owner);
        bcrypt.compare(req.body.password, owner.password).then(result => {
            console.log(result);
            if(!result) {
                return res.status(403).json({
                    message: 'Authentication Failed'
                })
            }

            const token = jwt.sign({companyEmail: owner.companyEmail,_id: owner._id, role: 'OWNER'}, process.env.JWT_KEY, {expiresIn:"1h"});
            console.log(owner.isDeleted + ' deleted');
            console.log(owner.isVarified + ' varified');
            res.status(200).json({
                message: 'Owner Authenticated successfully',
                token: token,
                expiresIn: 3600,
                role: 'Owner',
                isDeleted: owner.isDeleted,
                isVarified: owner.isVarified,
                id: owner._id
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

exports.listOfOwners = (req,res,next) => {
    Owner.find().then(owners => {
        res.status(200).json({
            message: 'list of owners fetched successfully',
            owners: owners
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Some internal error occured'
        })
    }) 
}

exports.updateOwner = (req, res, next) => {
    console.log('\n\n\n\n IN UPDATE OWNER \n\n\n\n')
    const ownerId = req.params.id;

    console.log(ownerId);
    
    let owner = new Owner({
        _id: ownerId,
        ceofullName:    req.body.ceofullName,
        companyName:    req.body.companyName,
        companyEmail:   req.body.companyEmail,
        personalEmail:  req.body.personalEmail,
        phoneNumber:    req.body.phoneNumber,
        password:       req.body.password,
        role:           req.body.role,
        isVarified:     req.body.isVarified,
        isDeleted:      req.body.isDeleted,
        isSeen:         req.body.isSeen,
        varifiedBy:     req.OwnerDetails._id,
        resonToReject:  req.body.reasonToreject,
    })
    console.log(owner.ceofullName);
    
    Owner.updateOne({_id: ownerId}, owner).then(result => {
            console.log(owner);
            console.log('\n\n Owner update!\n\n'+ owner+ '\n\n'+result);
            if(owner.reasonToReject) {
                io.getIO().emit('authentication', {action: 'rejected', user: owner });
            }

            res.status(200).json({
                message: 'Owner updated successfully',
                // employee: result
            });
        })
        .catch(error => {
            console.log(error);
        })
    }
