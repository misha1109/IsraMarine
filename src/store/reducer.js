import * as actionTypes from './actions'
import {USER_SET_SAVED} from "./actions";

const initialState = {
    user : null,
    tides : null,
    forecasts : null
}

const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return {
                ...state,
                user : action.email
            }
        case actionTypes.USER_SET_SAVED:
            return {
                ...state,
                tides : action.tides,
                forecasts : action.forecasts
            }
        case actionTypes.USER_LOGOUT:
            return {
                user : null,
                tides : null,
                forecasts : null
            }
    }

    return state

}

export default reducer