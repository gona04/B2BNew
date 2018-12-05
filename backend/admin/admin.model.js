const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({
    name: {type: String, required: true},
    emailId: {type: String, unique: true, required: true},
    role: {type:String, default: 'ADMIN'},
    password: {type: String, required: true},
    isVarified:{type: Boolean, default: true}
})
adminSchema.plugin(validator);
module.exports = mongoose.model('admin', adminSchema)