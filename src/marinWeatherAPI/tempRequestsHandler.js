import axios from 'axios'

const urlPath = 'http://api.worldweatheronline.com/premium/v1/marine.ashx/?key=57c12832c96a4554b2e94309191407&'

export default async function getData( coordinates){
    let query = `q=${coordinates[0]},${coordinates[1]}`

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