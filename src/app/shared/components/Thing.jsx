'use strict';

import React from 'react';

import PieChart from './d3charts/PieChart.jsx';

class Thing extends React.Component {

  static defaultProps = {
    width: 100,
    height: 100
  }
  constructor (props) {
    super(props);
    this.state = { };
  }


  render () {
    var pies = [
      {key: 'P1', data: [2, 4, 5, 4, 7]},
      {key: 'P2', data: [3, 2, 9, 1, 8]},
      {key: 'P3', data: [3, 4, 0, 7, 8]},
      {key: 'P4', data: [3, 5, 5, 0, 4]},
      {key: 'P5', data: [3, 8, 3, 2, 3]}
    ];
    var pieCharts = [];
    for (var i = 0; i < pies.length; i++) {
      pieCharts.push(<PieChart key={pies[i].key} width={400} height={400} data={pies[i].data}/>);
    }
    return (
      <div style={{textAlign: 'center'}}>
        {pieCharts}
      </div>

    );

  }

}

export default Thing;
