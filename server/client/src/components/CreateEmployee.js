import React, { useState } from 'react';
import axios from 'axios';
import { URLS } from '../consts';

const CreateEmployee = props => {
    const [employeeName, setEmployeeName] = useState('');

    const onChangeInput = e => {
        setEmployeeName(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(URLS.CreateEmployeeUrl, {
                employeeName,
            });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Add a new employee</h3>
                <div className='form-group'>
                    <label htmlFor='employeeName'>Employee Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='employeeName'
                        name='employeeName' //for state {key}
                        value={employeeName}
                        onChange={onChangeInput}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='submit'
                        value='Submit'
                        className='btn btn-primary'
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateEmployee;
