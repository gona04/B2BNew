const Engineer = require('./engineer.model')
const Employee = require('../Owner/employees/employee.model');
exports.testing = (req, res, next) => {
    res.json({
        message: 'Engineer working fine!'
    });
}

exports.addEngineer = (req, res, next) => {
    role = req.OwnerDetails.role;
    verifyId = req.OwnerDetails._id;
   const engineer = new Engineer({

    firstName:            req.body.firstName,
    lastName:             req.body.lastName,
    experience:           req.body.experience,
    technologiesKnown:    req.body.technologiesKnown,
    budget:               req.body.budget,
    email:                req.body.email,
    phoneNumber:          req.body.phoneNumber,
    isDeleted:            req.body.isDeleted,
    deletedOn:            req.body.deletedOn,             
    willBeDeleted:        req.body.willBeDeleted,
    rating:               req.body.rating,
    addedBy:              req.OwnerDetails._id,

    });
 
  
    engineer.save().then(result => {
      
        res.status(200).json({
            message:"engineer added successfully",
            engineer: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'There was an internal error',
            error: error
        })
    })
  
}


exports.getAllEngineers = (req,res,next) => {
    
    Engineer.find({isDeleted: false}).then(result => {
        res.status(200).json({
            message:'Fetched all engineers successfully',
            engineers: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Some internal error occured',
            error: error
        })
    })
}


exports.getAllEngineersAddedBy = (req,res,next) => {
    owner = req.OwnerDetails._id;

    Engineer.find({isDeleted: false, addedBy: owner}).then(result => {

        res.status(200).json({
            message:'Fetched all engineers successfully',
            engineers: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Some internal error occured'
       
        })

    })
}

exports.editEngineer = (req, res, next) => {

    engineerId = req.params.id;
    const verifyId = req.OwnerDetails._id;
    role = req.OwnerDetails.role;
    engineer = new Engineer({
        _id: engineerId,
        firstName:            req.body.firstName,
        lastName:             req.body.lastName,
        experience:           req.body.experience,
        technologiesKnown:    req.body.technologiesKnown,
        budget:               req.body.budget,
        email:                req.body.email,
        phoneNumber:          req.body.phoneNumber,
        isDeleted:            req.body.isDeleted,
        deletedOn:            req.body.deletedOn,             
        willBeDeleted:        req.body.willBeDeleted,
        rating:               req.body.rating,
        addedBy:              req.OwnerDetails._id,
        hiredBy:              req.hiredBy,
        hiredByRole:          req.hiredByRole 
    });

   
    if(role === 'ADMIN') {

        Engineer.updateOne({_id: engineerId}, engineer).then(result => {
      
            res.status(200).json({
                message: 'engineer updated successfully',
                // engineer: result
            });
        })
        .catch(error => {
    ;
        })
    }
    else {
        Engineer.updateOne({_id: engineerId, addedBy: verifyId}, engineer).then(result => {
     
            res.status(200).json({
                message: 'engineer updated successfully',
             
            });
        })
        .catch(error => {
    ;
        })
    }
}

exports.deleteEngineer = (req, res, next) => {
   verifyId = req.OwnerDetails._id;
    id = req.params.id;
    role = req.OwnerDetails.role;
   deletedOn = new Date();
    now = new Date();
    var noOfDays = 6 //change this to 6
    willBeDeleted = now.setDate(now.getDate() + noOfDays);
  
    if(role === 'ADMIN') {
        if(id){
            Engineer.findOneAndUpdate({_id: id}, {$set : {isDeleted: true, deletedOn: deletedOn, willBeDeleted: willBeDeleted}}, (error, result) => {
             if(error) {
      
                 res.status(500).json({
                     message: 'Some error occured '
                 })
             }   
             res.status(200).json({
                message: 'Engineer will be deleted by '+ willBeDeleted
                })
            })
            }
    }
    else {
        if(id){
            Engineer.findOneAndUpdate({_id: id, addedBy: verifyId}, {$set : {isDeleted: true, deletedOn: deletedOn, willBeDeleted: willBeDeleted}}, (error, result) => {
             if(error) {
        
                 res.status(500).json({
                     message: 'Some error occured ',
                    error: error
                    })
             }   
             res.status(200).json({
                message: 'Engineer will be deleted by '+ willBeDeleted
                })
            })
            }
    }
}

