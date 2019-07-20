import React from 'react'
import './TideMain.css'
import { NavLink , Route , Switch } from 'react-router-dom'
import TideChart from '../TideChart/TideChart'
import { FaGlobeAmericas, FaStarOfDavid} from 'react-icons/fa';


export default class Main extends React.Component{

    state = {
        bStyleActive : {
            fontSize : '6vh',
        },
        bStyle : {
            fontSize : '9vh'
        },
        bActiveNow : {
            opacity : '0.3',
        },
        pressed : [false,false],
    }

    setIconStyle = (option) => {
        this.setState({
            pressed : option
        })
    }

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
                            className="col-3"
                            style={this.state.bStyle}
                            activeStyle = { this.state.pressed[0] ? {...this.state.bActiveNow ,...this.state.bStyleActive} : null }
                            onClick = { () => this.setIconStyle([1,0]) }
                        >
                            <FaStarOfDavid style={{color:'#0D47A1'}}/>
                        </NavLink>
                        <div className="col-2"></div>
                        <NavLink
                            exact
                            to={ this.props.match.url +'/global' }
                            className="col-3"
                            style={this.state.bStyle}
                            activeStyle={this.state.bStyleActive}
                            activeStyle = { this.state.pressed[1] ? {...this.state.bActiveNow ,...this.state.bStyleActive} : null }
                            onClick = { () => this.setIconStyle([0,1]) }
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