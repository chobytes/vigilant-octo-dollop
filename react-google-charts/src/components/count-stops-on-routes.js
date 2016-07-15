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

	toColumns(data) {
		return (
			data.map(cell => {
				return (
					[cell.name, cell.count]
				)
			})
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
		fetch(`${this.props.source}/count_stops_on_routes?${this.state.query}`)
			.then(res => res.json())
			.then(res => this.toColumns(res))
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

				{/* <input type="number"
				value={ this.state.count }
				onChange={ this.handleChange.bind(this, "count") } /> */}

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
