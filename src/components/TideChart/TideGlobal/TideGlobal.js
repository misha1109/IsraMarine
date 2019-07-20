// import React , {Component} from 'react'
// import { mapInit , translateCoord } from '../../../mapbox/mapboxInit'
// import './TideGlobal.css'
// import mapboxgl from "mapbox-gl";
// import getWeather from '../../../marinWeatherAPI/tempRequestsHandler'
//
// export default class TideGlobal extends Component{
//
//     // state = {
//     //     coordClicked : null,
//     //     marineData : null,
//     //     curDate : 0,
//     //     curTime : 0,
//     //     marker : null
//     // }
//
//     componentDidMount = async () => {
//         this.initMapbox()
//     }
//
//
//
//     setCoordinates = (coord) => {
//         let coordinates = translateCoord(coord)
//         this.setState({
//             coordClicked : [coordinates[1],coordinates[0]]
//         })
//         this.addMarker(coord)
//         console.log(this.state.coordClicked)
//
//     }
//
//     addMarker = (coord) => {
//         if(this.state.marker){
//             this.state.marker.remove();
//         }
//
//         let marker = new mapboxgl.Marker()
//             .setLngLat(translateCoord(coord,true))
//             .addTo(this.state.map);
//         this.setState({
//             marker : marker
//         })
//     }
//
//     getWeather = async (coord) => {
//         const weather = await getWeather(coord)
//         this.setState({
//             tides : weather.weather
//         })
//     }
//
//     initMapbox = async (currPosition) => {
//
//         const map = await mapInit(currPosition,'mapTides')
//         map.on('click',(e) => {
//             this.setCoordinates(e)
//         });
//         this.setState({
//             map : map
//         })
//
//     }
//
//
//     render(){
//         return (
//             <div className="container">
//                 <div id="mapTides" className="mapboxTide row border border-dark mb-2 "></div>
//             </div>
//         )
//     }
//
// }