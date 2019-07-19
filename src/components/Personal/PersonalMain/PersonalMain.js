import React , { Component } from 'react'
import './PersonalMain.css'

export default class PersoanlMain extends Component {

    render(){
        return (
            <div className="personalMain">
                <div style={{backgroundColor:"#F0F8FF"}} className="container card ma-0 pa-0 ">
                    <div className="row">
                        <div className="col-12">
                            <h5>Sign in</h5>
                        </div>
                        <div className="col-12">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control"
                                           aria-describedby="emailHelp" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control"
                                           placeholder="Password"/>
                                </div>
                            </form>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary mb-2">Submit</button>
                            <br/>
                            <button className="btn btn-outline-warning mb-2">Create an account</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}