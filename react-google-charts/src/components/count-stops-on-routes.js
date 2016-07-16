import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import ChartSelector from './chart-selector.js'

export default class CountStopsOnRoutes extends Component {
    constructor(props) {
	super(props)
	
	this.state = { sortOrder: "desc"
		     , orderBy: "count"
		     , "chartType": "Histogram"
		     , "columns": [ { "label": "Route Name", "type": "string" }
				  , { "label": "Count", "type": "number" } ]
		     , "rows": [] }
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
	    data.map(a => [a.name, a.count])
	)
    }
    
    
    
    componentDidMount() {
	fetch(`${this.props.source}/count_stops_on_routes?order=${ this.state.orderBy }.${ this.state.sortOrder }`)
	    .then(res => res.json())
	    .then(res => this.processData(res))
	    .then(res => this.setState({ "rows": res }))
    }
    
    componentWillUpdate(nextProps, nextState) {
	if(this.state.rows != nextState.rows) return;
	fetch(`${nextProps.source}/count_stops_on_routes?order=${ nextState.orderBy }.${ nextState.sortOrder }`)
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
		       columns={ this.state.columns }
		       rows={ this.state.rows }
		       options={{title: "Stops On Routes"}}
		       width="100%"
		       height="600px" />
		
	    </div>
	)
    }
}
