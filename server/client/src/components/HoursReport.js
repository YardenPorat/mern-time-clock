import React, { Component } from 'react';
import axios from 'axios';
import { URLS } from '../consts';

const Item = props => {
    const dayStart = new Date(props.item.dayStart);
    const breakStart = new Date(props.item.breakStart);
    const breakFinish = new Date(props.item.breakFinish);
    const dayFinish = new Date(props.item.dayFinish);

    const dayMinutes = new Date(Math.abs(dayFinish - dayStart) / (60 * 1000));
    const breakMinutes = new Date(
        Math.abs(breakFinish - breakStart) / (60 * 1000)
    );
    const totalMinutes = dayMinutes - breakMinutes;

    console.log(totalMinutes);
    const hours = isNaN(totalMinutes)
        ? 'Missing Data'
        : `${parseInt(totalMinutes / 60)}:${totalMinutes % 60}`;
    return (
        <tr>
            <td>{props.item.empName}</td>
            <td>{dayStart.toLocaleTimeString('en-GB')}</td>
            <td>{breakStart.toLocaleTimeString('en-GB')}</td>
            <td>{breakFinish.toLocaleTimeString('en-GB')}</td>
            <td>{dayFinish.toLocaleTimeString('en-GB')}</td>
            <td>{hours}</td>
        </tr>
    );
};

export default class HoursReport extends Component {
    constructor(props) {
        super(props);

        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            items: [],
            date: this.today,
        };
    }

    async componentDidMount(date = this.state.date) {
        try {
            const res = await axios.get(URLS.ReportUrl(date));
            this.setState({ items: res.data });
        } catch (err) {
            console.log(`cannot get items`);
        }
    }

    itemList() {
        return Object.keys(this.state.items).map(id => (
            <Item item={this.state.items[id]} key={id}></Item>
        ));
    }
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        try {
            this.componentDidMount(this.state.date);
        } catch (err) {
            console.log(`cannot get items`);
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='date'
                            name='date'
                            onChange={this.handleInputChange}
                            value={this.state.date}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='submit'
                            value='Select Date'
                            className='btn btn-primary '
                        />
                    </div>
                </form>
                <h3>Hours Report</h3>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Start Time</th>
                            <th>Break Start Time</th>
                            <th>Break Finish Time</th>
                            <th>Day Finish Time</th>
                            <th>Total Hours</th>
                        </tr>
                    </thead>
                    <tbody className=''>{this.itemList()}</tbody>
                </table>
            </div>
        );
    }
}
