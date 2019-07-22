import React,{ Component } from 'react';
import BackSeaSun from './Background/Background'
import Navbar from './Navbar/Navbar'
import { Route , Switch } from 'react-router-dom';
import './Main.css'
import APIalert from "../../components/APIkeyProblem/APIkeyProblem";
import PathErr from "../../components/PathErr/PathErr";


export default class Main extends Component{
    render(){
        return (
            <div className="Main">
                <Route path="/" component={Navbar}/>
                <Route path="/" component={BackSeaSun}/>
                <Route exact path="/apiKeyErr" component={APIalert}/>
                <Route path="/404" component = { PathErr }/>
            </div>
        )
    }
}

