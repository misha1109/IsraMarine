import React,{ Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Forecast from '../../../components/Forecast/Forecast'
import TideChart from '../../../components/TideChart/TideChart'

import './Navbar.css';

export default class Navbar extends Component {
    render(){
        return (
            <div className="container">
                <br/>
                <div className="logo"></div>
                <nav className="row navbar navbar-expand-lg navbar-light navbar-text">
                    <div>
                        <button className="btn mx-1 btn-info mx-1 my-2 my-sm-0">
                            <NavLink
                                to="/forecast/"
                                exact
                                style={{ color:'white' }}
                            >Forecast</NavLink>
                        </button>
                        <button className="btn mx-1 btn-info my-2 my-sm-0">
                            <NavLink
                                to="/tidechart"
                                exact
                                style={{ color:'white' }}
                            >Tide Chart</NavLink>
                        </button>
                        <button className="btn mx-1 btn-info my-2 my-sm-0">Something</button>
                    </div>
                </nav>
                <Route path="/forecast" component={Forecast}/>
                <Route path="/tidechart" component={TideChart}/>
            </div>
        )
    }
}
