import React, { useState } from 'react';
import axios from 'axios';
import { URLS } from '../consts';
import EmployeeList from './EmployeeList';

const HourLogger = props => {
    const DEFAULT_OPTION = 'Choose...';
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(
        DEFAULT_OPTION
    );
    const [selectedEvent, setSelectedEvent] = useState(DEFAULT_OPTION);

    const onSubmit = async e => {
        e.preventDefault();
        const newEvent = {
            selectedEmployeeId,
            eventType: selectedEvent,
        };
        try {
            const res = await axios.post(URLS.CreateEvent, newEvent);
            console.log(res.data);
            setSelectedEmployeeId('');
            setSelectedEvent('');
        } catch (err) {
            console.log(`error - cannot post new todo: ${err}`);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <EmployeeList
                    onChangeSelectEmployee={e =>
                        setSelectedEmployeeId(e.target.value)
                    }
                    selectedEmployeeId={selectedEmployeeId}
                    DEFAULT_OPTION={DEFAULT_OPTION}
                />
                <div className='form-group'>
                    <label
                        className='my-1 mr-2'
                        htmlFor='inlineFormCustomSelectPref'
                    >
                        Event Type
                    </label>
                    <select
                        value={selectedEvent}
                        onChange={e => setSelectedEvent(e.target.value)}
                        className='form-control mr-sm-2 my-1'
                        id='inlineFormCustomSelectPref'
                        name='selectedEvent'
                    >
                        <option>{DEFAULT_OPTION}</option>
                        <option value='dayStart'>Start Workday</option>
                        <option value='breakStart'>Start Break Time</option>
                        <option value='breakFinish'>Finish Break Time</option>
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
};

export default HourLogger;
