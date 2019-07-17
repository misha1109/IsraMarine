import React from 'react';
import './ForecastTable.css'

export default function(props){
    const transformDate = () => {
        let arr = props.date.split('-')
        arr = arr.reverse()
        return arr.join('-')
    }
    return (
        <div className="card">
            <div className="container">
                <div className="row border  center-text">
                    <button disabled={ true } className="btn btn-info btn-sm col-2"></button>
                    <button disabled={ true } className="btn btn-primary btn-sm col-2">123</button>
                    <h6 className="col-4 pt-2" style={ {fontSize : 'small'}}>{ transformDate(props.date) }</h6>
                    <button className="btn btn-primary btn-sm col-2">123</button>
                    <button className="btn btn-info btn-sm col-2">123</button>
                </div>
                <div className="row">
                    <h6 className="col-6">Latitude: { props.coordinates[0]}</h6>
                    <h6 className="col-6">Longtitude: { props.coordinates[1]}</h6>
                </div>
                <div className="dropdown-divider"></div>
                <div className="row">
                    <h6 className="col">123</h6>
                </div>
                <div className="row">
                    <button className="col">123</button>
                </div>
            </div>
        </div>
    )
}