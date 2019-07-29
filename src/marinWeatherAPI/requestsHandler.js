import axios from 'axios'

// const urlPath = 'https://localhost:4000/weather/getWeather'

const urlPath = 'https://isra-marine.herokuapp.com/weather/getWeather'


export  async function reqWeather( coordinates){
    console.log(coordinates)
    try{
        let res = await axios({
            method: 'post',
            url: urlPath,
            headers:{},
            data : {
                coordinates : coordinates,
            }
        })
        return res.data.message
    }

    catch ( err) {
        return err.response.status
    }
}

