import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'

export default function alertInfo(){
    return (
        <button onClick={ () => {
            window.alert("IsraMarine:\nView marine weather and tide charts in Israel and globally.\nChoose the wanted location on the map" +
                " to view the data.")}
        }
                className="btn" style={{right :'7px', position: 'absolute', color :'#FFB74D', fontSize : '20px'}}>
            <FaInfoCircle/>
        </button>
    )
}

