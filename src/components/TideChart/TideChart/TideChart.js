import React , {Component} from 'react'
import Chart from '../Chart/Chart'
import TideNav from '../TideNavigation/TideNavigation'
import { reqWeather } from "../../../marinWeatherAPI/tempRequestsHandler";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import {mapInit, translateCoord} from "../../../mapbox/mapboxInit";
import mapboxgl from "mapbox-gl";
import { possitionsIsrael } from './possitionsIsrael.js'
import { Redirect } from 'react-router-dom'

import './TideChart.css'



export default class TideChart extends Component {
     state = {
         day : 0,
         loaded : false,
         spinLoader : false,
         showMap : '',
         type : null
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
         if(this.props.match.params.type != this.state.type){
             if(this.props.match.params.type!='israel'){
                 this.initMapbox({
                     coords : {
                         longitude :14.37,
                         latitude : 42.31
                     }
                 })
                 this.setState({
                     possitions : null,
                     showMap : "",
                     loaded : false,
                     type : 'global'
                 })
             }

            else{
                 this.setState({
                     showMap : 'none',
                     map : null,
                     type : 'israel',
                 })

                 this.initTides(possitionsIsrael)
             }
         }
     }

    async componentDidMount() {
         if(this.props.match.params.type == 'israel'){
             this.initTides(possitionsIsrael)
         }

         else{
             this.initMapbox()
         }
    }

    initTides = async (possitions) =>{
         if( await reqWeather([0,0]) ==429 ){
             this.setState({
                 apiErr : true
             })
         }

         else{
             this.setState({
                 spinLoader : true
             })
             let tempLoaded = []
             for(let value of possitions){
                 await reqWeather(value.coordinate).then( res => {
                     tempLoaded.push( {
                         name : value.name,
                         tides : res.data.weather
                     })
                     if(tempLoaded.length == possitions.length){
                         console.log(res.data.weather)
                         if(res.data.weather){
                             const dates = res.data.weather.map( el => {
                                 return el.date
                             })
                             this.setState({
                                 date : dates,
                                 loaded : tempLoaded,
                                 locationErrMsg : false
                             })
                         }
                         else{
                             this.setState({
                                 locationErrMsg : true,
                                 loaded : false,
                             })
                         }
                     }
                 })
             }
             this.setState({
                 spinLoader : false
             })
         }
    }

    setCoordinates = (coord) => {
        let coordinates = translateCoord(coord)
        this.setState({
            coordClicked : [coordinates[1],coordinates[0]],
            day : 0
        })

        if(this.state.locationErrMsg){
            this.setState({
                locationErrMsg : false
            })
        }

        this.addMarker(coord)
        this.initTides([{
            name:'Coordinates '+coordinates,
            coordinate : coordinates
        }])
    }

    addMarker = (coord) => {
        if(this.state.marker){
            this.state.marker.remove();
        }

        let marker = new mapboxgl.Marker()
            .setLngLat(translateCoord(coord,true))
            .addTo(this.state.map);
        this.setState({
            marker : marker
        })
    }

    initMapbox = async (currPosition) => {
        const map = await mapInit(currPosition,'mapTides',3)
        map.on('click',async (e) => {
            await this.setCoordinates(e)
        });
        this.setState({
            map : map
        })
        let temp = document.getElementById('mapTides')
        console.log(temp.style)

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
                { this.state.apiErr ?
                    <Redirect
                        to='/apiKeyErr'
                    >
                    </Redirect>
                : null}
                { this.state.locationErrMsg?
                    <div className="alert alert-warning" role="alert">
                        <h5 className="alert-heading">No data!</h5>
                        <h6>
                            Choose a different location.
                        </h6>
                        <h6>
                            Try closer to the shoreline.
                        </h6>
                    </div>
                    :null }
                <div className="container">
                    <div id="mapTides" style={{display : this.state.showMap}} className="mapboxTide row border border-dark mb-5"></div>
                </div>
                { this.state.spinLoader ?
                    <div className="pt-5">
                        <LoadingSpinner />
                    </div>
                    :null}
                <div>
                    { this.state.loaded ?
                        <div>
                            <TideNav
                                date = { this.state.date[this.state.day] }
                                click = { this.changeDay }
                                day = { this.state.day }
                            />
                        </div>
                    :null}
                </div>
                <div className="mb-3">
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

            </div>
        )
    }

}