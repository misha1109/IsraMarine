import React, { Component } from 'react'
import '../LoggedInMenu.css'
import SavedDataButton from '../SavedDataButton/SavedDataButton'
import ForecastTableRows from '../../../Forecast/ForecastTable/ForecastTableRows'

export default class SavedData extends Component{


    componentWillMount() {
        this.setState({
            savedChoosenArr : new Array(this.props.data.length).fill(0)
        })
    }

    savedExpand(index){
        const arr = new Array(this.props.data.length).fill(0)
        arr[index] = this.state.savedChoosenArr[index]? 0 : 1

        this.setState({
            savedChoosenArr : arr
        })
    }

    render(){
        console.log(this.state.savedChoosenArr)

        const dataButtons =
            this.props.data.map( (el,i) => {
                return (
                    <div className="pt-1 pb-1"
                         key = {'forecast:' + i }
                    >
                        <SavedDataButton
                            date = { el.date }
                            position = { el.position }
                            click = { () => this.savedExpand(i) }
                        />
                        { this.state.savedChoosenArr[i] ?
                            <div
                                className="savedExpand card"
                                style={{borderRadius:'10px'}}
                            >
                                { this.props.type == 'forecasts' ?
                                    <ForecastTableRows
                                        coordinates = {el.position}
                                        forecast = {el.weather}
                                    />
                                : this.props.type == 'tides' ?
                                        <div>123</div>
                                :null}

                            </div>
                        : null}
                    </div>

                )
            })
        console.log(this.props.data)
        return (
            <div className="savedExpand pt-2">
                <h6>{ this.props.type == 'forecasts' ? 'Your Forecasts' : this.props.type == 'tides' ? 'Your Tides' : null}</h6>
                <div>
                    {
                        dataButtons
                    }
                </div>
            </div>
        )
    }
}