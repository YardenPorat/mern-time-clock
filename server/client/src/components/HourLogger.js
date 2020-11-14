import React, { Component } from 'react';
import axios from 'axios';
import { URLS } from '../consts';
import EmployeeList from './EmployeeList';

export default class HourLogger extends Component {
    constructor(props) {
        super(props);
        this.DEFAULT_OPTION = 'Choose...';
        this.state = {
            selectedEmployeeId: this.DEFAULT_OPTION,
            selectedEvent: this.DEFAULT_OPTION,
        };
    }

    //update state on selected option
    selectItem = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async e => {
        e.preventDefault();
        const newEvent = {
            selectedEmployeeId: this.state.selectedEmployeeId,
            eventType: this.state.selectedEvent,
        };
        console.log(1);
        try {
            const res = await axios.post(URLS.CreateEvent, newEvent);
            console.log(res.data);
            this.setState({
                selectedEmployeeId: '',
                selectedEvent: '',
            });
        } catch (err) {
            console.log(`error - cannot post new todo: ${err}`);
        }
    };

    render() {
        const chooseOption = 'Choose...';
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <EmployeeList
                        onChangeSelectEmployee={this.selectItem}
                        selectedEmployeeId={this.state.selectedEmployeeId}
                        DEFAULT_OPTION={this.DEFAULT_OPTION}
                    />
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
