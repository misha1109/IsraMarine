import React from 'react';
import ForecastHeader from "../../ForecastHeader/ForecastHeader";

export default function(props) {
    return (
       <div>
           <ForecastHeader
               headline="Visibility"
               cell1={ "km: " + props.forecast.sigHeight_m }
               cell2={ "mile: " + props.forecast.swellHeight_m}
           >
           </ForecastHeader>
           <div className="dropdown-divider"></div>
           <ForecastHeader
               headline="Pressure"
               cell1={ props.forecast.pressure }
           >
           </ForecastHeader>
           <div className="dropdown-divider"></div>
           <ForecastHeader
               headline="Humidity"
               cell1={ props.forecast.humidity }
           >
           </ForecastHeader>
           <div className="dropdown-divider"></div>
           <ForecastHeader
               headline="Cloud cover"
               cell1={ props.forecast.cloudcover }
           >
           </ForecastHeader>
           <div className="dropdown-divider"></div>
       </div>
    )
}