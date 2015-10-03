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
    this.state = { dummyData: this.props.dummyData };
  }


  render () {
    console.log(this.state);
    var pies = [
      {key: 'P1', data: [2, 4, 5, 4, 7]},
      {key: 'P2', data: [3, 2, 9, 1, 8]},
      {key: 'P3', data: [3, 4, 0, 7, 8]},
      {key: 'P4', data: [3, 5, 5, 0, 4]},
      {key: 'P5', data: [3, 8, 3, 2, 3]}
    ];
    var pieCharts = [];
    for (var i = 0; i < pies.length; i++) {
      pieCharts.push(<PieChart key={pies[i].key} width={300} height={300} data={pies[i].data}/>);
    }
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <BarChart width={300} height={300} data={[14, 23, 22, 14, 30]}/>
        </div>
        <div style={{textAlign: 'center'}}>
          {pieCharts}
        </div>
      </div>
    );

  }

}

export default Thing;
