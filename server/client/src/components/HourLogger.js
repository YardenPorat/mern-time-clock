import React, { Component } from 'react';
import axios from 'axios';

export default class HourLogger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            selectedEmployeeId: 'Choose...',
            selectedEvent: 'Choose...',
        };
    }

    //get employee list
    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/');
        this.setState({ employeeList: res.data });
    }

    //update state on selected option
    selectItem = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    renderNames = () => {
        return this.state.employeeList.map(employee => {
            return (
                <option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                </option>
            );
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        const newEvent = {
            selectedEmployeeId: this.state.selectedEmployeeId,
            eventType: this.state.selectedEvent,
        };
        // console.log(newEvent);

        try {
            const res = await axios.post(
                'http://localhost:4000/events/add',
                newEvent
            );
            console.log(res.data);
        } catch (err) {
            console.log(`error - cannot post new todo: ${err}`);
        }

        this.setState({
            selectedEmployeeId: '',
            selectedEvent: '',
        });
    };

    render() {
        const chooseOption = 'Choose...';
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label
                            className='my-1 mr-2'
                            htmlFor='inlineFormCustomSelectPref'
                        >
                            Employee Name
                        </label>
                        <select
                            value={this.state.selectedEmployeeId}
                            onChange={this.selectItem}
                            className='form-control'
                            id='inlineFormCustomSelectPref'
                            name='selectedEmployeeId'
                        >
                            <option>{chooseOption}</option>
                            {this.renderNames()}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label
                            className='my-1 mr-2'
                            htmlFor='inlineFormCustomSelectPref'
                        >
                            Event Type
                        </label>
                        <select
                            value={this.state.selectedEvent}
                            onChange={this.selectItem}
                            // className='custom-select my-1 mr-sm-2'
                            // className='form-control my-1'
                            className='form-control mr-sm-2 my-1'
                            id='inlineFormCustomSelectPref'
                            name='selectedEvent'
                        >
                            <option>{chooseOption}</option>
                            <option value='dayStart'>Start Workday</option>
                            <option value='breakStart'>Start Break Time</option>
                            <option value='breakFinish'>
                                Finish Break Time
                            </option>
                            <option value='dayFinish'>Finish Workday</option>
                        </select>
                    </div>
                    <br />
                    <div className='form-group'>
                        <input type='submit' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        );
    }
}
