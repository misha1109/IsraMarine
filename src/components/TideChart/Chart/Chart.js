import React , {Component} from 'react'

import { CanvasJSChart } from '../../../assets/canvasjs.react'

export default class Chart extends Component {

    componentDidUpdate() {

    }


    render() {
        const labels = ["MIDNIGHT","MORNING","AFTERNOON","EVENING"]
        const titleText = this.props.name
        const heightData = []
        this.props.tides.tides[0].tide_data.forEach( (el,i) => {
            heightData.push({
                label : labels[i],
                y : parseFloat(el.tideHeight_mt)
            })
        })

        console.log(heightData)

        const options = {
            animationEnabled: true,
            title: {
                text: titleText
            },
            axisY: {
                title: "Meters",
                suffix: "m",
            },
            data: [{
                yValueFormatString: "m",
                type: "spline",
                dataPoints: [
                    ...heightData
                ]
            }]
        }

        return (
            <div>
                <div className="card border border-dark pa-0 ma-0 mt-4"
                    style={{height:"30vh"}}
                >
                    <CanvasJSChart options = {options}
                    />
                </div>
            </div>
        );
    }
}