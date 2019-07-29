import React,{ Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Forecast from '../../../components/Forecast/Forecast'
import TideChartMain from '../../../components/TideChart/TideMain/TideMain'
import PersonalMain from '../../../components/Personal/PersonalMain/PersonalMain'
import InfoBtn from './InfoBtn'
import './Navbar.css';

export default class Navbar extends Component {

    render(){
        return (
            <div className="container">
                <InfoBtn/>
                <br/>
                <NavLink
                    to="/"
                ><div className="logo"></div>
                </NavLink>
                    <div className="row navBtnAnime mb-4 ">
                        <NavLink
                            to="/forecast/"
                            className="col btn btn-info ml-2"
                            activeClassName="navBtnAnimeTop active"
                        >Forecast</NavLink>
                        <NavLink
                            to="/tidechart"
                            className="col btn btn-info mr-2 ml-2"
                            activeClassName="navBtnAnimeTop active"
                        >Tide Chart
                        </NavLink>
                        <NavLink
                            to="/personal"
                            className="col btn btn-info mr-2"
                            activeClassName="navBtnAnimeTop active"
                        >Personal
                        </NavLink>
                    </div>
                <Switch>
                    <Route path="/forecast" component={Forecast}/>
                    <Route path="/tidechart" component={TideChartMain}/>
                    <Route path="/personal" component={PersonalMain}/>
                </Switch>
            </div>
        )
    }
}
