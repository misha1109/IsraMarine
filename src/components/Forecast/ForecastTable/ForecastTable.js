import React, {Component} from 'react';
import './ForecastTable.css'
import '../ForecastHeader/ForecastHeader'
import ForecastHeader from "../ForecastHeader/ForecastHeader";
import ForecastTableAdv from "./ForecastTableAdv/ForecastTableAdv"
import ForecastDateNav from "../ForcastDateNav/ForecastDateNav"
import { FaCrosshairs, FaTemperatureHigh, FaWind} from 'react-icons/fa';
import { TiWaves} from 'react-icons/ti';
import { WiNightCloudyWindy } from 'react-icons/wi'




export default class ForecastTable extends Component {

    state = {
        showAdv : false,
        AdvText : 'Show advanced'
    }

    componentDidUpdate(prevState) {
        if (this.state.showAdv !== prevState.showAdv) {
            window.scrollTo(0,600)
        }
    }

    transformDate = () => {
        let arr = this.props.date.split('-')
        arr = arr.reverse()
        return arr.join('-')
    }

    clickAdvButton(){
        if(this.state.showAdv){
            this.setState({
                AdvText : 'Show advanced',
                showAdv : false
            })
        }
        else{
            this.setState({
                AdvText : 'Hide advanced',
                showAdv : true
            })
        }
    }

    render(){
        return (
            <div className="card mb-3" style={{ borderRadius : "15px" }}>
                <div className="container">
                    <ForecastDateNav
                        click = { this.props.clickNav }
                        date={this.transformDate(this.props.date)}
                        hour={this.props.hour}
                        hourAndDay = { this.props.hourAndDay }
                    ></ForecastDateNav>
                    <ForecastHeader
                        headline="Position"
                        cell1={ "Latitude: " + this.props.coordinates[0]}
                        cell2={ "Longtitude: " + this.props.coordinates[1]}
                    >
                        <FaCrosshairs/>
                    </ForecastHeader>
                    <div className="dropdown-divider"></div>
                    <ForecastHeader
                        headline="Temperature C"
                        cell1={ "Air: " + this.props.forecast.tempC }
                        cell2={ "Water: " + this.props.forecast.waterTemp_C}
                    >
                        <FaTemperatureHigh/>
                    </ForecastHeader>
                    <div className="dropdown-divider"></div>
                    <ForecastHeader
                        headline="Wind"
                        cell1={ "kmh: " + this.props.forecast.windspeedKmph }
                        cell2={ "degree: " + this.props.forecast.winddirDegree}
                    >
                        <FaWind/>
                    </ForecastHeader>
                    <div className="dropdown-divider"></div>
                    <ForecastHeader
                        headline="Wave"
                        cell1={ "Max height: " + this.props.forecast.sigHeight_m }
                        cell2={ "Swell height: " + this.props.forecast.swellHeight_m}
                    >
                        <TiWaves/>
                    </ForecastHeader>
                    <div className="dropdown-divider"></div>
                    {
                        this.state.showAdv ?
                            <ForecastTableAdv
                                forecast = {this.props.forecast}
                            ></ForecastTableAdv>
                        :null}
                    <button onClick={ () => this.clickAdvButton()}
                            className="btn mx-1 btn-info my-2 my-sm-0">
                            {this.state.AdvText}
                    </button>
                </div>
            </div>
        )
    }

}
