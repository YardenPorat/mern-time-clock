import React, { Component } from 'react';
import axios from 'axios';
import { URLS } from '../consts';
import EmployeeList from './EmployeeList';

export default class DeleteEmployee extends Component {
    constructor(props) {
        super(props);
        this.DEFAULT_OPTION = 'Choose...';
        this.state = {
            selectedEmployeeId: this.DEFAULT_OPTION,
            employeeList: [],
            errorNotChosen: false,
        };
    }

    onChangeSelectEmployee = e => {
        console.log(e.target.value);
        this.setState({
            selectedEmployeeId: e.target.value,
            errorNotChosen: false,
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        if (this.state.selectedEmployeeId !== this.DEFAULT_OPTION) {
            try {
                const res = await axios.delete(
                    URLS.DeleteEmployeeUrl(this.state.selectedEmployeeId)
                );
                console.log(res.data);
            } catch (err) {
                console.log(`error - cannot post new todo: ${err}`);
            }

            this.setState({
                selectedEmployeeId: '',
                selectedEvent: '',
            });

            return;
        }
        this.setState({ errorNotChosen: true });
    };

    handleCloseAlert = () => {
        this.setState({ errorNotChosen: false });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <EmployeeList
                        onChangeSelectEmployee={this.onChangeSelectEmployee}
                        selectedEmployeeId={this.state.selectedEmployeeId}
                        DEFAULT_OPTION={this.DEFAULT_OPTION}
                    />

                    <br />
                    <div className='form-group'>
                        <input
                            type='submit'
                            value='Delete Employee'
                            className='btn btn-primary'
                        />
                    </div>
                </form>
                {this.state.errorNotChosen && (
                    <div className='alert alert-danger' role='alert'>
                        Please choose employee from the list
                        <button
                            type='button'
                            className='close'
                            data-dismiss='alert'
                            aria-label='Close'
                            onClick={this.handleCloseAlert}
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
