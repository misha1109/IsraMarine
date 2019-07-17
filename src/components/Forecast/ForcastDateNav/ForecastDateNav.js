import React from 'react'
import './ForecastDateNav.css'

export default function ForecastDateNave(props) {
    const hourAndDay = props.hourAndDay

    return (
            <div className="row border  center-text">
                <button onClick={() => props.click(-24)} style={{fontSize: "small"}} disabled={hourAndDay.day == 0}
                        className="btn btn-info btn-sm col-2">-24h
                </button>
                <button onClick={() => props.click(-3)} style={{fontSize: "small"}} disabled={hourAndDay.hour == 0}
                        className="btn btn-primary btn-sm col-2">-3h
                </button>
                <div className="container ma-0 col-4">
                    <div className="row">
                        <h6 className="col-12" style={{fontSize: 'small'}}>{props.date}</h6>
                        <h6 className="col-12" style={{fontSize: 'small'}}>{props.hour}</h6>
                    </div>
                </div>
                <button  onClick={() => props.click(+3)} style={{fontSize: "small"}} disabled={hourAndDay.hour == 7}
                         className="btn btn-primary btn-sm col-2">+3h
                </button>
                <button onClick={() => props.click(+24)} style={{fontSize: "small"}} disabled={hourAndDay.day == 6}
                        className="btn btn-info btn-sm col-2">+24h
                </button>
            </div>
    )
}