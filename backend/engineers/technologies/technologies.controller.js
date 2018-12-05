const Technology = require('./technologies.model');

exports.addTechologies = (req,res,next) => {
   const techology  = new Technology({
    name:        req.body.name,
    proficiency: req.body.proficiency,
    employeeId: req.body.employeeId,
   })

   techology.save().then(result => {
       res.status(200).json({
           message: ' technology stored successfully',
           technology: result
       })
   })
   .catch(error => {
       res.status(500).json({
           message:'Some internal error occured',
           error: error
       })
   })
}


exports.getAllTechologies = (req,res, next) => {
    eId = req.params.id;
   
    Technology.find({employeeId: eId}).then((result) => {

        res.status(200).json({
            message: 'Fetched technologies successfully',
            technologies: result
        })
    }).catch(error => {
        res.status(500).json({
            message: 'There was an internal error',
            error: error
        })
    })

}

exports.deleteTechnology = (req, res, next) => {
    const id = req.params.id;

    Technology.deleteOne({_id: id}).then(result => {
     

        res.status(200).json({
            message: 'Technology deleted successfully',
            techology: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'There was an ineternal error',
            error: error
        })
    })
}


exports.editTechnology = (req, res, next) => {
    const id = req.params.id

    const technology = new Technology({
        _id: id,
        name: req.body.name,
        proficiency: req.body.proficiency,
        employeeId: req.body.employeeId
    })

    Technology.updateOne({_id: id}, technology).then((result) => {

        res.status(200).json({
            message: 'Technology updated successfully',
            
        })
    })
    .catch(error => {
     
        res.status(500).json({
            messsage: 'An internal error occured',
            error: error
        })
    })
}