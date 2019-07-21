import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

export function mapInit (currPosition, id, zoom){
    let coords = null
    if(currPosition){
        coords = [currPosition.coords.longitude,currPosition.coords.latitude]
    }
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGExMTA5IiwiYSI6ImNqcTVmeDkyMTB0d3gzeHBvMzRiamVhencifQ.sfzpSm_PNhtYFCAO5ero2w';
    const map = new mapboxgl.Map({
        container: id,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coords? coords : [0,0],
        options :true,
        zoom: zoom ? zoom : 9
    });
    map.addControl(new mapboxgl.NavigationControl({showCompass:false}));
    return map

}

export function translateCoord(coord,marker){
    let coordinates =  [JSON.stringify(coord.point),JSON.stringify(coord.lngLat)]
    coordinates = coordinates[1].split(',')
    coordinates = [coordinates[0].slice(7,coordinates[0].length),coordinates[1].slice(6,coordinates[1].length-1)]
    if(marker){
        return coordinates
    }
    return [coordinates[0].slice(0,3)+parseInt(coordinates[0].slice(3,5)*0.6),coordinates[1].slice(0,3)+parseInt(coordinates[1].slice(3,5)*0.6)]
}



// let coords = [currPosition.coords.longitude,currPosition.coords.latitude]
// mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGExMTA5IiwiYSI6ImNqcTVmeDkyMTB0d3gzeHBvMzRiamVhencifQ.sfzpSm_PNhtYFCAO5ero2w';
// this.map = new mapboxgl.Map({
//     container: 'mapboxMap',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: coords,
//     options :true,
//     zoom:9
// });
// this.map.addControl(new mapboxgl.NavigationControl({showCompass:false}));