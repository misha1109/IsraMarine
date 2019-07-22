import React from 'react'

export default function pathErr(){
    return (
        <div className="container pa-0 ma-0">
            <div style={{opacity:0.85}} className="alert alert-danger" role="alert">
                <h5 className="alert-heading">404</h5>
                <h6>
                    Invalid path
                </h6>
            </div>
        </div>
    )
}