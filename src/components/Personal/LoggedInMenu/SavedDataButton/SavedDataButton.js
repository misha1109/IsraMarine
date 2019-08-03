import React from 'react'

export default function savedDataButton(props){
    return (
        <div className="card btn-outline-info" style={{borderRadius:'10px'}}
            onClick={ props.click }
        >
            <h6>Date: { props.date }</h6>
            <h6>Position: { props.position }</h6>
        </div>
    )
}