import React , { Component } from 'react'
import UserAccess from '../UserAccess/UserAccess'

import './PersonalMain.css'

export default class PersoanlMain extends Component {

    state = {
        testNew : true,
        firstMount : true,
        email : '',
        pass : '',
        passConf : ''
    }

    changeUserType = () => {
        this.setState({ testNew : !this.state.testNew, firstMount : false })
    }


    render(){
        return (
            <div>
                <h4 className="card" style={{color:'red'}}>User data base - coming soon</h4>
                { this.state.testNew ?
                    <UserAccess
                        className={ this.state.firstMount ?  "personalMain" : "personalMainSecond" }
                        emailInputHandler = { (event) => { this.setState({ email : event.target.value } ) } }
                        passInputHandler = { (event) => { this.setState({ pass : event.target.value } ) } }
                    >
                        <div className="col-12">
                            <button onClick={ () => console.log(this.state.email, this.state.pass)} className="btn btn-primary mb-2">Submit</button>
                            <h6>Or</h6>
                            <button onClick={ this.changeUserType } className="btn btn-outline-warning mb-2">Create an account</button>
                        </div>
                    </UserAccess>
                :
                    <UserAccess
                        emailInputHandler = { (event) => { this.setState({ email : event.target.value } ) } }
                        passInputHandler = { (event) => { this.setState({ pass : event.target.value } ) } }
                        pass2InputHandler = { (event) => { this.setState({ pass2 : event.target.value } ) } }
                        className="personalNew"
                        new={true}
                        click = { this.changeUserType }
                    >
                        <div className="col-12">
                            <button onClick={ () => console.log(this.state.email, this.state.pass, this.state.pass2)}  className="btn btn-warning mb-2">Confirm</button>
                        </div>
                    </UserAccess>
                }
            </div>
        )
    }
}