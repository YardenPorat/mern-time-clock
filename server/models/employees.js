const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    employeeName: String,
});

module.exports = mongoose.model('employees', employeeSchema);
