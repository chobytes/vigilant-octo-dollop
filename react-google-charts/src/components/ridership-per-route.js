import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import ChartSelector from './chart-selector.js'

export default class RidershipPerRoute extends Component {
	constructor(props) {
		super(props)

		this.state = { sortOrder: "desc"
								 , orderBy: "boardings"
								 , chartType: "Histogram"
								 , columns: [ { label: "Route Name", type: "string" }
														, { label: "Boardings", type: "number" }
														, { label: "Departures", type: "number" } ]
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
			data.map(a => [ `${a.name}`
										, a.boardings
										, a.departures ])
		)
	}

	componentDidMount() {
		fetch(`${this.props.source}/ridership_per_route?order=${ this.state.orderBy }.${ this.state.sortOrder }`)
			.then(res => res.json())
			.then(res => this.processData(res))
			.then(res => this.setState({ "rows": res }))
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.state.rows != nextState.rows) return;
		fetch(`${nextProps.source}/ridership_per_route?order=${ nextState.orderBy }.${ nextState.sortOrder }`)
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
							 options={{ title: "Ridership Per Route" }} 
							 height="600px"
							 width="100%"
							 rows={ this.state.rows }
						   columns={ this.state.columns } />
				
			</div>
		)
	}

}
