import React , { Component } from 'react'
import UserAccess from '../UserAccess/UserAccess'
import LoggedInMenu from '../LoggedInMenu/LoggedInMenu'
import { connect } from 'react-redux'
import { USER_LOGIN } from '../../../store/actions'

import { httpLogin , httpSignUp } from '../../../userAPI/requestHandler'

import './PersonalMain.css'

class PersonalMain extends Component {

    state = {
        newUser : true,
        firstMount : true,
        email : '',
        pass : '',
        passConf : '',
        errMsg : null
    }
    
    changeUserType = () => {
        this.setState({ newUser : !this.state.newUser, firstMount : false })
    }

    login = async (email, pass) => {
        const reply = await httpLogin(email, pass)
        if(reply.success){
            this.props.reduxLogin(email)
        }

        else{
            this.setState({
                errMsg : reply.message
            })
        }
    }

    signUp = async (email,pass1,pass2) => {
        let errHolder = false
        if(pass1 === pass2){
            const reply = await httpSignUp(email,pass1)
            if(reply.success){
                await this.login(email,pass1)
                this.setState({
                    errMsg : null
                })
            }
            else{
                errHolder = reply.message
            }
        }
        else{
            if(!(email&&pass1&&pass2)){
                errHolder = "Fill all fields"
            }
            else{
                errHolder = "Passwords dont match"
            }
        }

        if(errHolder){
            this.setState({
                errMsg : errHolder
            })
        }
    }

    render(){
        return (
            <div className="pb-2">
                { this.props.loggedUser ?
                    <LoggedInMenu/>
                :
                    <div>
                        { this.state.newUser ?
                            <UserAccess
                                className={ this.state.firstMount ?  "personalMain" : "personalMainSecond" }
                                emailInputHandler = { (event) => { this.setState({ email : event.target.value } ) } }
                                passInputHandler = { (event) => { this.setState({ pass : event.target.value } ) } }
                            >
                                <div className="col-12">
                                    { this.state.errMsg ?
                                        <h6 className="container" style={{color:'red'}}>{ this.state.errMsg }</h6>
                                    : null}
                                    <button onClick={ () => this.login( this.state.email, this.state.pass ) } className="btn btn-primary mb-2">Submit</button>
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
                                    { this.state.errMsg ?
                                        <h6 className="container" style={{color:'red'}}>{ this.state.errMsg }</h6>
                                    : null}
                                    <button onClick={ () => this.signUp(this.state.email, this.state.pass, this.state.pass2)}  className="btn btn-warning mb-2">Confirm</button>
                                </div>
                            </UserAccess>
                        }
                    </div>
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loggedUser : state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reduxLogin : (email) => dispatch({
            type : USER_LOGIN,
            email : email,
        })
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(PersonalMain)