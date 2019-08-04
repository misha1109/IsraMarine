import axios from 'axios'

// const urlPath = 'https://localhost:4000/weather/getWeather'

const urlPath = 'https://isra-marine.herokuapp.com/user'

export async function httpSignUp(email,pass) {
    try{
        let res = await axios({
            method: 'post',
            url: urlPath + '/signup',
            headers:{},
            data : {
                email : email,
                password : pass
            }
        })
        return {
            message : res.data,
            success : true
        }
    }

    catch ( err) {
        console.log(err.response.data.message)
        if(err.response.data.message == "Mail exists"){
            return {
                message : "Email exists",
                success : false
            }
        }

        else if(err.response.data.error.message == "Users validation failed: email: Path `email` is invalid (1)."){
            return {
                message:"Email is not valid",
                success : false
            }
        }

        else {
            return {
                message : "Server is currently offline",
                success : false
            }
        }
    }
}

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

export async function httpAddForecast( data){
    try{
        let res = await axios({
            method: 'post',
            url: urlPath + '/addToWeather',
            headers:{},
            data : data
        })
        return res.data
    }

    catch ( err) {
        return err
    }
}

export async function httpAddTides( data){
    try{
        let res = await axios({
            method: 'post',
            url: urlPath + '/addtides',
            headers:{},
            data : data
        })
        return res.data
    }

    catch ( err) {
        return err
    }
}
