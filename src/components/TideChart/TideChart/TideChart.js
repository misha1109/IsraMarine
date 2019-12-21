import React , {Component} from 'react'
import Chart from '../Chart/Chart'
import TideNav from '../TideNavigation/TideNavigation'
import { reqWeather } from "../../../marinWeatherAPI/requestsHandler";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import NoDataMsg from '../NoDataMsg/NoDataMsg'
import {mapInit, translateCoord} from "../../../mapbox/mapboxInit";
import mapboxgl from "mapbox-gl";
import { possitionsIsrael } from './possitionsIsrael.js'
import { FaRegSave } from 'react-icons/fa'
import { Redirect } from 'react-router-dom'
import '../Chart/Chart.css'

import { connect } from 'react-redux'


import './TideChart.css'
import {httpAddTides} from "../../../userAPI/requestHandler";
import SavedSnackBar from "../../SaveSnackBar/SaveSnackBar";



class TideChart extends Component {
     state = {
         day : 0,
         loaded : false,
         spinLoader : false,
         showMap : "",
         type : null
     }

     constructor(){
         super()
         this.navChartElRef = React.createRef()
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
         if(this.props.match.params.type != this.state.type){
             if(this.props.match.params.type!='israel'){
                 this.setState({
                     possitions : null,
                     showMap : "",
                     loaded : false,
                     type : 'global'
                 })

                 this.initMapbox({
                     coords : {
                         longitude :14.37,
                         latitude : 42.31
                     }
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
            this.setState({
                day : 0
            })
         }

         if(this.state.loaded && this.state.type!='israel'){
             window.scrollTo(0,this.navChartElRef.current.offsetTop*0.8)
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
         this.setState({
             loaded : false
         })

         if( await reqWeather([0,0]) == 429 ){
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
                         if(res.data.weather){
                             const dates = res.data.weather.map( el => {
                                 return el.date
                             })
                             this.setState({
                                 spinLoader : false,
                                 date : dates,
                                 loaded : tempLoaded,
                                 locationErrMsg : false
                             })
                         }
                         else{
                             this.setState({
                                 spinLoader : false,
                                 locationErrMsg : true,
                                 loaded : false,
                             })
                         }
                     }
                 })
             }
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
        this.setState({
            spinLoader : true,
            showMap : 'none'
        })
        const map = await mapInit(currPosition,'mapTides',3)

        map.on('click',async (e) => {
            await this.setCoordinates(e)
        });



        setTimeout( () => {
            this.setState({
                map : map,
                showMap : '',
                spinLoader : false
            })
            map.resize()
        },700)

     }

    changeDay = (val) => {
         let newDay = this.state.day + val
         this.setState({
             day : newDay
         })
        this.render()
    }

    saveTides = async (tides) => {
        this.setState({ showSnack:true })
        setTimeout(() => this.setState({ showSnack:false }),2000)
        const data = tides.map( el => {
            let coords
            let splitName = el.name.split(" ")

            if(splitName.length==2){
                coords = splitName[1].split(",")
                coords = [[coords[0],coords[1]]]
            }
            else{
                coords = [splitName[0],""]
            }

            return {
                position : coords,
                date : el.tides[0].date,
                tides : el.tides[0].tides[0].tide_data
            }
        })
        const reply = await httpAddTides({
            email : this.props.loggedUser,
            tides : data
        })
    }

    render(){

        return (
            <div>
                { this.state.showSnack ?
                    <SavedSnackBar
                        msg = "Tide Chart Saved"
                    />
                    : null }
                <div className="container">
                    <div id="mapTides"
                         style={{ display : this.state.showMap }}
                         className="mapboxTide row border border-dark mb-5"></div>
                </div>
                { this.state.apiErr ?
                    <Redirect
                        to='/apiKeyErr'
                    >
                    </Redirect>
                    : null}
                { this.state.locationErrMsg?
                    <NoDataMsg

                    cre/>
                    :null }
                { this.state.spinLoader ?
                    <div className="pt-5">
                        <LoadingSpinner />
                    </div>
                :null}
                <div
                    ref={ this.navChartElRef }
                >
                    { this.state.loaded ?
                        <div className="chart">
                            { this.props.loggedUser ?
                                <div  className="col-2" style={{fontSize : '20px' , color:'#01579B'}}>
                                    <FaRegSave onClick = { () => this.saveTides(this.state.loaded,this.state.coordClicked) }/>
                                </div>
                            : null}
                            <TideNav
                                date = { this.state.date[this.state.day] }
                                click = { this.changeDay }
                                day = { this.state.day }
                            />
                            {
                                this.state.loaded.map((el,i) => {
                                    return (
                                        <Chart
                                            key = { el.name + i }
                                            name = { el.name }
                                            day = { this.state.day}
                                            tides = { el.tides[this.state.day] }
                                        >
                                        </Chart>
                                )})
                            }
                        </div>
                    :null}
                </div>
                </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loggedUser : state.user,
    }
}

export default connect(mapStateToProps )(TideChart)
