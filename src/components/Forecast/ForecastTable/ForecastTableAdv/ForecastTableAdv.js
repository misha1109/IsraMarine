import React from 'react';
import ForecastHeader from "../../ForecastHeader/ForecastHeader";
import { WiNightCloudyWindy, WiHumidity, WiBarometer} from 'react-icons/wi'
import { FaLowVision } from 'react-icons/fa'

export default function(props) {
    return (
       <div>
           <ForecastHeader
               headline="Visibility"
               cell1={ "km: " + props.forecast.sigHeight_m }
               cell2={ "mile: " + props.forecast.swellHeight_m}
           >
                  <FaLowVision/>
           </ForecastHeader>
           <div className="dropdown-divider"></div>
           <ForecastHeader
               headline="Pressure"
               cell1={ props.forecast.pressure }
           >
                  <WiBarometer/>
           </ForecastHeader>
           <div className="dropdown-divider"></div>
           <ForecastHeader
               headline="Humidity"
               cell1={ props.forecast.humidity }
           >
                  <WiHumidity/>
           </ForecastHeader>
           <div className="dropdown-divider"></div>
           <ForecastHeader
               headline="Cloud cover"
               cell1={ props.forecast.cloudcover }
           >
                  <WiNightCloudyWindy/>
           </ForecastHeader>
           <div className="dropdown-divider"></div>
       </div>
    )
}