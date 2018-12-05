const Job = require('./jobs.model');

exports.addAJob = (req, res, next) => {
    const job = new Job({
        companyName:req.body.companyName,
        startedOn:req.body.startedOn,
        till:req.body.till,
        desgnation:req.body.desgnation,
        currentResponsibilites:req.body.currentResponsibilites,
        projectLinks: req.body.projectLinks,
        otherWorkLinks: req.body.otherWorkLinks,
        otherUSB:   req.body.otherUSB,
        employeeId: req.body.employeeId
    })    

    job.save().then(result => {
   
        res.status(200).json({
            message:'jobs saved successfully',
            job: result
        })
    })
    .catch(error => {
     res.status(500).json({
         message: 'Some Inernal error occured',
         error: error
     })
    }) 
}

exports.getAllJobs = (req, res, next) => {
    id = req.params.id

    Job.find({employeeId: id}).then(result => {
        res.status(200).json({
            message: 'Fetched all jobs successfully',
            job: result
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal error',
                error: error
            })
        }) 
    })
}