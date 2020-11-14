import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URLS } from '../consts';

const EmployeeList = props => {
    const DEFAULT_OPTION = 'Choose...';
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    //get employee list
    const fetchEmployees = async () => {
        const res = await axios.get(URLS.getEmployees);
        setEmployeeList(res.data);
    };

    const renderNames = () => {
        return employeeList.map(employee => {
            return (
                <option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                </option>
            );
        });
    };

    return (
        <div>
            <div className='form-group'>
                <label className='my-1 mr-2' htmlFor='empNameInput'>
                    Employee Name
                </label>
                <select
                    // value={this.props.selectedEmployeeId}
                    onChange={e => props.onChangeSelectEmployee(e)}
                    className='custom-select my-1 mr-sm-2'
                    id='empNameInput'
                    name='selectedEmployeeId'
                >
                    <option>{DEFAULT_OPTION}</option>
                    {renderNames()}
                </select>
            </div>
        </div>
    );
};

export default EmployeeList;
