import React , {Component} from 'react'

import { CanvasJSChart } from '../../../assets/canvasjs.react'

export default class Chart extends Component {

    render() {
        const labels = ["MIDNIGHT","MORNING","AFTERNOON","EVENING"]
        const titleText = this.props.name
        const heightData = []
        let avg = 0
        this.props.tides.tides[0].tide_data.forEach( (el,i) => {
            heightData.push({
                label : labels[i],
                y : parseFloat(el.tideHeight_mt)
            })
            avg += parseFloat(el.tideHeight_mt)
        })

        avg /= heightData.length

        const options = {
            animationEnabled: true,
            title: {
                text: titleText
            },
            axisY: {
                title: "Sea level in Meters",
                suffix: "m",
                labelFontSize: 15,
                titleFontSize: 18,
                stripLines:[
                    {
                        value: avg,
                        label: "avg height"
                    }
                ]
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
            <div >
                <div className=" card border border-dark pa-0 ma-0 mt-4"
                    style={{height:"30vh", opacity : '0.9'}}
                >
                    <CanvasJSChart options = {options}
                    />
                </div>
            </div>
        );
    }
}