const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    companyName: {type:String, required: true},
    startedOn:{type:Date, required: true},
    till:{type: mongoose.SchemaTypes.Mixed, default: "Till Date"},
    desgnation: {type: String, required: true},
    currentResponsibilites: {type: String, required: true},
    projectLinks:{type:[String]},
    otherWorkLinks:{type: [String]},
    otherUSB:{type:String},
    engineerId:{type: mongoose.SchemaTypes.ObjectId, ref: 'employee'},
    isDeleted: {type: Boolean, default: 'false'},
    deletedOn: {type: Date},
    willBeDeleted: {type: Date}
})

module.exports = mongoose.model('job', jobSchema);