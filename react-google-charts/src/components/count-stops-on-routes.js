import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

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
		fetch(`http://localhost:5000/count_stops_on_routes?${this.state.query}`)
			.then(res => res.json())
			.then(res => this.processData(res))
			.then(res => this.setState({ "rows": res }))
	}

	render() {
		return (
			<div>
				<Chart chartType={ `${this.state.chartType}` }
							 columns={ this.state.columns }
							 rows={ this.state.rows }
							 options={{title: "Count Stops On Route"}}
							 width="100%"
							 height="500px" />

				<select onChange={ this.handleChange.bind(this, "chartType")} >
					<option value="Histogram">Histogram</option>
					<option value="ColumnChart">ColumnChart</option>
					<option value="LineChart">LineChart</option>
					<option value="AreaChart">AreaChart</option>
				</select>
			</div>
		)
	}
}
