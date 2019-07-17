import React,{ Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './containers/Main/Main'

import './App.css';

class App extends Component{
  render () {
      return (
          <BrowserRouter>
                <Main/>
              {/*<div className="App ">*/}
              {/*    <div className="container">*/}
              {/*        <br/>*/}
              {/*        <div className="logo"></div>*/}
              {/*        <nav className="row navbar navbar-expand-lg navbar-light navbar-text">*/}
              {/*            <div>*/}
              {/*                <button className="btn mx-1 btn-info mx-1 my-2 my-sm-0">Forecast</button>*/}
              {/*                <button className="btn mx-1 btn-info my-2 my-sm-0">Something</button>*/}
              {/*                <button className="btn mx-1 btn-info my-2 my-sm-0">Something</button>*/}
              {/*            </div>*/}
              {/*        </nav>*/}
              {/*    </div>*/}
              {/*    <div id="sun">*/}
              {/*        <div id="rings">*/}
              {/*            <div></div>*/}
              {/*            <div></div>*/}
              {/*            <div></div>*/}
              {/*            <div></div>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*    <div className="ocean ">*/}
              {/*        <div className="wave"></div>*/}
              {/*        <div className="wave"></div>*/}
              {/*    </div>*/}
              {/*</div>*/}
          </BrowserRouter>
      )
  }
}

export default App;
