import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';
import CreateEmployee from './components/CreateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import HourLogger from './components/HourLogger';
import HoursReport from './components/HoursReport';
import NavBar from './components/NavBar';

const links = [
    { to: '/', text: 'Hour Logger' },
    { to: '/create', text: 'Create Employee' },
    { to: '/report', text: 'Hours Report' },
    { to: '/delete', text: 'Delete Employee' },
];

function App() {
    return (
        <BrowserRouter>
            <div className='container'>
                <NavBar
                    mainLink={{ to: '/', text: 'MERN APP' }}
                    links={links}
                />

                <Route path='/' exact component={HourLogger} />
                <Route path='/create' component={CreateEmployee} />
                <Route path='/report' component={HoursReport} />
                <Route path='/delete' component={DeleteEmployee} />
            </div>
        </BrowserRouter>
    );
}

export default App;
