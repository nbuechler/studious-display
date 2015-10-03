'use strict';

import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

class DataSeries extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var color = ['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30'];

    var bars = _.map(this.props.data, function(point, i) {
      return (
        <Bar height={yScale(point)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} color={color[i % 5]} key={i} />
      );
    });

    return (
      <g>{bars}</g>
    );
  }
}
class Bar extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height}
        x={this.props.offset} y={this.props.availableHeight - this.props.height}
        style={{stroke: 'black', strokeWidth: '1px'}} />
    );
  }
}
class Wrapper extends React.Component {
  render () {
    // var {props} = this;
    // var color = ['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30'];
    return (
      <svg style={{border: '3px solid black', padding: '30px'}} width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );

  }

}

class BarChart extends React.Component {

  static defaultProps = {
    width: 100,
    height: 100
  }
  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {
    return (
      <Wrapper width={this.props.width} height={this.props.height}>
        <DataSeries data={this.props.data} width={this.props.width} height={this.props.height}/>
      </Wrapper>
    );

  }

}

export default BarChart;
