const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = mongoose.Schema({
    name: {type: String, required: true},
    designation: {type: String, required: true},
    companyEmail: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    ownerId: {type: mongoose.SchemaTypes.ObjectId, ref: "owner"},
    isDeleted: {type: Boolean, default: false},
    willBeDeleted: {type: Date},
    isDeletedOn: {type: Date},
    role: {type:String, default:'EMPLOYEE'}
})

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('employee', employeeSchema);