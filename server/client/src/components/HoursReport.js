import React, { useState, useEffect } from 'react';
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

    // console.log(totalMinutes);
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

const HoursReport = props => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const [items, setItems] = useState([]);
    const [date, setDate] = useState(today);

    useEffect(() => {
        fetchReportData();
    }, [date]);

    const fetchReportData = async (date = today) => {
        try {
            const res = await axios.get(URLS.ReportUrl(date));
            setItems(res.data);
        } catch (err) {
            console.log(`cannot get items`);
        }
    };

    const itemList = () => {
        return Object.keys(items).map(id => (
            <Item item={items[id]} key={id}></Item>
        ));
    };

    const onSubmit = e => {
        e.preventDefault();
        try {
            fetchReportData(date);
        } catch (err) {
            console.log(`cannot get items`);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='date'
                        name='date'
                        onChange={e => setDate(e.target.value)}
                        value={date}
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
                <tbody className=''>{itemList()}</tbody>
            </table>
        </div>
    );
};
export default HoursReport;
