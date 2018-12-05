const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ownerSchema = mongoose.Schema({
    ceofullName: {type: String, reqired: true},
    companyName: {type: String, reqired: true},
    companyEmail: {type: String, reqired: true, unique: true},
    personalEmail: {type: String, reqired: true, unique: true},
    phoneNumber:{type: String, required: true},
    password: {type: String, require:true},
    role: {type:String, default: 'OWNER'},
    isVarified: {type: String, default: 'PENDING'},
    isDeleted: {type: Boolean, default: false},
    isSeen:{type: Boolean, defalt: false},
    varifiedBy:{type:mongoose.SchemaTypes.ObjectId, ref:"admin"},
    resonToReject: {type: String},
});

ownerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('owner', ownerSchema);