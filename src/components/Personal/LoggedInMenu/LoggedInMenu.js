import React , { Component } from 'react'
import './LoggedInMenu.css'
import { WiDayCloudyGusts } from 'react-icons/wi'
import { FaChartArea , FaUserAlt} from 'react-icons/fa'
import SavedData from './SavedData/SavedData'

import { connect } from 'react-redux'
import {USER_SET_SAVED} from "../../../store/actions";
import { httpGetTides , httpGetForecasts } from "../../../userAPI/requestHandler";

class LoggedInMenu extends Component{

    state = {
        showForecasts: false,
        showTides : false,
        showStyle : {
            border:"1px solid black",
            marginTop:"8px"
        }
    }

    async componentWillMount(){
        const tempUser ='m1@g.c'
        const tides = await httpGetTides(tempUser)
        const forecasts = await httpGetForecasts(tempUser)
        this.props.setSaved(tides.message,forecasts.message)
    }

    render() {
        return (
            <div style={{backgroundColor:"#F0F8FF",opacity:"0.9"}} className="container card personalMain pt-2 pb-2">
                <div className="row pt-3 pb-3">
                    <FaUserAlt
                        style={{fontSize:'20px'}}
                        onClick={ () => this.setState({showForecasts : false , showTides : false})}
                        className="col-12"/>
                    <h6 className="col-12 pb-1">{ this.props.loggedUser }</h6>
                    <button
                        onClick={ () => this.setState({showForecasts : true , showTides : false})}
                        className="btn-warning col ml-4 LoggedInMainBtn"
                        style={this.state.showForecasts ? this.state.showStyle:null}
                        >
                        <h6>Saved Forecasts</h6>
                        <WiDayCloudyGusts className="LoggedInMainIcon"/>
                    </button>
                    <button
                        onClick={ () => this.setState({showForecasts : false , showTides : true})}
                        className="btn-warning col ml-2 mr-4 LoggedInMainBtn"
                        style={this.state.showTides ? this.state.showStyle:null}
                    >
                        <h6>Saved Tides</h6>
                        <FaChartArea className="LoggedInMainIcon"/>
                    </button>
                </div>
                { this.state.showForecasts ?
                    <SavedData
                        type="forecasts"
                        data={this.props.savedForecasts}
                    />
                : null}
                { this.state.showTides ?
                    <SavedData
                        type="tides"
                        data={this.props.savedForecasts}
                    />
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser : state.user,
        savedTides : state.tides,
        savedForecasts : state.forecasts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSaved : (tides,forecasts) => dispatch({
            type : USER_SET_SAVED,
            tides : tides,
            forecasts : forecasts
        })
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(LoggedInMenu)
