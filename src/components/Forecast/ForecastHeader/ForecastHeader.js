import React from 'react'

export default function ForecastHeader(props){
    let line = props.cell2? "col-6" : "col-12"

    return (
        <div className="container pa-0 ma-0" style={{textAlign: 'center'}}>
            <div className="row">
                <h6 className="col-12" style={{fontSize:'small'}}>{props.headline}</h6>
                <h6 className={ line } style={{fontSize:'small'}}>{props.cell1}</h6>
                <h6 className={ line } style={{fontSize:'small'}}>{props.cell2}</h6>
            </div>
        </div>
    )
}