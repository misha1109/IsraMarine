import axios from 'axios'

const urlPath = 'https://api.worldweatheronline.com/premium/v1/marine.ashx/?key=57c12832c96a4554b2e94309191407&'

export  async function reqWeather( coordinates){
    let query = `q=${coordinates[0]},${coordinates[1]}&tide=yes`

    try{
        let res = await axios({
            method: 'get',
            url: urlPath + query + '&format=json',
            headers:{
                'Content-type':'application/json',
            }
        })
        return res.data
    }

    catch ( err) {
        console.log(err)
    }
}

