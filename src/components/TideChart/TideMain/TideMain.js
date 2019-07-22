import React from 'react'
import './TideMain.css'
import { NavLink , Route , Switch } from 'react-router-dom'
import TideChart from '../TideChart/TideChart'
import { FaGlobeAmericas, FaStarOfDavid} from 'react-icons/fa';


export default class Main extends React.Component{

    render(){
        console.log(this.props.match.url)
        return (
            <div>
                <div className="container ">
                    <div className="row pb-3">
                        <div className="col-2"></div>
                        <NavLink
                            exact
                            to={ this.props.match.url +'/israel' }
                            className="col-3 chartTypeBtn"
                            activeClassName="chartTypeBtnActive active"
                        >
                            <FaStarOfDavid style={{color:'#0D47A1'}}/>
                        </NavLink>
                        <div className="col-2"></div>
                        <NavLink
                            exact
                            to={ this.props.match.url +'/global' }
                            className="col-3 chartTypeBtn"
                            activeClassName="chartTypeBtnActive active"
                        >
                            <FaGlobeAmericas style={{color:'#0D47A1'}}/>
                        </NavLink>
                        <div className="col-2"></div>
                    </div>
                </div>
                <Route
                    exact
                    path={ this.props.match.url +'/:type' }
                    component={TideChart}>
                </Route>
            </div>
    )
    }
}