import axios from 'axios'

// const urlPath = 'https://localhost:4000/weather/getWeather'

const urlPath = 'https://isra-marine.herokuapp.com/user'


export  async function httpLogin( email,pass){
    try{
        let res = await axios({
            method: 'post',
            url: urlPath + '/login',
            headers:{},
            data : {
                email : email,
                password : pass
            }
        })
        return res.data
    }

    catch ( err) {
        if(err.response.statusText == 'Unauthorized'){
            return {
                message : "Wrong Password",
                success : false
            }
        }
        else{
            return {
                message : "Server is currently offline",
                success : false
            }
        }
    }
}

export  async function httpGetTides( email){
    try{
        let res = await axios({
            method: 'post',
            url: urlPath + '/gettides',
            headers:{},
            data : {
                email : email,
            }
        })
        return res.data
    }

    catch ( err) {
        return err
    }
}

export  async function httpGetForecasts( email){
    try{
        let res = await axios({
            method: 'post',
            url: urlPath + '/getweather',
            headers:{},
            data : {
                email : email,
            }
        })
        return res.data
    }

    catch ( err) {
        return err
    }
}

