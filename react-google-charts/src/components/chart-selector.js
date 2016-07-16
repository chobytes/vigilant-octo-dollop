import React, { Component } from 'react'

export default class ChartSelector extends Component {
    constructor(props) {
	super(props)
	
	this.state = { selectedChart: props.defaultChart }
    }
    
    handleChange = (event) => {
	this.setState({selectedChart: event.target.value})
	this.props.handler(event)
    }
    
    render() {
	const _chartTypes = [ "BarChart"
			    , "LineChart"
			    , "Histogram"
			    , "ScatterChart"
			    , "AreaChart"
			    , "ColumnChart"
			    , "ComboChart"
			    , "PieChart"
			    , "SteppedAreaChart" ]
	
	const _buildOptions = function(chartType) {
	    return (
		<option key={ `${chartType}` } value={`${chartType}`}>
		    {`${chartType}`}
		</option> 
	    )
	}
	
	return (
	    <select value={ this.state.selectedChart } onChange={ this.handleChange }>
		{ _chartTypes.map(_buildOptions) }
	    </select>
	)
    }
}
