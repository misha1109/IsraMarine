import React,{ Component } from 'react';
import BackSeaSun from './Background/Background'
import Navbar from './Navbar/Navbar'
import { Route } from 'react-router-dom';
import './Main.css'


export default class Main extends Component{
    render(){
        return (
            <div className="Main">
                <Route path="/" component={Navbar}/>
                <Route path="/" component={BackSeaSun}/>
            </div>
        )
    }
}

