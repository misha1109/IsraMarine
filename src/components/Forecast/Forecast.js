import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { reqWeather } from '../../marinWeatherAPI/tempRequestsHandler.js'
import ForecastTable from './ForecastTable/ForecastTable'
import './Forecast.css'
import { Redirect } from 'react-router-dom'
import { mapInit, translateCoord } from '../../mapbox/mapboxInit'

export default class Forecast extends Component{

    state = {
        coordClicked : null,
        marineData : null,
        curDate : 0,
        curTime : 0,
        marker : null
    }

    componentDidUpdate(prevState) {
        if (this.state.marineData !== null) {
            window.scrollTo(0,300)
        }
    }

    componentDidMount() {
        // navigator.geolocation.watchPosition(function(position) {
        //         console.log("i'm tracking you!");
        //     },
        //     function(error) {
        //         if (error.code == error.PERMISSION_DENIED)
        //             console.log("you denied me :-(");
        //     });
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

        this.setState({
            map : map
        })


    }
    //
    // translateCoord(coord,marker){
    //     let coordinates =  [JSON.stringify(coord.point),JSON.stringify(coord.lngLat)]
    //     coordinates = coordinates[1].split(',')
    //     coordinates = [coordinates[0].slice(7,coordinates[0].length),coordinates[1].slice(6,coordinates[1].length-1)]
    //     if(marker){
    //         return coordinates
    //     }
    //     return [coordinates[0].slice(0,3)+parseInt(coordinates[0].slice(3,5)*0.6),coordinates[1].slice(0,3)+parseInt(coordinates[1].slice(3,5)*0.6)]
    // }

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

    render(){
        return (
            <div>
                { this.state.apiErr ?
                    <Redirect
                        to='/apiKeyErr'
                    >
                    </Redirect>
                    : null}
                <div className="container Forecast">
                    {!this.state.coordClicked?
                        <h6>Click on the map to choose location</h6>
                    :null}
                    <div id="mapForecast" className="mapbox row border border-dark mb-2 " >
                    </div>

                    {this.state.marineData?
                        <ForecastTable
                            forecast = { this.state.marineData[this.state.curDate].hourly[this.state.curTime] }
                            coordinates = {this.state.coordClicked}
                            date = {this.state.marineData[this.state.curDate].date}
                            hour = { this.translateTime(this.state.marineData[this.state.curDate].hourly[this.state.curTime].time) }
                            hourAndDay = {{day : this.state.curDate, hour : this.state.curTime }}
                            clickNav = { this.dateNavClicked }
                        />
                    :null}
                </div>
            </div>
        )
}
}
