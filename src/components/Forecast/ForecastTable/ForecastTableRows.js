import React from 'react'
import ForecastHeader from "../ForecastHeader/ForecastHeader";
import { FaCrosshairs, FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { TiWaves} from 'react-icons/ti';


export default function forecastRows(props){
    return (
        <div
        >
            <ForecastHeader
                headline="Position"
                cell1={ "Latitude: " + props.coordinates[0]}
                cell2={ "Longtitude: " + props.coordinates[1]}
            >
                <FaCrosshairs/>
            </ForecastHeader>
            <div className="dropdown-divider"></div>
            <ForecastHeader
                headline="Temperature C"
                cell1={ "Air: " + props.forecast.tempC }
                cell2={ "Water: " + props.forecast.waterTemp_C}
            >
                <FaTemperatureHigh/>
            </ForecastHeader>
            <div className="dropdown-divider"></div>
            <ForecastHeader
                headline="Wind"
                cell1={ "kmh: " + props.forecast.windspeedKmph }
                cell2={ "degree: " + props.forecast.winddirDegree}
            >
                <FaWind/>
            </ForecastHeader>
            <div className="dropdown-divider"></div>
            <ForecastHeader
                headline="Wave"
                cell1={ "Max height: " + props.forecast.sigHeight_m }
                cell2={ "Swell height: " + props.forecast.swellHeight_m}
            >
                <TiWaves/>
            </ForecastHeader>
        </div>
    )

}