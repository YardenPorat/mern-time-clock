const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventsSchema = new Schema({
    _employee: { type: Schema.Types.ObjectId, ref: 'employeeSchema' }, //foreign key
    eventType: String,
    eventDateTime: { type: Date, default: new Date() },
});

module.exports = mongoose.model('events', eventsSchema); //loads the schema to mongoose
