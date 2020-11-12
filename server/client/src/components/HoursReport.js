import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = props => {
    const dayStart = new Date(props.item.dayStart);
    const breakStart = new Date(props.item.breakStart);
    const breakFinish = new Date(props.item.breakFinish);
    const dayFinish = new Date(props.item.dayFinish);
    const dayMinutes = new Date(Math.abs(dayFinish - dayStart) / (60 * 1000));
    const breakMinutes = new Date(
        Math.abs(breakFinish - breakStart) / (60 * 1000)
    );

    const hours =
        dayMinutes != 'Invalid Date'
            ? `${parseInt(dayMinutes / 60)}:${dayMinutes % 60}`
            : 'Missing Data';
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
        this.state = {
            items: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.get('http://localhost:4000/report');
            this.setState({ items: res.data });
        } catch (err) {
            console.log(`cannot get items`);
        }
    }

    itemList() {
        return Object.keys(this.state.items).map((id, i) => (
            <Item item={this.state.items[id]} key={id}></Item>
        ));

        // return this.state.items.map((item, i) => {
        //     return <Item item={item} key={i}></Item>;
        // });
    }

    render() {
        return (
            <div>
                <h3 style={{ marginTop: 15 }}>Hours Report</h3>
                <table
                    className='table table-striped'
                    style={{ marginTop: 20 }}
                >
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
                    <tbody>{this.itemList()}</tbody>
                </table>
            </div>
        );
    }
}
