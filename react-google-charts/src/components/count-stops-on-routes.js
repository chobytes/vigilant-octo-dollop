import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import ChartSelector from './chart-selector.js'

export default class CountStopsOnRoutes extends Component {
	constructor(props) {
		super(props)

		this.state = { "query": ""
								 , "chartType": "Histogram"
								 , "columns": [ { "label": "Route Name", "type": "string" }
															, { "label": "Count", "type": "number" } ]
								 , "rows": [] }
	}

	processData(data) {
		return (
			data.map(a => [a.name, a.count])
		)
	}

	componentDidMount() {
		fetch(`http://localhost:5000/count_stops_on_routes?${this.state.query}`)
			.then(res => res.json())
			.then(res => this.processData(res))
			.then(res => this.setState({ "rows": res }))
	}

	render() {
		return (
			<div>
				<ChartSelector handler={ this.props.handleChange.bind(this, "chartType") }
											 defaultChart={"Histogram"} />

				<Chart chartType={ `${this.state.chartType}` }
							 columns={ this.state.columns }
							 rows={ this.state.rows }
							 options={{title: "Count Stops On Route"}}
							 width="100%"
							 height="500px" />

			</div>
		)
	}
}
