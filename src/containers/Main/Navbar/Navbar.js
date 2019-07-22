import React,{ Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Forecast from '../../../components/Forecast/Forecast'
import TideChartMain from '../../../components/TideChart/TideMain/TideMain'
import PersonalMain from '../../../components/Personal/PersonalMain/PersonalMain'
import './Navbar.css';

export default class Navbar extends Component {

    render(){
        return (
            <div className="container">
                <br/>
                <NavLink
                    to="/"
                ><div className="logo"></div>
                </NavLink>
                <nav className="row navbar navbar-expand-lg navbar-light navbar-text">
                    <div className="navBtnAnime mb-3">
                        <NavLink
                            to="/forecast/"
                            className=" btn mx-1 btn-info my-2 my-sm-0"
                            activeClassName="navBtnAnimeTop active"
                        >Forecast</NavLink>
                        <NavLink
                            to="/tidechart"
                            className=" btn mx-1 btn-info my-2 my-sm-0"
                            activeClassName="navBtnAnimeTop active"
                        >Tide Chart
                        </NavLink>
                        <NavLink
                            to="/personal"
                            className="btn mx-1 btn-info my-2 my-sm-0 "
                            activeClassName="navBtnAnimeTop active"
                        >Personal</NavLink>
                    </div>
                </nav>
                <Switch>
                    <Route path="/forecast" component={Forecast}/>
                    <Route path="/tidechart" component={TideChartMain}/>
                    <Route path="/personal" component={PersonalMain}/>
                </Switch>
            </div>
        )
    }
}
