import React from "react";
import './NoDataMsg.css'

export default function nodata(){
    return (
        <div style={{opacity:0.85}} className="alert alert-warning scaleMsg" role="alert">
            <h5 className="alert-heading">No data!</h5>
            <h6>
                Choose a different location
            </h6>
            <h6>
                Try closer to the shoreline
            </h6>
        </div>
    )
}

