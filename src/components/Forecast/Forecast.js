import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { reqWeather } from '../../marinWeatherAPI/requestsHandler.js'
import ForecastTable from './ForecastTable/ForecastTable'
import './Forecast.css'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import SavedSnackBar from '../SaveSnackBar/SaveSnackBar'
import { Redirect } from 'react-router-dom'
import { mapInit, translateCoord } from '../../mapbox/mapboxInit'
import { FaRegSave } from 'react-icons/fa'
import { httpAddForecast } from '../../userAPI/requestHandler'
import { connect } from 'react-redux'

class Forecast extends Component{

    state = {
        coordClicked : null,
        marineData : null,
        curDate : 0,
        curTime : 0,
        marker : null,
        showMap : 'none',
        showLoader : true,
        showLoaderForecast : false
    }

    constructor(){
        super()
        this.tableRef = React.createRef()
    }

    componentDidUpdate(prevState) {
        if (this.state.marineData !== null) {
            window.scrollTo(0,this.tableRef.current.offsetTop)
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((res) => this.initMapbox(res),
            (rej) => this.initMapbox({ coords : { longitude : 0 , latitude : 0} }))
    }

    setCoordinates =(coord) => {
        let coordinates = translateCoord(coord)
        this.setState({
            coordClicked : [coordinates[1],coordinates[0]]
        })
        this.addMarker(coord)
    }

    getWeather =async () => {
        this.setState({
            showLoaderForecast: true,
            marineData : null
        })
        const data = await reqWeather(this.state.coordClicked)
        if(data.data){
            this.setState({marineData : data.data.weather})
        }
        else{
            if( data == 429 ){
                this.setState({
                    apiErr : true
                })
            }
        }
        this.setState({
            showLoaderForecast: false
        })
    }


    initMapbox =async (currPosition) => {

        let zoom = null
        if(currPosition.coords.longitude == 0 && currPosition.coords.latitude == 0){
            zoom = 3
        }

        const map = await mapInit(currPosition,'mapForecast',zoom)
        map.on('click',  async (e) => {
            await this.setCoordinates(e)
            await this.getWeather()
        });

        setTimeout( () => {
            this.setState({
                showMap : '',
                showLoader : false
            })

            map.resize()
        },700)

        await this.setState({
            map : map
        })



    }

    translateTime(time){
        if( time == 0){
            return '00:00'
        }
        else if(time.length==3){
            return '0'+time[0]+':'+time.slice(1,time.length)
        }
        else {
            return time.slice(0,2)+':'+time.slice(2,time.length)
        }
    }

    addMarker(coord){
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

    dateNavClicked = (value) =>{

        if(value == '-3') {
            if(this.state.curTime != 0)
                this.setState({curTime : this.state.curTime -1 })
        }
        if(value == '-24') {
            if(this.state.curDate != 0)
                this.setState({curDate : this.state.curDate -1 })
        }
        if(value == '+3') {
            if(this.state.curTime != 7)
                this.setState({curTime : this.state.curTime +1 })
        }
        if(value == '+24') {
            if(this.state.curDate != 6)
                this.setState({curDate : this.state.curDate +1 })
        }
    }

    saveForecast = async (coordinates,forecasts) => {
        this.setState({ showSnack:true })
        setTimeout(() => this.setState({ showSnack:false }),2000)
        const curForecast = forecasts[0].hourly[0]
        const data = {
            email : this.props.loggedUser,
            weather : {
                date : forecasts[0].date,
                position : coordinates,
                weather : {
                    tempC : curForecast.tempC,
                    waterTemp_C : curForecast.waterTemp_C,
                    windspeedKmph : curForecast.windspeedKmph,
                    winddirDegree : curForecast.winddirDegree,
                    sigHeight_m : curForecast.sigHeight_m,
                    swellHeight_m : curForecast.swellHeight_m,
                }
            }
        }
        const reply = await httpAddForecast(data)
    }

    render(){
        return (
            <div>
                { this.state.showSnack ?
                    <SavedSnackBar
                        msg = "Forecast Saved"
                    />
                : null }
                <div className="mt-5">
                    { this.state.showLoader ?
                        <LoadingSpinner />
                    : null}
                </div>

                { this.state.apiErr ?
                    <Redirect
                        to='/apiKeyErr'
                    >
                    </Redirect>
                    : null}
                <div className="container Forecast">
                    {!this.state.coordClicked && !this.state.showLoader ?
                        <h6>Click on the map to choose location</h6>
                    :null}
                    <div style = {{ display : this.state.showMap }}
                         id="mapForecast"
                         className="mapbox row border border-dark mb-2 " >
                    </div>
                    { this.state.showLoaderForecast ?
                        <LoadingSpinner/>
                    : null }
                    {this.state.marineData?
                        <div
                            ref = { this.tableRef }
                        >
                            <ForecastTable
                                forecast = { this.state.marineData[this.state.curDate].hourly[this.state.curTime] }
                                coordinates = {this.state.coordClicked}
                                date = {this.state.marineData[this.state.curDate].date}
                                hour = { this.translateTime(this.state.marineData[this.state.curDate].hourly[this.state.curTime].time) }
                                hourAndDay = {{day : this.state.curDate, hour : this.state.curTime }}
                                clickNav = { this.dateNavClicked }
                            >
                                { this.props.loggedUser ?
                                    <FaRegSave
                                        onClick = { () => { this.saveForecast(this.state.coordClicked ,this.state.marineData) }}
                                    />
                                : null}
                            </ForecastTable>
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

export default connect(mapStateToProps )(Forecast)
