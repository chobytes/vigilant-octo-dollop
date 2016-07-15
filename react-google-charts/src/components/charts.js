import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router'

import CountStopsOnRoutes from './count-stops-on-routes.js'
import CountRoutesOnStops from './count-routes-on-stops.js'


export default class Charts extends Component {
	constructor(props) {
		super(props)

		this.state = { source: "http://127.0.0.1:5000"
								 , chartTypes: [
				  					 "BarChart"
									 , "LineChart"
									 , "BubbleChart"
									 , "Histogram"
									 , "ScatterChart"
									 , "AreaChart"
									 , "CandlestickChart"
									 , "ColumnChart"
									 , "ComboChart"
									 , "DonutChart"
									 , "SteppedAreaChart"
									 , "Table"
									 , "Timeline"
									 , "TreeMap"
									 , "TrendLines"
									 , "Waterall"
									 , "Gantt"
									 , "WordTree" ]
								 , standardQueries: [] }
	}

	handleChange(origin, event) {
		switch(origin) {
			case "count":
				this.setState({ "count": event.target.value })
				break;
			case "chartType":
				this.setState({ chartType: event.target.value })
		}
	}

	componentDidMount() {	
    var options = {
      title: 'Age vs. Weight comparison',
      hAxis: {title: 'Age', minValue: 0, maxValue: 15},
      vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
      legend: 'none'
    };

    var rows = [
      [ 8,      12],
      [ 4,      5.5],
      [ 11,     14],
      [ 4,      5],
      [ 3,      3.5],
      [ 6.5,    7]
    ];

    var columns = [
      {
        'type': 'number',
        'label' : 'Age'
      }, 
      {
        'type' : 'number',
        'label' : 'Weight'
      }
    ];

}

  render() {
    return (
      <div>
				<CountStopsOnRoutes source={ this.state.source }
														handleChange={ this.handleChange }
														chartTypes={ this.state.chartTypes } />

				<hr/ >

				<CountRoutesOnStops source={ this.state.source }
														handleChange={ this.handleChange }
														chartTypes={ this.state.chartTypes } />
      </div>
    )
  }
}
