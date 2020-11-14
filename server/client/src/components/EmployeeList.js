import React, { Component } from 'react';
import axios from 'axios';
import { URLS } from '../consts';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.DEFAULT_OPTION = 'Choose...';
        this.state = {
            employeeList: [],
        };
    }

    //get employee list
    async componentDidMount() {
        const res = await axios.get(URLS.getEmployees);
        this.setState({ employeeList: res.data });
    }

    renderNames = () => {
        // console.log(this.state.employeeList); //testing
        return this.state.employeeList.map(employee => {
            return (
                <option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                </option>
            );
        });
    };

    render() {
        return (
            <div>
                <div className='form-group'>
                    <label className='my-1 mr-2' htmlFor='empNameInput'>
                        Employee Name
                    </label>
                    <select
                        // value={this.props.selectedEmployeeId}
                        onChange={e => this.props.onChangeSelectEmployee(e)}
                        className='custom-select my-1 mr-sm-2'
                        id='empNameInput'
                        name='selectedEmployeeId'
                    >
                        <option>{this.DEFAULT_OPTION}</option>
                        {this.renderNames()}
                    </select>
                </div>
            </div>
        );
    }
}
