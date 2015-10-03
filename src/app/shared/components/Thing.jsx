'use strict';

import React from 'react';

import PieChart from './d3charts/PieChart.jsx';
import BarChart from './d3charts/BarChart.jsx';

class Thing extends React.Component {

  static defaultProps = {
    width: 100,
    height: 100
  }
  constructor (props) {
    super(props);
  }


  render () {
    var pies = [];
    var pies = this.props.data[0].pies;
    var pieCharts = [];
    for (var i = 0; i < pies.length; i++) {
      pieCharts.push(<PieChart key={pies[i].key} width={300} height={300} data={pies[i].data}/>);
    }
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <BarChart width={300} height={300} data={this.props.data[1].logCounts}/>
        </div>
        <div style={{textAlign: 'center'}}>
          {pieCharts}
        </div>
      </div>
    );

  }

}

export default Thing;
