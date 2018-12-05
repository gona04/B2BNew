const mongoose = require('mongoose');

const technologySchema = mongoose.Schema({
    name: {type: String, required: true},
    proficiency:{type: String, default: 'BEGINNER'},
    employeeId: {type:mongoose.SchemaTypes.ObjectId, ref:"employee"}
})

module.exports = mongoose.model('technology', technologySchema);