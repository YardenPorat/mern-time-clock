const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');
const eventSchema = require('./models/events');
const employeeSchema = require('./models/employees');
const MONGO_URL = 'mongodb://127.0.0.1:27017/employeeSchema';

app.use(cors());
app.use(express.json());

(async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log(`error conntecting to mongodb: ${err}`);
    }
})();

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB connected`);
});
//
//routes:
app.get('/', async (req, res) => {
    const employees = await employeeSchema.find();
    res.status(200).send(employees);
});

app.post('/create', async (req, res) => {
    await new employeeSchema({ employeeName: req.body.employeeName }).save();
    res.status(200).send(`got employee ` + req.body.employeeName);
});

app.post('/events/add', async (req, res) => {
    const { selectedEmployeeId, eventType } = req.body;
    try {
        await new eventSchema({
            _employee: selectedEmployeeId,
            eventType: eventType,
        }).save();
        res.status(200).send(`got employee ` + selectedEmployeeId);
    } catch (err) {
        console.log(err);
    }
});

app.get('/report', async (req, res) => {
    const report = {};
    const events = await eventSchema.find();
    let employees = await employeeSchema.find();

    employees = employees.map(({ _id, employeeName }) => {
        report[_id] = { empName: employeeName };
    });
    events.map(event => {
        report[event._employee][event.eventType] = event.eventDateTime;
    });
    res.status(200).send(report);
});

app.listen(PORT, () => {
    console.log(`Express server started`);
});
