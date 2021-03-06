import React from 'react'

const tideNav = React.forwardRef((props, ref) => {
    return (
        <div ref={ ref } className="container">
            <div className="row">
                <button disabled = { props.day == 0 } style={{borderRadius:"5px"}} className="btn btn-sm btn-warning col-4" onClick={ () =>  props.click(-1) } >Previous day</button>
                <h6 className="col-4">{ props.date }</h6>
                <button disabled = { props.day == 6 } style={{borderRadius:"5px"}} className="btn btn-sm btn-warning col-4" onClick={ () =>  props.click(+1) } >Next day</button>
            </div>
        </div>
    )
} )

export default tideNav