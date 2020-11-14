import React, { Component } from 'react';
import axios from 'axios';

export default class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
        };
    }

    onChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/employee/add', {
                employeeName: this.state.employeeName,
            });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Add a new employee</h3>
                    <div className='form-group'>
                        <label htmlFor='employeeName'>Employee Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='employeeName'
                            name='employeeName' //for state {key}
                            value={this.state.employeeName}
                            onChange={this.onChangeInput}
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
    }
}
