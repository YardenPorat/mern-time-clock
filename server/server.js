const express = require('express');
const cors = require('cors');
const moment = require('moment');
const mongoose = require('mongoose');
const config = require('config');

// Init server
const app = express();

// DB Schemas
const eventSchema = require('./models/events');
const employeeSchema = require('./models/employees');

// Configurtaion
const PORT = config.get('PORT');
const MONGO_URL = config.get('MONGO_URL');

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

mongoose.connection.once('open', () => {
    console.log(`MongoDB connected`);
});

//routes:
app.get('/', async (req, res) => {
    //get all employees
    const employees = await employeeSchema.find({});
    res.status(200).send(employees);
});

app.get('/employee/delete/:id', async (req, res) => {
    const employee = await employeeSchema.findOneAndDelete({
        _id: req.params.id,
    });

    res.status(200).send(`${employee.employeeName} removed`);
});

app.post('/employee/add', async (req, res) => {
    // console.log(req.body);
    const { employeeName } = await new employeeSchema({
        employeeName: req.body.employeeName,
    }).save();
    console.log(employeeName);
    res.status(200).send(`got employee ` + employeeName);
});

app.post('/events/add', async (req, res) => {
    const { selectedEmployeeId, eventType } = req.body;

    try {
        const event = await new eventSchema({
            _employee: selectedEmployeeId,
            eventType: eventType,
        }).save();
        res.status(200).send(
            `saved event type: ${eventType} for employee ${event._employee}`
        );
    } catch (err) {
        console.log(err);
    }
});

app.get('/report/:date', async (req, res) => {
    //get start and end date for query
    let { date } = req.params;
    date = moment.utc(date, 'YYYY-MM-DD');
    const startDate = date.toDate();
    const endDate = date.endOf('day').toDate();

    //get events for date
    const events = await eventSchema.find({
        eventDateTime: { $gte: startDate, $lte: endDate },
    });

    //extract uniqe employees (converted to string because _id is ObjectId type)
    const uniqueEmployees = [
        ...new Set(events.map(item => item._employee.toString())),
    ];

    // get employee data for those who had events on requested date
    let employees = await employeeSchema.find({
        _id: { $in: uniqueEmployees },
    });

    const report = {};

    //insert employees id to the obj + their names
    employees.map(({ _id, employeeName }) => {
        report[_id] = { empName: employeeName };
    });

    //add events to each employee id
    events.map(event => {
        report[event._employee][event.eventType] = event.eventDateTime;
    });
    res.status(200).send(report);
});

app.listen(PORT, () => {
    console.log(`Express server started`);
});
