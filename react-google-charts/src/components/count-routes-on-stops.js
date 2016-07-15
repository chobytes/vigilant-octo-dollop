import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import ChartSelector from './chart-selector.js'

export default class CountRoutesOnStops extends Component {
	constructor(props) {
		super(props)

		this.state = { query: ""
								 , chartType: "Histogram"
								 , columns: [ { label: "Stop at", type: "string" }
														, { label: "Number of routes serving", type: "number" } ]
								 , rows: [] }
	}

	processData(data) {
		return (
			data.map(a => [`${a.on_street_name} at ${a.cross_street_name}`
									 , a.number_of_routes ])
		)
	}

	componentDidMount() {
		fetch(`http://127.0.0.1:5000/count_routes_serving_stops?${this.state.query}`)
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
							 options={{ title: "Routes Serving Stops"
												, histogram: { bucketSize: 1
																		 , hAxis: {title: "# Of Stops"}
																		 , vAxis: {title: "Frequency"} }}}
							 height="600px"
							 width="800px"
							 rows={ this.state.rows }
						   columns={ this.state.columns } />
			
			</div>
		)
	}
}
