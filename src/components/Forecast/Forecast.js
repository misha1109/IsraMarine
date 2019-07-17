import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import reqWeather from '../../marinWeatherAPI/tempRequestsHandler.js'
import ForecastTable from './ForecastTable/ForecastTable'
import './Forecast.css'

export default class Forecast extends Component{

    state = {
        coordClicked : null,
        marineData : null,
        curDate : 0,
        curTime : 0
    }

    componentDidMount() {
        console.log(this.state.curDate)
        navigator.geolocation.getCurrentPosition(res => this.initMapbox(res))
    }

    setCoordinates =(coord) => {
        let coordinates = this.translateCoord(coord)
        this.setState({
            coordClicked : [coordinates[1],coordinates[0]]
        })
    }

    getWeather =async () => {
        const data = await reqWeather(this.state.coordClicked)
        this.setState({marineData : data.data.weather})
        console.log(this.state.marineData[this.state.curDate].date)
    }


    initMapbox =async (currPosition) => {
        let coords = [currPosition.coords.longitude,currPosition.coords.latitude]
        mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGExMTA5IiwiYSI6ImNqcTVmeDkyMTB0d3gzeHBvMzRiamVhencifQ.sfzpSm_PNhtYFCAO5ero2w';
        this.map = new mapboxgl.Map({
            container: 'mapboxMap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coords,
            options :true,
            zoom:9
        });
        this.map.addControl(new mapboxgl.NavigationControl({showCompass:false}));
        this.map.on('click',  async (e) => {
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
            await this.setCoordinates(e)
            await this.getWeather()
        });

    }

    translateCoord(coord){
        let coordinates =  [JSON.stringify(coord.point),JSON.stringify(coord.lngLat)]
        coordinates = coordinates[1].split(',')
        coordinates = [coordinates[0].slice(7,coordinates[0].length),coordinates[1].slice(6,coordinates[1].length-1)]
        return [coordinates[0].slice(0,3)+parseInt(coordinates[0].slice(3,5)*0.6),coordinates[1].slice(0,3)+parseInt(coordinates[1].slice(3,5)*0.6)]
    }


render(){
    return (
        <div>

            <div className="container Forecast">
                    <div id="mapboxMap" className="mapbox row border border-dark mb-2 " >
                    </div>
                {this.state.marineData?
                    <ForecastTable
                        coordinates = {this.state.coordClicked}
                        date = {this.state.marineData[this.state.curDate].date}
                    />
                :null}
            </div>
        </div>
    )
}
}
