import React , {Component} from 'react'
import Chart from './Chart/Chart'
import TideNav from './TideNavigation/TideNavigation'
import { reqWeather} from "../../marinWeatherAPI/tempRequestsHandler";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

export default class TideChart extends Component {
     state = {
         day : 0,
         possitions : [{
             name : 'Ashdod',
             coordinate : ["31.50", "34.37"],
            },
             {
                 name : 'Ashkelon',
                 coordinate : ["31.40", "34.33"],
             },
             {
                 name : 'Tel-Aviv',
                 coordinate : ["32.4", "34.45"],
             },
             {
                     name : 'Haifa',
                     coordinate : ["32.49", "35.0"],
             }
         ],
         loaded : false,
     }

     async componentDidMount() {
         const initTides = async () =>{
             let tempLoaded = []
             for(let value of this.state.possitions){
                 await reqWeather(value.coordinate).then( res => {
                     tempLoaded.push( {
                         name : value.name,
                         tides : res.data.weather
                        })
                     if(tempLoaded.length == this.state.possitions.length){
                         const dates = res.data.weather.map( el => {
                             return el.date
                         })
                         this.setState({
                             date : dates,
                             loaded : tempLoaded
                         })
                     }
                 })
             }
         }
         initTides()

    }

    changeDay = (val) => {
         let newDay = this.state.day + val
         this.setState({
             day : newDay
         })
    }

    render(){
        return (
            <div>
                { !this.state.loaded ?
                    <div className="pt-5">
                        <LoadingSpinner />
                    </div>
                    :null}
                <div>
                    { this.state.loaded ?
                        <TideNav
                            date = { this.state.date[this.state.day] }
                            click = { this.changeDay }
                            day = { this.state.day }
                        />
                    :null}
                </div>
                { this.state.loaded ?
                    this.state.loaded.map((el,i) => {
                        return (
                            <Chart
                                key = { el.name + i }
                                name = { el.name }
                                tides = { el.tides[this.state.day] }
                            >
                            </Chart>
                        )
                    })
                : null }
            </div>
        )
    }

}