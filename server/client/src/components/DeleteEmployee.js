import React, { useState } from 'react';
import axios from 'axios';
import { URLS } from '../consts';
import EmployeeList from './EmployeeList';

const DeleteEmployee = props => {
    const DEFAULT_OPTION = 'Choose...';

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(
        DEFAULT_OPTION
    );
    const [errorNotChosen, setErrorNotChosen] = useState(false);

    const onChangeSelectEmployee = e => {
        setSelectedEmployeeId(e.target.value);
        setErrorNotChosen(false);
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (selectedEmployeeId !== DEFAULT_OPTION) {
            try {
                const res = await axios.delete(
                    URLS.DeleteEmployeeUrl(selectedEmployeeId)
                );
                console.log(res.data);
                setSelectedEmployeeId(DEFAULT_OPTION);
            } catch (err) {
                console.log(`error - cannot post new todo: ${err}`);
            }
            return;
        }

        setErrorNotChosen(true);
    };

    const handleCloseAlert = () => {
        setErrorNotChosen(false);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <EmployeeList
                    onChangeSelectEmployee={onChangeSelectEmployee}
                    selectedEmployeeId={selectedEmployeeId}
                    DEFAULT_OPTION={DEFAULT_OPTION}
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
            {errorNotChosen && (
                <div className='alert alert-danger' role='alert'>
                    Please choose employee from the list
                    <button
                        type='button'
                        className='close'
                        data-dismiss='alert'
                        aria-label='Close'
                        onClick={handleCloseAlert}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
            )}
        </div>
    );
};
export default DeleteEmployee;
