import { BrowserRouter, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import CreateEmployee from './components/CreateEmployee';
import HourLogger from './components/HourLogger';
import HoursReport from './components/HoursReport';

function App() {
    return (
        <BrowserRouter>
            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <a href='/' className='navbar-brand'>
                        <img src={logo} alt='logo' width='30' height='30' />
                    </a>
                    <Link to='/' className='navbar-brand'>
                        MERN App
                    </Link>
                    <div className='collpase navbar-collapse'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='navbar-item'>
                                <Link to='/' className='nav-link'>
                                    Hour Logger
                                </Link>
                            </li>
                            <li className='navbar-item'>
                                <Link to='/create' className='nav-link'>
                                    Create Employee
                                </Link>
                            </li>
                            <li className='navbar-item'>
                                <Link to='/report' className='nav-link'>
                                    Hours Report
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Route path='/' exact component={HourLogger} />
                <Route path='/create' component={CreateEmployee} />
                <Route path='/report' component={HoursReport} />
            </div>
        </BrowserRouter>
    );
}

export default App;
