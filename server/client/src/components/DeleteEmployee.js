import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            selectedEmployeeId: 'Choose...',
            errorNotChosen: false,
        };
        this.CHOOSE_OPTION = 'Choose...';
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/');
        this.setState({ employeeList: res.data });
    }

    selectEmployee = e => {
        this.setState({
            selectedEmployeeId: e.target.value,
            errorNotChosen: false,
        });
    };

    renderNames = () => {
        // console.log(this.state.employeeList);
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
        if (this.state.selectedEmployeeId !== this.CHOOSE_OPTION) {
            try {
                const res = await axios.get(
                    `http://localhost:4000/employee/delete/${this.state.selectedEmployeeId}`
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

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label
                        className='my-1 mr-2'
                        htmlFor='inlineFormCustomSelectPref'
                    >
                        Employee Name
                    </label>
                    <select
                        value={this.state.selectedEmployeeId}
                        onChange={this.selectEmployee}
                        className='custom-select my-1 mr-sm-2'
                        id='inlineFormCustomSelectPref'
                    >
                        <option>{this.CHOOSE_OPTION}</option>
                        {this.renderNames()}
                    </select>

                    <br />
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
                            onClick={() =>
                                this.setState({ errorNotChosen: false })
                            }
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
