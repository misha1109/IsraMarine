import React from 'react'
import { NavLink } from 'react-router-dom'

export default function apiAlert(){
    return(
        <NavLink
            to="/"
        >
            <div style={{opacity :'0.8'}} className="container pa-0 ma-0">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Sorry!</h4>
                    <h6>The API limit was reached</h6>
                    <h6>Please try again later</h6>
                </div>
            </div>
        </NavLink>

    )
}