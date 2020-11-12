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
            const res = await axios.post('http://localhost:4000/create', {
                employeeName: this.state.employeeName,
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Add new employee</h3>
                    <div className='form-group'>
                        <label htmlFor=''>Employee Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='employeeName'
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
