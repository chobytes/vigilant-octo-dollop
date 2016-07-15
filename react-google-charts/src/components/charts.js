import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router'

import CountStopsOnRoutes from './count-stops-on-routes.js'
import CountRoutesOnStops from './count-routes-on-stops.js'
import RidershipPerRoute from './ridership-per-route.js'
import RidershipPerStop from './ridership-per-stop.js'


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
			case "queryOrder":
				this.setState({ queryOrder: event.target.value })
				break;	
		}
	}

  render() {
    return (
      <div>
				<CountStopsOnRoutes source={ this.state.source }
														handleChange={ this.handleChange }
														chartTypes={ this.state.chartTypes } />

				<hr/ >

				<CountRoutesOnStops source={ this.state.source }
														handleChange={ this.handleChange } />

				<hr />

				<RidershipPerRoute source={ this.state.source }
														handleChange={ this.handleChange } />

				<hr />

				<RidershipPerStop source={ this.state.source }
														handleChange={ this.handleChange } />
      </div>
    )
  }
}
