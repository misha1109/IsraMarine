import React,{ Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Forecast from '../../../components/Forecast/Forecast'
import TideChartMain from '../../../components/TideChart/TideMain/TideMain'
import PersonalMain from '../../../components/Personal/PersonalMain/PersonalMain'

import './Navbar.css';

export default class Navbar extends Component {
    render(){
        return (
            <div className="container">
                <br/>
                <div className="logo"></div>
                <nav className="row navbar navbar-expand-lg navbar-light navbar-text">
                    <div>
                        <NavLink
                            to="/forecast/"
                            className="btn mx-1 btn-info mx-1 my-2 my-sm-0"
                        >Forecast</NavLink>
                        <NavLink
                            to="/tidechart"
                            className="btn mx-1 btn-info my-2 my-sm-0"
                        >Tide Chart
                        </NavLink>
                        <NavLink
                            to="/personal"
                            className="btn mx-1 btn-info my-2 my-sm-0"
                        >Personal</NavLink>
                    </div>
                </nav>
                <Route path="/forecast" component={Forecast}/>
                <Route path="/tidechart" component={TideChartMain}/>
                <Route path="/personal" component={PersonalMain}/>
            </div>
        )
    }
}
