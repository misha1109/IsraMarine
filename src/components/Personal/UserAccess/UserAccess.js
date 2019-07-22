import React from 'react'
export default function persoanlMain(props){

    return (
        <div className={ props.className }>
            <div style={{backgroundColor:"#F0F8FF",opacity:"0.9"}} className="container card ma-0 pa-0 ">
                <div className="row">
                    <div className="col-12">
                        <h5>{ props.header }</h5>
                    </div>
                    { props.new ?
                        <div className="col-3 col-md-2 col-lg-1">
                            <button onClick={ () => props.click() } className="btn btn-outline-warning">Back</button>
                        </div>
                    : null }
                    <div className="col-12">
                        <form >
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1"><h6>Email address</h6></label>
                                <input type="email" className="form-control"
                                       aria-describedby="emailHelp" placeholder="Enter email"
                                        onChange={ props.emailInputHandler }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1"><h6>Password</h6></label>
                                <input type="password" className="form-control"
                                       placeholder="Password"
                                       onChange={ props.passInputHandler }
                                />
                            </div>
                            { props.new ?
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1"><h6>Confirm Password</h6></label>
                                    <input type="password" className="form-control"
                                           placeholder="Password"
                                           onChange={ props.pass2InputHandler }
                                    />
                                </div>
                            :null }
                        </form>
                    </div>
                    { props.children }
                </div>
            </div>
        </div>
    )
}