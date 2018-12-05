const mongoose = require('mongoose');
const emailVarification = require('mongoose-unique-validator');

const engineerSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    experience: {type: Number},
    technologiesKnown:{type:[String]},
    budget: {type: Number},
    email: {type: String, unique: true},
    phoneNumber: {type: String},
    isDeleted: {type: Boolean, default: false},
    deletedOn: {type: Date},
    willBeDeleted: {type: Date}, 
    rating:{type: Number},
    addedBy: {type: mongoose.SchemaTypes.ObjectId, ref: "owner"},
    hiredBy: {type: mongoose.SchemaTypes.ObjectId, ref: "owner"},
    hiredByRole: {type: String}
   
});

engineerSchema.plugin(emailVarification);

module.exports = mongoose.model('engineer', engineerSchema);
   