exports.listOfdeletedEngineers = (req, res, next) => {
   
    verifyId = req.OwnerDetails._id;
    role = req.OwnerDetails.role;
    if(role === 'ADMIN') {
        Engineer.find({isDeleted: true}).then(result => {
    
       
            res.status(200).json({
                message: 'Engineers fetched successfully!',
                engineers: result
            })
    })
   .catch(error => {
    res.status(500).json({
        message: 'There was an internal error'
                 })
        })
    }
    else {
        Engineer.find({isDeleted: true, addedBy: verifyId}).then(result => {
    
       
            res.status(200).json({
                message: 'Engineers fetched successfully!',
                engineers: result
            })
    })
   .catch(error => {
    res.status(500).json({
        message: 'There was an internal error'
                })
        })
    }
 
}

exports.permanentDelete = (req, res, next) => {
    verifyId = req.OwnerDetails._id;
    role = req.OwnerDetails.role;
    
    const id = req.params.id;
    if(role === 'ADMIN') {
        Engineer.deleteOne({_id: id}).then(result => {
            res.status(200).json({
                message: 'Deleted successfully'
            })
        })
        .catch(error => {
      
            res.status(500).json({
                message: 'some error happened',
                error: error
            })
        })
    }
    else {
        Engineer.deleteOne({_id: id, addedBy: verifyId}).then(result => {
            res.status(200).json({
                message: 'Deleted successfully'
            })
        })
        .catch(error => {
         
            res.status(500).json({
                message: 'some error happened',
                error: error
            })
        })
    }
  
   
}


exports.unDelete = (req, res, next) => {
    const id = req.params.id;
    verifyId = req.OwnerDetails._id;
    role = req.OwnerDetails.role;

    if(role === 'ADMIN') {
        Engineer.findOneAndUpdate({_id: id}, {$set : {isDeleted: false, deletedOn: null, willBeDeleted: null}}, (error, result) => {
            if(error) {
              
                res.status(500).json({
                    message: 'Some error occured ',
                    error: error
                })
            }   
            res.status(200).json({
               message: 'Engineer is undeleted now '
               })
           })
    }
    else {
        Engineer.findOneAndUpdate({_id: id, addedBy: verifyId}, {$set : {isDeleted: false, deletedOn: null, willBeDeleted: null}}, (error, result) => {
            if(error) {
             
                res.status(500).json({
                    message: 'Some error occured ',
                    error: error
                })
            }   
            res.status(200).json({
               message: 'Engineer is undeleted now '
               })
           })
    }
    
}
   
exports.getEngineerById = (req,res,next) => {
    id = req.params.id;

    Engineer.find({_id: id}).then(engineer => {
        res.status(200).json({
            message: 'Fetched engineer successfully',
            engineer: engineer
        })
    })
}

exports.hierEngineer = (req, res, next) => {

    
    hiredBy = req.OwnerDetails._id;
    id = req.params.id;
    role = req.params.role;



    engineer = new Engineer({
        _id: id,
        firstName:             req.body.firstName,      
        lastName:              req.body.lastName,        
        experience:            req.body.experience,      
        technologiesKnown:     req.body.technologiesKnown,
        budget:                req.body.budget,          
        email:                 req.body.email,           
        phoneNumber:           req.body.phoneNumber,     
        isDeleted:             req.body.isDeleted,      
        deletedOn:             req.body.deletedOn,       
        rating:                req.body.rating,          
        addedBy:               req.body.addedBy,         
        hiredBy:               hiredBy,  
        hiredByRole:           role,
        willBeDeleted:         req.body.willBeDeleted,         
    })

    Engineer.findByIdAndUpdate({_id: id}, engineer).then(result => {
        res.status(200).json({
            message: 'Engineer Hired successfully',
            engineer: result, 
            
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Some internal error occured',
            error: error
        })
    })
}

exports.unhire = (req, res, next) => {
    engineerId = req.params.id;

    engineer = new Engineer({
        _id: engineerId,
        firstName:            req.body.firstName,
        lastName:             req.body.lastName,
        experience:           req.body.experience,
        technologiesKnown:    req.body.technologiesKnown,
        budget:               req.body.budget,
        email:                req.body.email,
        phoneNumber:          req.body.phoneNumber,
        isDeleted:            req.body.isDeleted,
        deletedOn:            req.body.deletedOn,             
        willBeDeleted:        req.body.willBeDeleted,
        rating:               req.body.rating,
        addedBy:              req.body.addedBy,
        hiredBy:              null,
        hiredByRole:          null
    });

   


        Engineer.updateOne({_id: engineerId}, engineer).then(result => {
         
            res.status(200).json({
                message: 'engineer updated successfully',
             
            });
        })
        .catch(error => {
    ;
        })
}