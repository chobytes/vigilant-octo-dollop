import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import ChartSelector from './chart-selector.js'

export default class CountRoutesOnStops extends Component {
	constructor(props) {
		super(props)

		this.state = { sortOrder: "desc"
								 , orderBy: "number_of_routes"
								 , chartType: "Histogram"
								 , columns: [ { label: "Stop at", type: "string" }
														, { label: "Number of routes serving", type: "number" } ]
								 , rows: [] }
	}

	handleChange(origin, event) {
		switch(origin) {
			case "chartType":
				this.setState({ chartType: event.target.value })
				break;
			case "sortOrder":
				this.setState({ sortOrder: event.target.value })
				break;	
		}
	}

	processData(data) {
		return (
			data.map(a => [`${a.on_street_name} at ${a.cross_street_name}`
									 , a.number_of_routes ])
		)
	}

	componentDidMount() {
		fetch(`${this.props.source}/count_routes_serving_stops?order=${ this.state.orderBy }.${ this.state.sortOrder }.limit=1000`)
			.then(res => res.json())
			.then(res => this.processData(res))
			.then(res => this.setState({ "rows": res }))
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.state.rows != nextState.rows) return;
		fetch(`${nextProps.source}/count_routes_serving_stops?order=${ nextState.orderBy }.${ nextState.sortOrder }`)
			.then(res => res.json())
			.then(res => this.processData(res))
			.then(res => this.setState({ "rows": res }))
		
	}
	
	render() {
		return (
			<div>
				<ChartSelector handler={ this.handleChange.bind(this, "chartType") }
											 defaultChart={"Histogram"} />

				
				<select value={ this.state.sortOrder }
								onChange={ this.handleChange.bind(this, "sortOrder") } >
					<option value="desc">Descending</option>
					<option value="asc">Ascending</option>
				</select>

				<Chart chartType={ `${this.state.chartType}` }
							 options={{ title: "Routes Serving Stops"
												, histogram: { bucketSize: 1
																		 , hAxis: {title: "# Of Stops"}
																		 , vAxis: {title: "Frequency"} }}}
							 height="600px"
							 width="100%"
							 rows={ this.state.rows }
						   columns={ this.state.columns } />
			
			</div>
		)
	}
}
